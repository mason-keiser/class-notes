import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';
import NotebookHeader from './notebook-header';

export default class NotebooksList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notebooks: null
    };
    this.getNotebooksInfo = this.getNotebooksInfo.bind(this);
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
        <main className="page-container-footer d-flex justify-content-between">
          <div className="col-4">
            {notebooks.map(notebookItem => {
              return (
                <div key={notebookItem.notebookId} id={notebookItem.notebookId}
                  className="d-flex flex-row flashcard-general-info mb-5">
                  <div className="d-flex flex-column justify-content-between">
                    <div className="d-flex flex-row align-items-center">
                      <h2>{notebookItem.notebookName}</h2>
                      <h4 className="ml-5">{notebookItem.noteCount + 'notes'}</h4>
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
