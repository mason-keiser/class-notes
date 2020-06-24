import React from 'react';
import { Link } from 'react-router-dom';

export default function NoteListItem(props) {
  const note = props.note;
  return (
    <div id={note.noteId}>
      <div>
        <Link to="/notes/{note.noteId}">
          <h3>{note.noteName}</h3>
        </Link>
      </div>
    </div>
  );
}
