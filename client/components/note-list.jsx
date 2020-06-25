import React from 'react';
import { Link } from 'react-router-dom';

function NoteListItem(props) {
  const noteListItem = props.note;
  const noteId = noteListItem.noteId;
  return (
    <div id={noteListItem.noteId}>
      <div>
        <Link to={{
          pathname: '/notes/' + noteId
        }}>
          <h3>{noteListItem.noteTitle}</h3>
        </Link>
        <p>{noteListItem.noteContent}</p>
      </div>
    </div>
  );
}

export default class NoteList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: []
    };
    this.getNotes = this.getNotes.bind(this);
  }

  getNotes() {
    fetch('api/notes')
      .then(response => response.json())
      .then(notesData => {
        this.setState({
          notes: notesData
        });
      })
      .catch(err => console.error('Fetch failed:', err));
  }

  componentDidMount() {
    this.getNotes();
  }

  render() {
    return (
      <div>
        {this.state.notes.map(noteListItem => {
          return (
            <NoteListItem
              key={noteListItem.noteId}
              note={noteListItem}/>
          );
        })}
      </div>
    );
  }
}
