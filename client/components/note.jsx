import React from 'react';
import NoteHeader from './note-header';
import NoteComponent from './note-component';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { Link } from 'react-router-dom';

class Note extends React.Component {
  constructor(props) {
    super(props);
    this.state = { note: null, view: 'viewNote' };
    this.setView = this.setView.bind(this);
    this.deleteNote = this.deleteNote.bind(this);
  }

  componentDidMount() {
    if (this.props.match.params.noteId) {
      fetch(`/api/notes/${this.props.match.params.noteId}`)
        .then(res => res.json())
        .then(data => this.setState({ note: data }))
        .catch(error => console.error(error));
    } else {
      this.setState({
        note: {
          createdAt: '',
          noteCode: {},
          noteContent: '',
          noteDifficulty: null,
          noteId: null,
          noteResource: [],
          noteTile: '',
          notebookId: null,
          tags: []
        },
        view: 'createNote'
      });
    }
  }

  setView(viewName) {
    this.setState({ view: viewName });
  }

  deleteNote(noteId) {
    fetch(`/api/notes/${noteId}`, {
      method: 'DELETE'
    })
      .then(() => {
        this.setState({ view: 'deleteSuccess' });
      })
      .catch(error => console.error(error));
  }

  render() {
    if (this.state.view === 'deleteSuccess') {
      return (
        <div className="note-page-container">
          <NoteHeader />
          <div className="note-delete">
            <h3>Your note has been deleted.</h3>
            <Link to="/notebook" className="notebooks-link">
              <Button className="solid-button mt-4">Back</Button>
            </Link>
          </div>
        </div>
      );
    }
    const justifyContent = this.state.view === 'viewNote' || this.state.view === 'createNote'
      ? 'justify-content-between' : 'justify-content-start';
    const note = this.state.note;
    return note === null ? (null)
      : (
        <div className="note-page-container">
          <NoteHeader view={this.state.view} tags={note.tags} difficulty={note.noteDifficulty} title={note.noteTitle} />
          <main className="note-main">
            <div className="note-left-component col-6">
              <div className="d-flex flex-row align-items-center mb-4">
                <div className="note-font-1">Difficulty:</div>
                <button className="difficulty diff-1"></button>
                <button className="difficulty diff-2"></button>
                <button className="difficulty diff-3"></button>
                <button className="difficulty diff-4"></button>
                <button className="difficulty diff-5"></button>
              </div>
              <Form>
                <FormGroup className="mb-4">
                  <Label for="notebookName" className="note-font-1">Select Notebook:</Label>
                  <Input type="select" name="notebookName" id="notebookName">
                    <option defaultValue>{note.noteId}</option>
                    <option>Create New Notebook</option>
                  </Input>
                </FormGroup>
                <FormGroup>
                  <Label for="noteContent" className="note-font-1">Enter Note:</Label>
                  <textarea className="form-control note-content" type="textarea" name="noteContent" id="noteContent" defaultValue={note.noteContent}></textarea>
                </FormGroup>
              </Form>
            </div>
            <div className={`col-5 note-right-component d-flex flex-column ${justifyContent}`}>
              <div className="note-top-button-group mb-4">
                <Button
                  className="solid-button"
                  onClick={() => this.setView('flashcard')}>Flashcard</Button>
                <Button
                  className="solid-button ml-4"
                  onClick={() => this.setView('resource')}>Resource</Button>
                <Button
                  className="solid-button ml-4"
                  onClick={() => this.setView('code')}>Code</Button>
              </div>
              <NoteComponent
                noteId={note.noteId}
                view={this.state.view}
                setView={this.setView}
                resource={note.noteResource}
                code={note.noteCode}
                deleteNote={this.deleteNote} />
            </div>
          </main>
        </div>
      );
  }
}

export default Note;
