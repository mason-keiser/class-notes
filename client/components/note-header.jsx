import React from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { Link } from 'react-router-dom';

export default class NoteHeader extends React.Component {
  constructor(props) {
    super(props);
    this.state = { student: [] };
  }

  render() {
    const closeButton = this.props.view === 'viewNote' ? '/notebook' : '/';
    const noteTitle = this.props.title === undefined ? 'Enter note title' : this.props.title;
    const diffColor = this.props.difficulty === null ? '' : this.props.difficulty;
    return (
      <header className="header-container d-flex flex-row justify-content-between">
        <div className="d-flex flex-row align-items-center">
          <Link to="/" className="d-flex flex-row align-items-center col-1">
            <i className="fa fa-bars theme-green fa-2x header-hamburger-icon"></i>
          </Link>
          <Form className="ml-5">
            <FormGroup className="mb-0">
              <Label for="noteTile"></Label>
              <input className="header-note-title" type="text" name="noteTile" id="noteTile" defaultValue={noteTitle}/>
            </FormGroup>
          </Form>
        </div>
        <div className="d-flex flex-row align-items-center justify-content-between col-2">
          <Form>
            <Input type="select" name="noteTags" id="noteTags">
              <option defaultValue>Note Tag</option>
              <option>Create new tag</option>
            </Input>
          </Form>
          <div className={`diff-status ml-4 diff-${diffColor}`}></div>
          <Link to={{ pathname: closeButton }}>
            <Button className="d-flex flex-row align-items-center justify-content-center close-page-button ml-4">
              <i className="fas fa-times"></i>
            </Button>
          </Link>
        </div>
      </header>
    );
  }

}
