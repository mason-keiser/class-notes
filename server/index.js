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

app.get('/api/health-check', (req, res, next) => {
  db.query('select \'successfully connected\' as "message"')
    .then(result => res.json(result.rows[0]))
    .catch(err => next(err));
});

app.get('/api/notes/:noteId', (req, res, next) => {
  const sql = `
  SELECT *
  FROM  "notes"
  WHERE "noteId" = $1
  `;
  const noteParam = [req.params.noteId]
  const noteId = parseInt(req.params.noteId)
  if (!Number.isInteger(noteId) || noteId <= 0) {
    return res.status(400).json({ error: '"noteId" must be a positive integer' })
  }
  db.query (sql,noteParam)
    .then(result => {
      const note = result.rows[0];
      if (!sql) {
        next(new ClientError('An unexpected error occurred' ,500))
      }
      if (!note) {
        next(new ClientError(`Cannot find note with "noteId" ${noteId}`, 404))
      } else {
        return res.status(200).json(note);
      }
    })
    .catch(err => next(err))
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
