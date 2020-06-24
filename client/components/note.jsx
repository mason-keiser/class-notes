import React from 'react';
import { Link } from 'react-router-dom';

export default function NoteItem(props) {
  const note = props.note;
  return (
    <div id={note.noteId}>
      <div>
        <Link to="/notes/{note.noteId}">
          <h3>{note.noteTitle}</h3>
        </Link>
        <p>{note.noteContent}</p>
      </div>
    </div>
  );
}
