import React from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

class NoteComponent extends React.Component {
  render() {
    if (this.props.view === 'viewNote') {
      return (
        <div className="d-flex flex-row align-items-center justify-content-center">
          <Button className="solid-button">Update</Button>
          <Button className="solid-button ml-5">Delete</Button>
        </div>
      );
    } else if (this.props.view === 'createNote') {
      return (
        <div>
          <Button color="success">Create</Button>
        </div>
      );
    } else if (this.props.view === 'flashcard') {
      return (
        <Form>
          <FormGroup className="mb-4">
            <Label for="flashcardQuestion" className="note-font-1">Enter Question:</Label>
            <Input type="textarea" name="flashcardQuestion" id="flashcardQuestion" />
          </FormGroup>
          <FormGroup className="mb-4">
            <Label for="flashcardAnswer" className="note-font-1">Enter Answer:</Label>
            <Input type="textarea" name="flashcardAnswer" id="flashcardAnswer" />
          </FormGroup>
          <div className="d-flex flex-row align-items-center justify-content-between">
            <FormGroup className="mb-5 flashcard-select-tag">
              <Label for="flashcardTag">Flashcard Tag:</Label>
              <Input type="select" name="flashcardTag" id="flashcardTag">
                <option defaultValue>Select a Tag</option>
                <option>Create new tag</option>
              </Input>
            </FormGroup>
            <Button className="solid-button-large ml-4">Make Flashcard</Button>
          </div>
          <Button className="solid-button cancel-btn" onClick={() => this.props.setView('viewNote')}>Cancel</Button>
        </Form>
      );
    } else if (this.props.view === 'resource') {
      return (
        <Form>
          <div className="d-flex flex-row align-items-center justify-content-between mb-5">
            <FormGroup className="resource">
              <Label for="resourceName">Resource Name</Label>
              <Input type="text" name="resourceName" id="resourceName" placeholder="Name" />
            </FormGroup>
            <FormGroup className="resource-link">
              <Label for="resourceLink"></Label>
              <Input type="text" name="resourceLink" id="resourceLink" placeholder="Name" />
            </FormGroup>
          </div>
          <Button className="add-button"><i className="fas fa-plus"></i></Button>
          <Button className="solid-button cancel-btn" onClick={() => this.props.setView('viewNote')}>Cancel</Button>
        </Form>
      );
    } else if (this.props.view === 'code') {
      return (
        <>
          <h3>HTML</h3>
          <h3>CSS</h3>
          <h3>JavaScript</h3>
        </>
      );
    }
  }
}

export default NoteComponent;
