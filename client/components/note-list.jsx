import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';

function NoteListItem(props) {
  const noteListItem = props.note;
  const noteId = noteListItem.noteId;
  return (
    <div className="my-y pb-3 note-list-item mb-5" id={noteId}>
      <div className="card h-100">
        <div className="card-body m-0 p-0 note-list-item-body rounded-0 h-100">
          <Link to={{ pathname: '/notes/' + noteId }} style={{ textDecoration: 'none' }}>
            <p className="card-title text-left note-list-item-title">{noteListItem.noteTitle}</p>
            <p className="card-text text-left note-list-item-content mb-3">{noteListItem.noteContent}</p>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default class NoteList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { notes: [], notebookName: '' };
  }

  componentDidMount() {
    fetch(`/api/notebooks/${this.props.notebookId}`)
      .then(res => res.json())
      .then(data => this.setState({
        notes: data,
        notebookName: data[data.length - 1].notebookName
      }))
      .catch(err => console.error('fetch failed:', err));
  }

  render() {
    if (this.state === null) {
      return (
        <div className="page-container loading">
          <h3 className="note-font-2">Loading...</h3>
        </div>
      );
    }
    if (!this.state.notes.length) {
      return (
        <div className="page-container loading">
          <h3 className="note-font-2 mb-4">Notebook</h3>
          <h5 className="color-white">You do not have any notebook.</h5>
          <h5 className="color-white">Please create one.</h5>
          <Link to="/notes/create">
            <Button outline className="header-outline-button mt-4">New Note</Button>
          </Link>
        </div>
      );
    }
    const notes = this.state.notes;
    return (
      <div className = "note-list-container d-flex flex-column " >
        <div className="note-list-container-border">
          <div className="d-flex flex-row align-items-center justify-content-center mb-5 mt-5">
            <p className="note-list-notebook-title">{this.state.notebookName}</p>
          </div>
          <div className="col-12 list-container d-flex flex-row flex-wrap justify-content-around ">
            {
              notes.map(item => {
                if (!item.noteId) {
                  return;
                }
                return (
                  <NoteListItem
                    key={item.noteId}
                    note={item}
                    id={item.noteId} />
                );
              })
            }
          </div>
        </div>
      </div>
    );
  }
}
