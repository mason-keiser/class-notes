import React from 'react';
import { Button } from 'reactstrap';
import { Link } from 'react-router-dom';

function NextButton(props) {
  return (
    <Link to="#" className="d-flex flex-row align-items-center flashcards-review-next-button"
      onClick={() => {
        props.goToNextFlashcard();
        props.setSideToQuestion();
      }}>
      <Button>
        Next
      </Button>
    </Link>
  );
}

function BackButton(props) {
  return (
    <Link to="#" className="d-flex flex-row align-items-center flashcards-review-next-button"
      onClick={() => {
        props.goToPrevFlashcard();
        props.setSideToQuestion();
      }}>
      <Button>
        Back
      </Button>
    </Link>
  );
}

function ProgressBar(props) {
  const percentageIndicator = props.progressBarPercentageIndicator;

  const containerStyles = {
    height: 10,
    width: '100%',
    backgroundColor: '#3F3F3C'
  };

  const fillerStyles = {
    height: '100%',
    width: `${percentageIndicator}%`,
    backgroundColor: '#24997F',
    textAlign: 'right'
  };

  return (
    <div style={containerStyles}>
      <div style={fillerStyles}>
      </div>
    </div>
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

export { NextButton, BackButton, Indicator, Flashcard, ProgressBar };
