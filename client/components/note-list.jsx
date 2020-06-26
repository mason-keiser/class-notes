import React from 'react';
import { Link } from 'react-router-dom';

function NoteListItem(props) {
  const noteListItem = props.note;
  const noteId = noteListItem.noteId;
  return (
    <div className="my-y pb-3 col-4 note-list-item" id={noteId}>
      <div className="card h-100">
        <div className="card-body m-0 p-0 note-list-item-body rounded-0 h-100">
          <Link to={{ pathname: '/notes/' + noteId }}>
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
    this.state = { notes: [], currentId: null, currentName: '' };
  }

  // handleChange(event) {
  //   this.setState({currentNotebook: event.target.value})
  // }

  componentDidMount() {
    this.setState({ currentId: 0 });
  }

  componentDidUpdate(prevProps) {
    if (this.props.notebooks !== prevProps.notebooks) {
      fetch(`/api/notebooks/${this.props.notebooks[this.state.currentId].notebookId}`)
        .then(res => res.json())
        .then(data => this.setState({
          notes: data,
          currentId: this.props.notebooks[this.state.currentId].notebookId,
          currentName: this.props.notebooks[this.state.currentId].notebookName
        }))
        .catch(err => console.error('getNotebookName() fetch failed:', err));
    }
  }

  render() {
    const notes = this.state.notes;
    return (
      <div className="note-list-container d-flex justify-content-center">
        <div className="d-flex flex-wrap card-deck note-list-container-border">
          <div className="col-12 d-flex flex-row align-items-center justify-content-center notebook-name mb-5 mt-2">
            <h1>{this.state.currentName}</h1>
            <i className="fas fa-chevron-down ml-5"></i>
          </div>
          {
            notes.map(item => {
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
    );
  }
}
