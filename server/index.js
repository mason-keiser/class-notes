require('dotenv/config');
const express = require('express');
const format = require('pg-format');
const db = require('./database');
const ClientError = require('./client-error');
const staticMiddleware = require('./static-middleware');
const sessionMiddleware = require('./session-middleware');

const app = express();

app.use(staticMiddleware);
app.use(sessionMiddleware);

app.use(express.json());

// HTTP REQUEST TO CHECK THAT BACKEND IS CONNECTED

app.get('/api/health-check', (req, res, next) => {
  db.query('select \'successfully connected\' as "message"')
    .then(result => res.json(result.rows[0]))
    .catch(err => next(err));
});

// GET GENERAL INFORMATION ABOUT A STUDENT AND ALL NOTEBOOKS OWNED BY THE STUDENT
// BY PROVIDING A STUDENT ID

app.get('/api/students/:studentId', (req, res, next) => {
  const studentId = parseInt(req.params.studentId);
  if (!Number.isInteger(studentId) || studentId <= 0) {
    return res.status(400).json({ error: 'studentId must be a positive integer' });
  }
  const sql = `
  select *
  from "students"
  join "notebooks" using ("studentId")
  where "studentId" = $1;`;

  db.query(sql, [studentId])
    .then(result => {
      const studentInfo = {
        firstName: '',
        lastName: '',
        studentId: studentId,
        notebooks: []
      };
      studentInfo.firstName = result.rows[0].firstName;
      studentInfo.lastName = result.rows[0].lastName;
      result.rows.map(notebookInfo => {
        studentInfo.notebooks.push({
          notebookId: notebookInfo.notebookId,
          notebookName: notebookInfo.notebookName
        });
      });
      res.status(200).json(studentInfo);
    })
    .catch(err => next(err));

});

// GET ALL INFORMATION ABOUT A NOTE BY PROVIDING A NOTE ID

app.get('/api/notes/:noteId', (req, res, next) => {
  const sql = `
  SELECT "notebooks"."notebookName", "notes".*
  FROM  "notes"
  JOIN "notebooks" using ("notebookId")
  WHERE "noteId" = $1;
  `;
  const noteParam = [req.params.noteId];
  const noteId = parseInt(req.params.noteId);
  if (!Number.isInteger(noteId) || noteId <= 0) {
    return res.status(400).json({ error: '"noteId" must be a positive integer' });
  }
  db.query(sql, noteParam)
    .then(result => {
      const note = result.rows[0];
      if (!note) {
        next(new ClientError(`Cannot find note with "noteId" ${noteId}`, 404));
      } else {
        const tagSQL = `
        select "tagRelations"."itemId" , "tagRelations"."type", "tagTable"."tagName"
        from "tagRelations"
        join "tagTable" using ("tagId")
        where "tagRelations"."itemId" = $1
        and "tagRelations"."type" = 'note';
        `;
        db.query(tagSQL, noteParam)
          .then(result => {
            const data = result.rows;
            const tagsArray = [];
            data.map(tag => tagsArray.push(tag.tagName));
            return tagsArray;
          })
          .then(tagsArray => {
            note.noteTags = tagsArray;
            res.status(200).json(note);
          })
          .catch(err => next(err));
      }
    })
    .catch(err => next(err));
});

// GET INFORMATION ABOUT ALL NOTES WITHIN A NOTEBOOK BY PROVIDING A NOTEBOOK ID

app.get('/api/notebooks/:notebookId', (req, res, next) => {
  const notebookId = parseInt(req.params.notebookId);
  if (!Number.isInteger(notebookId) || notebookId <= 0) {
    return res.status(400).json({ error: 'notebookId must be a positive integer' });
  }
  const sql = `
  select "notes"."noteTitle", "notes"."noteContent", "notes"."noteId"
  from "notes"
  join "notebooks" using ("notebookId")
  where "notebookId" = $1
  order by "notes"."noteId"
  `;
  db.query(sql, [notebookId])
    .then(result => {
      const notesInfo = result.rows;
      const notebookNameSQL = `
    select "notebookName"
    from "notebooks"
    where "notebookId" = $1
    `;
      db.query(notebookNameSQL, [notebookId])
        .then(result => {
          notesInfo.push({ notebookName: result.rows[0].notebookName });
          res.status(200).json(notesInfo);
        });
    })
    .catch(err => next(err));
});

// GET A COUNT FOR HOW MANY NOTES ARE IN EACH NOTEBOOK BELONGING TO A STUDENT TABLE, AND THE
// STUDENT'S NAME, BY PROVIDING A STUDENT ID

app.get('/api/notebooks/notes/:studentId', (req, res, next) => {
  const studentId = parseInt(req.params.studentId);
  const noteParam = [req.params.studentId];
  if (!Number.isInteger(studentId) || studentId <= 0) {
    return res.status(400).json({ error: 'studentId must be a positive integer' });
  }
  const sql = `
  select "notebookId", "notebookName"
  from "notebooks"
  where "studentId" = $1;
  `;
  db.query(sql, noteParam)
    .then(result => {
      const notebooksInfo = result.rows;
      notebooksInfo.map(notebook => {
        notebook.noteCount = 0;
      });
      if (!notebooksInfo) {
        next(new ClientError(`Cannot find student with "studentId" ${studentId}`, 404));
      } else {
        const notesSQL = `
        select "notebooks"."notebookId", "notes"."noteId"
        from "notes"
        join "notebooks" using ("notebookId")
        where "studentId" = $1
        `;
        db.query(notesSQL, noteParam)
          .then(result => {
            const countIncrementor = result.rows;
            for (var notebooksIndex = 0; notebooksIndex < notebooksInfo.length; notebooksIndex++) {
              for (var countIndex = 0; countIndex < countIncrementor.length; countIndex++) {
                if (notebooksInfo[notebooksIndex].notebookId === countIncrementor[countIndex].notebookId) {
                  notebooksInfo[notebooksIndex].noteCount++;
                }
              }
            }
            const nameSQL = `
              select "firstName"
              from "students"
              where "students"."studentId" = $1;
              `;
            db.query(nameSQL, noteParam)
              .then(result => {
                notebooksInfo.push({ firstName: result.rows[0].firstName });
                res.status(200).json(notebooksInfo);
              });
          })
          .catch(err => next(err));
      }
    })
    .catch(err => next(err));
});

// USER CAN GET STUDENT INFO BY PROVIDING STUDENTID
app.get('/api/students/:studentId', (req, res, next) => {
  const studentId = parseInt(req.params.studentId);
  if (!Number.isInteger(studentId) || studentId <= 0) {
    return res.status(400).json({ error: 'studentId must be a positive integer' });
  }
  const sql = `
  select *
  from "students"
  join "notebooks" using ("studentId")
  where "studentId" = $1;`;

  db.query(sql, [studentId])
    .then(result => {
      const studentInfo = {
        firstName: '',
        lastName: '',
        studentId: studentId,
        notebooks: []
      };
      studentInfo.firstName = result.rows[0].firstName;
      studentInfo.lastName = result.rows[0].lastName;
      result.rows.map(notebookInfo => {
        studentInfo.notebooks.push({
          notebookId: notebookInfo.notebookId,
          notebookName: notebookInfo.notebookName
        });
      });
      res.status(200).json(studentInfo);
    })
    .catch(err => next(err));

});

// CREATE A NEW NOTE
app.post('/api/notes', (req, res, next) => {
  if (!req.body.notebookId) {
    return res.status(400).json({ error: 'all notes must have notebookId' });
  }
  if (!req.body.noteTitle) {
    return res.status(400).json({ error: 'all notes must have noteTitle' });
  }
  if (!req.body.noteContent) {
    return res.status(400).json({ error: 'all notes must have noteContent' });
  }
  if (!req.body.noteDifficulty) {
    return res.status(400).json({ error: 'all notes must have noteDifficulty' });
  }
  if (!req.body.noteResource) {
    return res.status(400).json({ error: 'all notes must have noteResource' });
  }
  if (!req.body.noteCode) {
    return res.status(400).json({ error: 'all notes must have noteCode' });
  }
  if (!req.body.noteTags && req.body.noteTags !== '') {
    return res.status(400).json({ error: 'all notes must have noteTags' });
  }
  const noteTags = req.body.noteTags;
  const noteResource = JSON.stringify(req.body.noteResource);
  const noteCode = JSON.stringify(req.body.noteCode);
  const noteValues = [
    req.body.notebookId,
    req.body.noteTitle,
    req.body.noteContent,
    req.body.noteDifficulty,
    noteResource,
    noteCode
  ];

  const tagsArray = [];

  noteTags.map(tag => {
    const individualTagArray = [];
    individualTagArray.push(tag);
    tagsArray.push(individualTagArray);
  });

  const noteSQL = format(`
    with "insertedNote" as (
        insert into "notes" ("notebookId", "noteTitle", "noteContent", "noteDifficulty", "noteResource", "noteCode")
        values (%L)
        returning *
    ), "insertedTags" as (
        insert into "tagTable" ("tagName")
        values %L
        on conflict ("tagName")
        do update
        set "updatedAt" = now()
        returning *
    ), "insertedTagRelations" as (
        insert into "tagRelations" ("itemId", "tagId", "type")
        select "noteId", "tagId", 'note' as "type"
        from "insertedNote", "insertedTags"
        on conflict ("itemId", "tagId", "type")
        do nothing
    )

    select "noteId", "notebookId", "noteTitle", "noteContent", "noteDifficulty",
     "noteResource", "noteCode"  from "insertedNote";`, noteValues, tagsArray);

  db.query(noteSQL)
    .then(response => {
      const newNote = response.rows[0];
      newNote.noteTags = noteTags;
      res.status(201).json(response.rows[0]);
    })
    .catch(err => next(err));
});

// DELETE A NOTE BY PROVIDING A NOTE ID

app.delete('/api/notes/:noteId', (req, res, next) => {
  const { noteId } = req.params;
  const noteIdInt = parseInt(req.params.noteId);
  if (!Number.isInteger(noteIdInt) || noteIdInt <= 0) {
    return res.status(400).json({ error: '"noteId" must be a positive integer' });
  }
  const sql = `
    DELETE FROM "notes"
    WHERE       "noteId" = $1
    RETURNING *
    `;
  const id = [noteId];
  db.query(sql, id)
    .then(result => {
      const returnedNote = result.rows[0];

      if (!returnedNote) {
        return res.status(404).json({ error: `Cannot find note with "noteId" ${noteId}` });
      } else {
        return res.status(204).json({ returnedNote: `Successfully deleted ${noteId}` });
      }
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: 'An unexpected error occurred.' });
    });
});

// UPDATE A NOTE BY PROVIDING A NOTE ID

app.put('/api/notes/:noteId', (req, res, next) => {
  const noteId = parseInt(req.params.noteId);
  if (!Number.isInteger(noteId) || noteId <= 0) {
    return res.status(400).json({ error: 'noteId must be a positive integer' });
  }

  if (!req.body.notebookId || !req.body.noteTitle || !req.body.noteContent ||
    !req.body.noteDifficulty || !req.body.noteResource || !req.body.noteCode || !req.body.noteTags) {
    return res.status(400).json({ error: 'all notes must have complete data' });
  }
  const noteTags = req.body.noteTags;
  const noteResource = JSON.stringify(req.body.noteResource);
  const noteCode = JSON.stringify(req.body.noteCode);
  const newNoteValues = [
    req.body.notebookId,
    req.body.noteTitle,
    req.body.noteContent,
    req.body.noteDifficulty,
    noteResource,
    noteCode,
    noteId
  ];
  const tagsArray = [];

  noteTags.map(tag => {
    const individualTagArray = [];
    individualTagArray.push(tag);
    tagsArray.push(individualTagArray);

  });

  const noteSQL = format(`
    with "insertedNote" as (
       update "notes"
       set "notebookId" = $1,
           "noteTitle" = $2,
           "noteContent" = $3,
           "noteDifficulty" = $4,
           "noteResource" = $5,
           "noteCode" = $6
     where "noteId" = $7
    returning*
    ), "insertedTags" as (
        insert into "tagTable" ("tagName")
        values %L
        on conflict ("tagName")
        do update
        set "updatedAt" = now()
        returning*
    ), "insertedTagRelations" as (
        insert into "tagRelations" ("itemId", "tagId", "type")
        select "noteId", "tagId", 'note' as "type"
        from "insertedNote", "insertedTags"
        on conflict ("itemId", "tagId", "type")
        do nothing
    )

    select "noteId", "notebookId", "noteTitle", "noteContent", "noteDifficulty",
     "noteResource", "noteCode"  from "insertedNote";`, tagsArray);

  db.query(noteSQL, newNoteValues)
    .then(response => {
      const updatedNote = response.rows[0];
      if (!updatedNote) {
        res.status(404).json({ error: `noteId ${noteId} does not exist` });
      } else {
        const returnedNote = response.rows[0];
        returnedNote.noteTags = noteTags;
        res.status(200).json(returnedNote);
      }
    })
    .catch(err => next(err));

});

// SEARCH FOR A NOTE BY PROVIDING THE NOTE TITLE
app.get('/api/notes/search/:noteTitle', (req, res, next) => {
  const noteTitle = req.params.noteTitle;
  const sql = `
  SELECT "noteTitle", "noteId", "noteDifficulty", "createdAt", "noteContent"
  FROM  "notes"
  WHERE to_tsvector("noteTitle"|| ' ' || "noteContent") @@ to_tsquery($1)
  `;
  const title = [noteTitle];
  db.query(sql, title)
    .then(result => {
      if (!result.rows[0]) {
        return res.status(200).json({ message: `No notes contain: ${noteTitle}` });
      } else {
        return res.status(200).json(result.rows);
      }
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: 'An unexpected error occurred.' });
    });
});

// SEARCH NOTES BY PROVIDING NOTE TAG
app.get('/api/notes/search-tags/:tag', (req, res, next) => {
  const tagToSearch = req.params.tag;
  const sql = `
    select "noteTitle", "noteId", "noteDifficulty", "noteContent"
    from  "notes"
    join "tagRelations" on "notes"."noteId" = "tagRelations"."itemId"
    join "tagTable" using ("tagId")
    where to_tsvector("tagName") @@ to_tsquery($1);`;

  db.query(sql, [tagToSearch])
    .then(result => {
      if (!result.rows[0]) {
        return res.status(200).json({ message: `No notes are tagged: ${tagToSearch}` });
      } else {
        return res.status(200).json(result.rows);
      }
    })
    .catch(err => next(err));

});

// SEARCH FOR A NOTE BY PROVIDING THE NOTE DIFFICULTY
app.get('/api/notes/search/difficulty/:noteDifficulty', (req, res, next) => {
  const noteDifficulty = parseInt(req.params.noteDifficulty, 10);
  if (!Number.isInteger(noteDifficulty) || noteDifficulty <= 0 || noteDifficulty > 5) {
    return res.status(400).json({ error: 'Difficulty must be whole number from 1 to 5.' });
  }
  const sql = `
  SELECT "noteTitle", "noteId", "noteContent"
  FROM  "notes"
  WHERE "noteDifficulty" =$1
  `;
  const params = [noteDifficulty];
  db.query(sql, params)
    .then(result => {
      if (!result.rows[0]) {
        return res.status(200).json({ message: 'Cannot find note for this difficulty level.' });
      } else {
        return res.status(200).json(result.rows);
      }
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: 'An unexpected error occurred.' });
    });
});

// USER CAN VIEW INDIVIDUAL FLASHCARD
app.get('/api/flashcards/:fcId', (req, res, next) => {
  const fcId = req.params.fcId;
  const fcIdInt = parseInt(req.params.fcId);
  if (!Number.isInteger(fcIdInt) || fcIdInt <= 0) {
    return res.status(400).json({ error: '"fcId" must be a positive integer' });
  }
  const sql = `
  select *
  from "fcItem"
  join "fcDeck" using ("fcDeckId")
  join "notebooks" using ("notebookId")
  where "fcId" = $1
  `;
  const id = [fcId];
  db.query(sql, id)
    .then(result => {
      const fc = result.rows[0];
      if (!fc) {
        next(new ClientError(`Cannot find flashcard with "fcId" ${fcId}`, 404));
      } else {
        const tagSQL = `
        select "tagRelations"."itemId", "tagRelations"."type", "tagTable"."tagName"
        from "tagRelations"
        join "tagTable" using ("tagId")
        where "tagRelations"."itemId" = $1
        and "tagRelations"."type" = 'fc';
        `;
        db.query(tagSQL, id)
          .then(result => {
            const data = result.rows;
            const tagsArray = [];
            data.map(tag => tagsArray.push(tag.tagName));
            return tagsArray;
          })
          .then(tagsArray => {
            fc.fcTags = tagsArray;
            res.status(200).json(fc);
          })
          .catch(err => next(err));
      }
    })
    .catch(err => next(err));
});

// USER CAN VIEW ALL FLASHCARDS
// app.get('/api/flashcards', (req, res, next) => {
//   const sql = `
//   SELECT *
//   FROM "fcDeck"
//   JOIN "fcItem" USING ("fcDeckId")
//   `;
//   db.query(sql)
//     .then(result => {
//       return res.status(200).json(result.rows);
//     })
//     .catch(err => next(err,
//       res.status(500).json({ error: 'An unexpected error occurred' }))
//     );
// });

// USER CAN VIEW A LIST OF FLASHCARD DECKS WITH A COUNT OF FLASHCARDS FOR EACH DECK
// BY PROVIDING A STUDENT ID. It also includes student's first name for the Header.

app.get('/api/flashcardDecks/:studentId', (req, res, next) => {
  const studentId = parseInt(req.params.studentId);
  const param = [req.params.studentId];
  if (!Number.isInteger(studentId) || studentId <= 0) {
    return res.status(400).json({ error: 'studentId must be a positive integer' });
  }
  const sql = `
  select "fcDeck"."fcDeckId", "notebooks"."notebookName"
  from "fcDeck"
  join "notebooks" using ("notebookId")
  where "notebooks"."studentId" = $1;
  `;
  db.query(sql, param)
    .then(result => {
      const fcDeckInfo = result.rows;
      fcDeckInfo.map(fcDeck => {
        fcDeck.fcCount = 0;
      });
      if (!fcDeckInfo) {
        next(new ClientError(`Cannot find student with "studentId" ${studentId}`, 404));
      } else {
        const fcSQL = `
        select "fcDeck"."fcDeckId", "fcItem"."fcId"
        from "fcItem"
        join "fcDeck" using ("fcDeckId")
        join "notebooks" using ("notebookId")
        where "studentId" = $1
        `;
        db.query(fcSQL, param)
          .then(result => {
            const countIncrementor = result.rows;
            for (var fcDeckIndex = 0; fcDeckIndex < fcDeckInfo.length; fcDeckIndex++) {
              for (var countIndex = 0; countIndex < countIncrementor.length; countIndex++) {
                if (fcDeckInfo[fcDeckIndex].fcDeckId === countIncrementor[countIndex].fcDeckId) {
                  fcDeckInfo[fcDeckIndex].fcCount++;
                }
              }
            }
            const nameSQL = `
              select "firstName"
              from "students"
              where "students"."studentId" = $1;
              `;
            db.query(nameSQL, param)
              .then(result => {
                fcDeckInfo.push({ firstName: result.rows[0].firstName });
                res.status(200).json(fcDeckInfo);
              });
          })
          .catch(err => next(err));
      }
    })
    .catch(err => next(err));
});

// USER CAN REVIEW FLASHCARDS BY DECK
app.get('/api/flashcards/deck/:fcDeckId', (req, res, next) => {
  const fcDeckId = parseInt(req.params.fcDeckId);
  if (!Number.isInteger(fcDeckId) || fcDeckId <= 0) {
    return res.status(400).json({ error: '"fcDeckId" must be a positive integer' });
  }
  const sql = `
  SELECT *
  FROM "fcDeck"
  JOIN "fcItem" USING ("fcDeckId")
  WHERE "fcDeckId" = $1
  `;
  const fcDeckIdValue = [fcDeckId];
  db.query(sql, fcDeckIdValue)
    .then(result => {
      return res.status(200).json(result.rows);
    })
    .catch(err => next(err,
      res.status(500).json({ error: 'An unexpected error occurred' }))
    );
});

// CREATE A NEW FLASHCARD
app.post('/api/flashcards/create', (req, res, next) => {
  const fcQuestion = req.body.fcQuestion;
  const fcAnswer = req.body.fcAnswer;
  const fcDeckId = req.body.fcDeckId;
  const fcTags = req.body.fcTags;
  if (!fcQuestion || !fcAnswer || !fcDeckId || !fcTags) {
    return res.status(400).json({ error: 'Flashcard information is missing, please make sure to enter all required flashcard data when adding it to the deck.' });
  }
  if (!Number.isInteger(fcDeckId) || fcDeckId <= 0) {
    return res.status(400).json({ error: '"fcDeckId" must be a positive integer' });
  }
  const fcValues = [
    fcQuestion,
    fcAnswer,
    fcDeckId
  ];

  const tagsArray = [];

  fcTags.map(tag => {
    const individualTagArray = [];
    individualTagArray.push(tag);
    tagsArray.push(individualTagArray);
  });
  const fcSQL = format(`
  with "insertedFlashcard" as (
      insert into "fcItem" ("fcQuestion", "fcAnswer", "fcDeckId")
      values (%L)
      returning *
  ), "insertedTags" as (
    insert into "tagTable" ("tagName")
    values %L
    on conflict ("tagName")
    do update
    set "updatedAt" = now()
    returning *
  ), "insertedTagRelations" as (
    insert into "tagRelations" ("itemId", "tagId", "type")
    select "fcId", "tagId", 'fc' as "type"
    from "insertedFlashcard", "insertedTags"
    on conflict ("itemId", "tagId", "type")
    do nothing
  )

  select "fcId", "fcQuestion", "fcAnswer" from "insertedFlashcard";`, fcValues, tagsArray);
  db.query(fcSQL)
    .then(response => {
      const newFc = response.rows[0];
      newFc.tags = fcTags;
      res.status(201).json(response.rows[0]);
    })
    .catch(err => next(err));
});

// USER CAN SEARCH FLASHCARDS BY A SINGLE TAG, NOT CASE SENSITIVE
// Note: can make this more robust by only showing flashcards from a certain deckId
//   and student Id
app.get('/api/flashcards/search/:fcTag', (req, res, next) => {
  const fcTag = req.params.fcTag;
  const fcTagSearchSQL = `
  SELECT "fcItem"."fcId", "fcItem"."fcQuestion", "fcItem"."fcAnswer", "tagTable"."tagName"
    FROM "fcItem"
    JOIN "tagRelations" ON "fcItem"."fcId" = "tagRelations"."itemId"
    JOIN "tagTable" using ("tagId")
    WHERE to_tsvector("tagName") @@ to_tsquery($1)
    `;
  const fcTagValue = [fcTag];
  db.query(fcTagSearchSQL, fcTagValue)
    .then(result => {
      if (!result.rows[0]) {
        return res.status(404).json({ error: `Cannot find flashcard with "fcTag" ${fcTag}` });
      } else {
        return res.status(200).json(result.rows);
      }
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: 'An unexpected error occurred.' });
    });
});

// CREATE A NEW NOTEBOOK
app.post('/api/notebooks', (req, res, next) => {
  const notebookName = req.body.notebookName;
  if (!notebookName) {
    return res.status(400).json({ error: 'Notebook information is missing, please make sure to enter all required notebook data when creating it.' });
  }
  const createNotebookSQL = `
  insert into "notebooks" ("studentId", "notebookName")
  values (1, $1)
  returning *
  `;
  const createNotebookValues = [
    notebookName
  ];
  db.query(createNotebookSQL, createNotebookValues)
    .then(response => res.status(201).json(response.rows[0]))
    .catch(err => next(err));
});

app.use('/api', (req, res, next) => {
  next(new ClientError(`cannot ${req.method} ${req.originalUrl}`, 404));
});

app.use((err, req, res, next) => {
  if (err instanceof ClientError) {
    res.status(err.status).json({ error: err.message });
  } else {
    console.error(err);
    res.status(500).json({
      error: 'an unexpected error occurred'
    });
  }
});

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log('Listening on port', process.env.PORT);
});
