import React from 'react';
import { Link } from 'react-router-dom';
import { Button, FormGroup, Label, Input } from 'reactstrap';
import NotebookHeader from './notebook-header';

export default class NotebooksList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notebooks: null,
      notebookName: null
    };
    this.notebookNameChange = this.notebookNameChange.bind(this);
    this.getNotebooksInfo = this.getNotebooksInfo.bind(this);
    this.createNotebookName = this.createNotebookName.bind(this);
  }

  componentDidMount() {
    this.getNotebooksInfo();
  }

  getNotebooksInfo() {
    fetch('/api/notebooks/notes/1')
      .then(res => res.json())
      .then(data => {
        this.setState({
          notebooks: data
        });
      })
      .catch(err => console.error('getNotebooksInfo() fetch failed:', err));
  }

  notebookNameChange(event) {
    this.setState({
      notebookName: event.target.value
    });
  }

  createNotebookName(event) {
    event.preventDefault();
    if (!this.state.notebookName) {
      alert('Error: Please enter a notebook title before creating it');
      return;
    }
    const { notebooks, ...rest } = this.state;
    fetch('/api/notebooks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(rest)
    })
      .then(res => res.json())
      .then(data => {
        this.setState({
          notebooks: null,
          notebookName: null
        });
      },
      this.getNotebooksInfo())
      .catch(error => console.error(error));
  }

  render() {
    const notebooks = this.state.notebooks;
    if (notebooks === null) {
      return (
        <>
          <NotebookHeader studentName="" />
          <div className="page-container-footer loading">
            <h3 className="note-font-2">Loading...</h3>
          </div>
          <footer className="footer">
            <div className="col-2">
              <h6 className="mb-0"> &copy;All rights reserved</h6>
            </div>
            <div className="col"></div>
          </footer>
        </>
      );
    }
    return (
      <>
        <NotebookHeader studentName={notebooks[notebooks.length - 1].firstName} />
        <main className="page-container-footer notebooks-list-container d-flex justify-content-around">
          <div className="notebook-list-form-container col-3">
            <FormGroup className="newNotebookName mb-5">
              <Label for="newNotebookName" className="note-font-1">Enter New Notebook Name</Label>
              <Input type="text" name="newNotebookName" id="newNotebookName" placeholder="Enter notebook title" className="note-input"
                onChange={this.notebookNameChange} />
              <Button className="solid-button-large mt-3" onClick={this.createNotebookName}>Create Notebook</Button>
            </FormGroup>
          </div>
          <div className="col-5 flashcard-left-container">
            {notebooks.map(notebookItem => {
              if (!(notebookItem.notebookId)) {
                return;
              }
              return (
                <div key={notebookItem.notebookId} id={notebookItem.notebookId}
                  className="d-flex flex-row flashcard-general-info mb-5">
                  <div className="d-flex flex-column justify-content-between">
                    <div className="d-flex flex-row align-items-center">
                      <h2>{notebookItem.notebookName}</h2>
                      <h4 className="ml-5">{notebookItem.noteCount + ' notes'}</h4>
                    </div>
                    <div className="flashcard-button-container d-flex">
                      <Link to={{ pathname: `/notebook/${notebookItem.notebookId}` }}>
                        <Button className="solid-button mt-4 mr-4">View</Button>
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </main>
        <footer className="footer">
          <div className="col-2">
            <h6 className="mb-0"> &copy;All rights reserved</h6>
          </div>
          <div className="col"></div>
        </footer>
      </>
    );
  }
}
