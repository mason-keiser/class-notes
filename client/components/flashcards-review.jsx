import React from 'react';
import FlashcardsHeader from './flashcards-header';
import { NextArrow, BackArrow, Flashcard, ProgressBar } from './flashcards-review-ui-components';

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
    this.progressBarPercentageIndicator = this.progressBarPercentageIndicator.bind(this);
  }

  getFlashcards() {
    const fcDeckId = this.props.match.params.fcDeckId;
    fetch(`/api/flashcards/deck/${fcDeckId}`)
      .then(response => response.json())
      .then(flashcardsData => {
        this.setState(state => ({
          flashcards: flashcardsData
        }));
      })
      .catch(err => console.error('getFlashcards() fetch failed:', err));
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

  progressBarPercentageIndicator() {
    let index;
    const length = this.state.flashcards.length;
    if (this.state.side === 'question') {
      index = this.state.activeIndex;
    }
    if (this.state.side === 'answer') {
      index = this.state.activeIndex + 1;
    }
    return ((index / length) * 100);
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
      <>
        <FlashcardsHeader />
        <div className="flashcard-review-container col-12 d-flex align-items-center justify-content-center">
          <div className="flashcard-review-back-arrow-container col-1 d-flex justify-content-end">
            <BackArrow
              goToPrevFlashcard={() => this.goToPrevFlashcard()}
              setSideToQuestion={() => this.setSideToQuestion()} />
          </div>
          <div className="flashcard-container d-flex flex-row justify-content-center col-10">
            {this.state.flashcards.map((flashcard, index) =>
              <Flashcard
                key={index}
                index={index}
                activeIndex={this.state.activeIndex}
                flashcard={flashcard}
                side={this.state.side}
                setSide={() => this.setSide()} />
            )}
          </div>
          <div className="flashcard-review-next-arrow-container col-1">
            <NextArrow
              goToNextFlashcard={() => this.goToNextFlashcard()}
              setSideToQuestion={() => this.setSideToQuestion()} />
          </div>
        </div>
        <ProgressBar
          progressBarPercentageIndicator={this.progressBarPercentageIndicator()}
          flashcards={this.state.flashcards} />
      </>
    );
  }
}
