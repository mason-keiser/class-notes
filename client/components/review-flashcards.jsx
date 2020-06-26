import React from 'react';
import { Button } from 'reactstrap';
import { Link } from 'react-router-dom';

// eslint-disable-next-line no-unused-vars
function NextButton(props) {
  return (
    <Button>
      <Link to="#" className="d-flex flex-row align-items-center flashcard-next-button"
        onClick={props.goToNextFlashcard}>
          Next
      </Link>
    </Button>
  );
}

// eslint-disable-next-line no-unused-vars
function Indicator(props) {
  return (
    <div className={
      props.index <= props.activeIndex
        ? 'flashcard-indicator-focused'
        : 'flashcard-indicator-unfocused'
    }
    key={props.index}>
      <i className="fa fa-circle mx-1"></i>
    </div>
  );
}

// eslint-disable-next-line no-unused-vars
function Flashcard(props) {
  return (
    <div className={
      props.index === props.activeIndex
        ? 'd-flex justify-content-center col-12'
        : 'd-none'
    }
    key={props.index}>
      <h1 className="flashcard-question">{props.flashcard.question}</h1>
      <h1 className="flashcard-answer">{props.flashcard.answer}</h1>
    </div>
  );
}

export default class ReviewFlashcards extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      flashcards: []
    };
    this.getFlashcards = this.getFlashcards.bind(this);
  }

  // when possible, pass fcDeckId via props to the fetch endpoint
  getFlashcards() {
    fetch('api/flashcards/1')
      .then(response => response.json())
      .then(flashcardsData => {
        this.setState(state => ({
          flashcards: flashcardsData
        }));
      })
      .catch(err => console.error('getFlashcards() fetch failed:', err));
  }

  componentDidMount() {
    this.getFlashcards();
  }

}

// export default class NoteList extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       notes: [],
//       notebookName: []
//     };
//     this.getNotes = this.getNotes.bind(this);
//     this.getNotebookName = this.getNotebookName.bind(this);
//   }

//   getNotes() {
//     fetch('api/notes')
//       .then(response => response.json())
//       .then(notesData => {
//         this.setState({
//           notes: notesData
//         });
//       })
//       .catch(err => console.error('getNotes() fetch failed:', err));
//   }

//   getNotebookName() {
//     fetch('api/notebooks/1')
//       .then(response => response.json())
//       .then(notebookData => {
//         this.setState({
//           notebookName: notebookData[0].notebookName
//         });
//       })
//       .catch(err => console.error('getNotebookName() fetch failed:', err));
//   }

//   componentDidMount() {
//     this.getNotes();
//     this.getNotebookName();
//   }

//   render() {
//     return (
//       <div className="note-list-container d-flex justify-content-center">
//         <div className="d-flex flex-wrap card-deck note-list-container-border">
//           <h1 className="col-12 text-center notebook-name mb-5 mt-2">{this.state.notebookName}</h1>
//           {this.state.notes.map(noteListItem => {
//             return (
//               <NoteListItem
//                 key={noteListItem.noteId}
//                 note={noteListItem} />
//             );
//           })}
//         </div>
//       </div>
//     );
//   }
// }

// function NoteListItem(props) {
//   const noteListItem = props.note;
//   const noteId = noteListItem.noteId;
//   return (
//     <div className="my-y pb-3 col-4 note-list-item" id={noteId}>
//       <div className="card h-100">
//         <div className="card-body m-0 p-0 note-list-item-body rounded-0 h-100">
//           <Link to={{
//             pathname: '/notes/' + noteId
//           }}>
//             <p className="card-title text-left note-list-item-title">{noteListItem.noteTitle}</p>
//             <p className="card-text text-left note-list-item-content h-100 mb-3">{noteListItem.noteContent}</p>
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// }
