import React from 'react';
import { Button } from 'reactstrap';
import { Link } from 'react-router-dom';

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

function Indicator(props) {
  return (
    <div className={
      props.index <= props.activeIndex
        ? 'flashcard-review-indicator-focused'
        : 'flashcard-review-indicator-unfocused'
    }
    key={props.index}>
      <i className="fa fa-circle mx-1"></i>
    </div>
  );
}

function Flashcard(props) {
  return (
    <div className={
      props.index === props.activeIndex
        ? 'd-flex justify-content-center col-12'
        : 'd-none'
    }
    key={props.index}>
      <h1 className="flashcard-question">{props.flashcard.fcQuestion}</h1>
      <h1 className="flashcard-answer">{props.flashcard.fcAnswer}</h1>
    </div>
  );
}

function Modal(props) {
  let decrementor = 1;
  if (props.activeIndex === props.length - 1) {
    decrementor--;
    if (decrementor === 0) {
      return (
        <div className="flashcards-review-modal">
          <h1>You finished reviewing this deck!  Would you like to start again?</h1>
          <Button>
            <Link to="#" className="d-flex flex-row align-items-center flashcard-next-button"
              onClick={props.goToNextFlashcard}>
              Yes, start again
            </Link>
          </Button>
          <Button>
            <Link to="/flashcards" className="d-flex flex-row align-items-center flashcard-out-button">
              No, take me back to view all decks.
            </Link>
          </Button>
        </div>
      );
    }
  }
  return null;
}

export default class FlashcardsReview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      flashcards: [],
      activeIndex: 0
    };
    this.getFlashcards = this.getFlashcards.bind(this);
  }

  // when possible, pass fcDeckId via props to the fetch endpoint
  getFlashcards() {
    fetch('api/flashcards')
      .then(response => response.json())
      .then(flashcardsData => {
        this.setState(state => ({
          flashcards: flashcardsData
        }));
      })
      .catch(err => console.error('getFlashcards() fetch failed:', err));
  }

  goToNextFlashcard() {
    let index = this.state.activeIndex;
    const length = this.state.flashcards.length;
    if (index === length - 1) {
      index = 0;
    } else {
      index++;
    }
    this.setState({
      activeIndex: index
    });
  }

  componentDidMount() {
    this.getFlashcards();
  }

  render() {
    if (this.state.flashcards === null) {
      return null;
    }
    const length = this.state.flashcards.length;
    return (
      <div className="flashcard-review-container col-12">
        <div className="flashcard-container col-10 offset-1 d-flex align-items-center justify-content-center">
          <Modal
            length={length}
            activeIndex={this.state.activeIndex}
            goToNextFlashcard={() => this.goToNextFlashcard()}
          />
          {/* can i combine the two maps below into one? */}
          {this.state.flashcards.map((flashcard, index) =>
            <Flashcard
              key={index}
              index={index}
              activeIndex={this.state.activeIndex}
              flashcard={flashcard} />
          )}
          {this.state.flashcards.map((flashcard, index) =>
            <Indicator
              key={index}
              index={index}
              activeIndex={this.state.activeIndex}
              flashcard={flashcard} />
          // onClick={event => this.showAnswer()} />
          // in above line, when flashcard is clicked, if question is showing, show answer.  if answer is showing, show next card
          )}
          <NextButton
            goToNextFlashcard={() => this.goToNextFlashcard()} />
        </div>
      </div>
    );
  }
}
