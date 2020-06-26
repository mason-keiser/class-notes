import React from 'react';
import { Button } from 'reactstrap';
import { Link } from 'react-router-dom';

function NextButton(props) {
  return (
    <Button>
      <Link to="#" className="d-flex flex-row align-items-center flashcards-review-next-button"
        onClick={() => {
          props.goToNextFlashcard();
          props.setSideToQuestion();
        }}>
        Next
      </Link>
    </Button>
  );
}

function BackButton(props) {
  return (
    <Button>
      <Link to="#" className="d-flex flex-row align-items-center flashcards-review-next-button"
        onClick={() => {
          props.goToPrevFlashcard();
          props.setSideToQuestion();
        }}>
        Back
      </Link>
    </Button>
  );
}

function Indicator(props) {
  return (
    <div className={
      props.index <= props.activeIndex
        ? 'flashcards-review-indicator-focused'
        : 'flashcards-review-indicator-unfocused'
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
    onClick={props.setSide}
    key={props.index}>
      {props.side === 'question'
        ? <h1 className="flashcards-review-question">{props.flashcard.fcQuestion}</h1>
        : <h1 className="flashcards-review-answer">{props.flashcard.fcAnswer}</h1>
      }
    </div>
  );
}

export default class FlashcardsReview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      flashcards: [],
      side: 'question',
      activeIndex: 0
    };
    this.getFlashcards = this.getFlashcards.bind(this);
    this.goToPrevFlashcard = this.goToPrevFlashcard.bind(this);
    this.goToNextFlashcard = this.goToNextFlashcard.bind(this);
    this.shuffleFlashcardArray = this.shuffleFlashcardArray.bind(this);
    this.setSide = this.setSide.bind(this);
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
      this.shuffleFlashcardArray();
      index = 0;
    } else {
      index++;
    }
    this.setState({
      activeIndex: index
    });
  }

  goToPrevFlashcard() {
    let index = this.state.activeIndex;
    const length = this.state.flashcards.length;
    if (index < 1) {
      this.shuffleFlashcardArray();
      index = length - 1;
    } else {
      index--;
    }
    this.setState({
      activeIndex: index
    });
  }

  shuffleFlashcardArray() {
    const shuffledArray = this.state.flashcards;
    for (let index = shuffledArray.length - 1; index > 0; index--) {
      const tempIndex = Math.floor(Math.random() * (index + 1));
      [shuffledArray[index], shuffledArray[tempIndex]] = [shuffledArray[tempIndex], shuffledArray[index]];
    }
    this.setState({
      flashcards: shuffledArray
    });
  }

  setSide() {
    const side = this.state.side;
    if (side === 'question') {
      this.setState({
        side: 'answer'
      });
    }
    if (side === 'answer') {
      this.setState({
        side: 'question'
      });
    }
  }

  setSideToQuestion() {
    this.setState({
      side: 'question'
    });
  }

  componentDidMount() {
    this.getFlashcards();
    this.shuffleFlashcardArray();
  }

  render() {
    if (this.state.flashcards === null) {
      return null;
    }
    return (
      <div className="flashcard-review-container col-12">
        <div className="flashcard-container col-10 offset-1 d-flex align-items-center justify-content-center">
          {this.state.flashcards.map((flashcard, index) =>
            <Flashcard
              key={index}
              index={index}
              activeIndex={this.state.activeIndex}
              flashcard={flashcard}
              side={this.state.side}
              setSide={() => this.setSide()} />
          )}
          {this.state.flashcards.map((flashcard, index) =>
            <Indicator
              key={index}
              index={index}
              activeIndex={this.state.activeIndex}
              flashcard={flashcard} />
          )}
          <BackButton
            goToPrevFlashcard={() => this.goToPrevFlashcard()}
            setSideToQuestion={() => this.setSideToQuestion()} />
          <NextButton
            goToNextFlashcard={() => this.goToNextFlashcard()}
            setSideToQuestion={() => this.setSideToQuestion()} />
        </div>
      </div>
    );
  }
}
