require('dotenv/config');
const express = require('express');

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
  SELECT *
  FROM  "notes"
  WHERE "noteId" = $1
  `;
  const noteParam = [req.params.noteId];
  const noteId = parseInt(req.params.noteId);
  if (!Number.isInteger(noteId) || noteId <= 0) {
    return res.status(400).json({ error: '"noteId" must be a positive integer' });
  }
  db.query(sql, noteParam)
    .then(result => {
      const note = result.rows[0];
      if (!sql) {
        next(new ClientError('An unexpected error occurred', 500));
      }
      if (!note) {
        next(new ClientError(`Cannot find note with "noteId" ${noteId}`, 404));
      } else {
        return res.status(200).json(note);
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
  select *
  from "notes"
  join "notebooks" using ("notebookId")
  where "notebookId" = $1;`;

  db.query(sql, [notebookId])
    .then(result => res.status(200).json(result.rows))
    .catch(err => next(err));
});

// GET INFORMATION ABOUT ALL NOTES FOR ALL STUDENTS WITHIN THE NOTES TABLE

app.get('/api/notes', (req, res, next) => {
  const sql = `
  select "noteId" , "noteTitle", "noteContent"
  from "notes";
  `;
  db.query(sql)
    .then(result => res.status(200).json(result.rows))
    .catch(err => next(err));
});

// CREATE A NEW NOTE

app.post('/api/notes', (req, res, next) => {
  if (!req.body.notebookId || !req.body.noteTitle || !req.body.noteContent ||
    !req.body.noteDifficulty || !req.body.noteResource || !req.body.noteCode) {
    return res.status(400).json({ error: 'all notes must have complete data' });
  }

  const noteSQL = `
  insert into "notes" ("notebookId", "noteTitle", "noteContent", "noteDifficulty", "noteResource", "noteCode")
  values ($1, $2, $3, $4, $5, $6)
  returning *`;

  const noteValues = [
    req.body.notebookId,
    req.body.noteTitle,
    req.body.noteContent,
    req.body.noteDifficulty,
    req.body.noteResource,
    req.body.noteCode
  ];
  db.query(noteSQL, noteValues)
    .then(response => res.status(201).json(response.rows[0]))
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
    !req.body.noteDifficulty || !req.body.noteResource || !req.body.noteCode) {
    return res.status(400).json({ error: 'all notes must have complete data' });
  }

  const newNoteValues = [
    req.body.notebookId,
    req.body.noteTitle,
    req.body.noteContent,
    req.body.noteDifficulty,
    req.body.noteResource,
    req.body.noteCode,
    noteId
  ];

  const sql = `
    update "notes"
       set "notebookId" = $1,
           "noteTitle" = $2,
           "noteContent" = $3,
           "noteDifficulty" = $4,
           "noteResource" = $5,
           "noteCode" = $6
     where "noteId" = $7
    returning*;`;

  db.query(sql, newNoteValues)
    .then(response => {
      const updatedNote = response.rows[0];
      if (!updatedNote) {
        res.status(404).json({ error: `noteId ${noteId} does not exist` });
      } else {
        res.status(200).json(response.rows[0]);
      }
    })
    .catch(err => next(err));

});

//SEARCH FOR A NOTE BY PROVIDING THE NOTE TITLE
app.get('/api/notes/search/:noteTitle', (req, res, next) => {
  const noteTitle = req.params.noteTitle;
  const sql = `
  SELECT "noteTitle", "noteId", "noteDifficulty", "createdAt", "noteContent"
  FROM  "notes"
  WHERE to_tsvector("noteTitle") @@ to_tsquery($1)
  `;
  const title = [noteTitle];
  db.query(sql, title)
    .then(result => {
      if (!result.rows[0]) {
        return res.status(404).json({ error: `Cannot find note with "noteTitle ${noteTitle}` });
      } else {
        return res.status(200).json(result.rows);
      }
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: 'An unexpected error occurred.' });
    });
});



//USER CAN VIEW INDIVIDUAL FLASHCARD 
app.get('/api/flashcards/:fcDeckId', (req, res, next) => {
  const deckId = req.params.fcDeckId
  const deckIdInt = parseInt(req.params.fcDeckId);
  if (!Number.isInteger(deckIdInt) || deckIdInt <= 0) {
    return res.status(400).json({ error: '"deckId" must be a positive integer' });
  }
  const sql = `
  SELECT *
  FROM  "fcDeck"
  JOIN  "fcItem" USING ("fcDeckId")
  WHERE "fcDeckId" = $1
  `;
  const id = [deckId]
  db.query(sql, id)
    .then(result => {
      if (!result.rows[0]) {
        return res.status(404).json({ error: `Cannot find flashcard with given "deckId" ${deckId}`})
      } else {
        return res.status(200).json(result.rows[0])
      }
    })
    .catch(err => res.status(500).json({ error: 'An unexpected error occurred'}))
})

//USER CAN REVIEW FLASHCARDS
app.get('/api/flashcards', (req, res, next) => {
  const sql = `
  SELECT *
  FROM "fcDeck"
  JOIN "fcItem" USING ("fcDeckId")
  `;
  db.query(sql)
    .then(result => {
      return res.status(200).json(result.rows)
      })
    .catch(error => res.status(500).json({ error: 'An unexpected error occurred'}))
}) 


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
