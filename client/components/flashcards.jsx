import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';
import FlashcardsHeader from './flashcards-header';
export default class Flashcards extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      flashcards: [],
      notebook: null,
      showCards: false
    };
    this.getFlashcards = this.getFlashcards.bind(this);
    this.getNotebooks = this.getNotebooks.bind(this);
    this.showFlashcard = this.showFlashcard.bind(this);
  }

  componentDidMount() {
    this.getNotebooks();
  }

  getNotebooks() {
    fetch('/api/students/1')
      .then(res => res.json())
      .then(data => {
        this.setState({ notebook: data });
        this.getFlashcards(data.notebooks[0].notebookId);
      })
      .catch(err => console.error(err));
  }

  getFlashcards(deckId) {
    fetch(`/api/flashcards/deck/${deckId}`)
      .then(res => res.json())
      .then(data => {
        this.setState({
          flashcards: data
        });
      })
      .catch(err => console.error('getFlashcards() fetch failed:', err));
  }

  showFlashcard() {
    this.setState({ showCards: !this.state.showCards });
  }

  render() {
    const notebookInfo = this.state.notebook;
    let showFlashcards;
    if (this.state.showCards === true) {
      showFlashcards = (
        <div className="show-flashcard col-7">
          <div className='show-flashcard-title'>
            <h4 className="mb-0">View all available flashcards</h4>
            <Button className="solid-button ml-5" onClick={this.showFlashcard}>Close</Button>
          </div>
          <div className="show-flashcard-content">
            {this.state.flashcards.map(fcItem => {
              return (
                <div key={fcItem.fcId} className='mb-4 d-flex flex-row justify-content-around'>
                  <div className='fc-card'>
                    <h4>{fcItem.fcQuestion}</h4>
                  </div>
                  <div className='fc-card'>
                    <h4>{fcItem.fcAnswer}</h4>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      );
    }

    if (notebookInfo === null || this.state.flashcards.length === 0) {
      return (
        <>
          <FlashcardsHeader studentName="" />
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
        <FlashcardsHeader studentName={notebookInfo.firstName} />
        <main className="page-container-footer d-flex justify-content-between">
          <div className="col-4">
            {notebookInfo.notebooks.map(item => {
              return (
                <div key={item.notebookId}
                  className="d-flex flex-row flashcard-general-info mb-5">
                  <div className="d-flex flex-column justify-content-between">
                    <div className="d-flex flex-row align-items-center">
                      <h2>{item.notebookName}</h2>
                      <h4 className="ml-5">{this.state.flashcards.length + ' card(s)'}</h4>
                    </div>
                    <div className="flashcard-button-container d-flex">
                      <Link to={{ pathname: `/flashcards-review/${item.notebookId}` }}>
                        <Button className="solid-button mt-4 mr-4">Study</Button>
                      </Link>
                      <Button className="solid-button mt-4" onClick={this.showFlashcard}>View All</Button>
                    </div>
                  </div>
                  {/* <div onClick={this.showFlashcard}>
                    <i className="fas fa-chevron-right pointer"></i>
                  </div> */}
                </div>
              );
            })}
          </div>
          {showFlashcards}
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
