import React from 'react';
import NoteHeader from './note-header';
import NoteComponent from './note-component';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
// import { Link } from 'react-router-dom';

class Note extends React.Component {
  constructor(props) {
    super(props);
    this.state = { note: null, view: 'viewNote' };
    this.setView = this.setView.bind(this);
  }

  componentDidMount() {
    fetch(`/api/notes/${this.props.noteId}`)
      .then(res => res.json())
      .then(data => this.setState({ note: data }))
      .catch(error => console.error(error));
  }

  setView(viewName) {
    this.setState({ view: viewName });
  }

  render() {
    // const note = this.state.note;
    const justifyContent = this.state.view === 'viewNote' || this.state.view === 'createNote'
      ? 'justify-content-between' : 'justify-content-start';
    return (
      <div className="note-page-container">
        <NoteHeader />
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
                  <option defaultValue>Need Notebook Name</option>
                  <option>Create New Notebook</option>
                </Input>
              </FormGroup>
              <FormGroup>
                <Label for="noteContent" className="note-font-1">Enter Note:</Label>
                <Input style={{ height: '45vh' }} type="textarea" name="noteContent" id="noteContent" />
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
            <NoteComponent view={this.state.view} setView={this.setView} />
          </div>
        </main>
      </div>
    );
  }
}

export default Note;
