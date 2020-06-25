import React from 'react';
import { Link } from 'react-router-dom';

function NoteListItem(props) {
  const noteListItem = props.note;
  const noteId = noteListItem.noteId;
  return (
    <div className="my-y pb-3 col-4 note-list-item" id={noteId}>
      <div className="card h-100">
        <div className="card-body m-0 p-0 note-list-item-body rounded-0 h-100">
          <Link to={{
            pathname: '/notes' + noteId
          }}>
            <p className="card-title text-left note-list-item-title">{noteListItem.noteTitle}</p>
            <p className="card-text text-left note-list-item-content h-100 mb-3">{noteListItem.noteContent}</p>
          </Link>
        </div>
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
      <div className="note-list-container col-12 d-flex justify-content-center">
        <div className="col-10 d-flex flex-wrap card-deck m-0 note-list-container-border">
          {this.state.notes.map(noteListItem => {
            return (
              <NoteListItem
                key={noteListItem.noteId}
                note={noteListItem}/>
            );
          })}
        </div>
      </div>
    );
  }
}
