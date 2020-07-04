import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';
import NotebookHeader from './notebook-header';

// function Notebook(props) {
//   const noteListItem = props.note;
//   const noteId = noteListItem.noteId;
//   return (
//     <div className="my-y pb-3 note-list-item mb-5" id={noteId}>
//       <div className="card h-100">
//         <div className="card-body m-0 p-0 note-list-item-body rounded-0 h-100">
//           <Link to={{ pathname: '/notes/' + noteId }} style={{ textDecoration: 'none' }}>
//             <p className="card-title text-left note-list-item-title">{noteListItem.noteTitle}</p>
//             <p className="card-text text-left note-list-item-content mb-3">{noteListItem.noteContent}</p>
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// }

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
    // const notebookInfo = this.state.notebook;
    // let showFlashcards;
    // if (this.state.showCards === true) {
    //   showFlashcards = (
    //     <div className="show-flashcard col-7">
    //       <div className='show-flashcard-title'>
    //         <h4 className="mb-0">View all available flashcards</h4>
    //         <Button className="solid-button ml-5" onClick={this.showFlashcard}>Close</Button>
    //       </div>
    //       <div className="show-flashcard-content">
    //         {this.state.flashcards.map(fcItem => {
    //           return (
    //             <div key={fcItem.fcId} className='mb-4 d-flex flex-row justify-content-around'>
    //               <div className='fc-card'>
    //                 <h4>{fcItem.fcQuestion}</h4>
    //               </div>
    //               <div className='fc-card'>
    //                 <h4>{fcItem.fcAnswer}</h4>
    //               </div>
    //             </div>
    //           );
    //         })}
    //       </div>
    //     </div>
    //   );
    // }
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
        <NotebookHeader studentName={notebooks.firstName} />
        <main className="page-container-footer d-flex justify-content-between">
          <div className="col-4">
            {notebooks.map(notebookItem => {
              return (
                <div key={notebookItem.notebookId}
                  className="d-flex flex-row flashcard-general-info mb-5">
                  <div className="d-flex flex-column justify-content-between">
                    <div className="d-flex flex-row align-items-center">
                      <h2>{notebookItem.notebookName}</h2>
                      <h4 className="ml-5">{notebookItem.noteCount + 'notes'}</h4>
                    </div>
                    <div className="flashcard-button-container d-flex">
                      <Link to={{ pathname: `/note-list/${notebookItem.notebookId}` }}>
                        <Button className="solid-button mt-4 mr-4">Study</Button>
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
