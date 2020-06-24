import React from 'react';
import { Link } from 'react-router-dom';

export default function NoteItem(props) {
  const note = props.note;
  const noteId = note.noteId;
  return (
    <div id={note.noteId}>
      <div>
        <Link to={{
          pathname: '/api/notes/' + noteId
        }}>
          <h3>{note.noteTitle}</h3>
        </Link>
        <p>{note.noteContent}</p>
      </div>
    </div>
  );
}
