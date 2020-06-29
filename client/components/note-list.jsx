import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Form, FormGroup, Input } from 'reactstrap';

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
    this.state = { notes: [], currentId: null, currentName: '' };
  }

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
    if (this.state.currentId === null || this.state.currentId === 0) {
      return (
        <div className="note-page-container loading">
          <h3 className="note-font-2">Loading...</h3>
        </div>
      );
    }
    if (!this.state.notes.length) {
      return (
        <div className="note-page-container loading">
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
    const names = this.props.notebooks;
    return (
      <div className = "note-list-container d-flex flex-column " >
        <div className="note-list-container-border">
          <div className="d-flex flex-row align-items-center justify-content-center mb-5 mt-5">
            <Form className="col-2">
              <FormGroup className="mb-0">
                <Input type="select" name="notebookName" id="notebookName"
                  style={{
                    color: '#24997F',
                    fontSize: '18px',
                    fontWeight: 'bold',
                    border: '1.5px solid #3F3F3D',
                    backgroundColor: '#333333',
                    padding: '0 0 0 15px'
                  }}>
                  {
                    names.map(item => {
                      return (
                        <option key={item.notebookId}>{item.notebookName}</option>
                      );
                    })
                  }
                </Input>
              </FormGroup>
            </Form>
          </div>
          <div className="col-12 list-container d-flex flex-row flex-wrap justify-content-around ">
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
      </div>
    );
  }
}
