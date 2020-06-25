import React from 'react';
import { Button, Form, Input } from 'reactstrap';
import { Link } from 'react-router-dom';

export default class NoteHeader extends React.Component {
  constructor(props) {
    super(props);
    this.state = { student: [] };
    // this.getStudentData = this.getStudentData.bind(this);
  }

  // getStudentData() {
  //   fetch('/api/students/1')
  //     .then(response => response.json())
  //     .then(data => {
  //       this.setState({ student: data });
  //     })
  //     .catch(err => console.error('getStudentData() fetch failed:', err));
  // }

  // componentDidMount() {
  //   this.getStudentData();
  // }

  render() {
    return (
      <header className="header-container d-flex flex-row justify-content-between">
        <div className="d-flex flex-row">
          <Link to="/" className="d-flex flex-row align-items-center">
            <i className="fa fa-bars theme-green fa-2x header-hamburger-icon"></i>
          </Link>
          <h3 className="ml-5 note-font-2 theme-green align-items-center">Enter Note Title</h3>
        </div>
        <div className="col-3 d-flex flex-row align-items-center justify-content-between header-right-container">
          <Form>
            <Input type="select" name="noteTags" id="noteTags">
              <option defaultValue>Note Tag</option>
              <option>Create new tag</option>
            </Input>
          </Form>
          <div className="diff-status"></div>
          <Button>
            <Link to="/" className="d-flex flex-row align-items-center">
              <i className="fas fa-times"></i>
            </Link>
          </Button>
        </div>
      </header>
    );
  }

}
