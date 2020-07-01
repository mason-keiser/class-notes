import React from 'react';
import { Link } from 'react-router-dom';

function NextArrow(props) {
  return (
    <Link to="#" className="d-flex flex-row align-items-center flashcards-review-next-arrow ml-5"
      style={{ textDecoration: 'none' }}
      onClick={() => {
        props.goToNextFlashcard();
        props.setSideToQuestion();
      }}>
      <i className="fa fa-angle-right fa-3x text-secondary" aria-hidden="true"></i>
      {/* <Button>
        Next
      </Button> */}
    </Link>
  );
}

function BackArrow(props) {
  return (
    <Link to="#" className="d-flex flex-row align-items-center flashcards-review-back-arrow mr-5"
      style={{ textDecoration: 'none' }}
      onClick={() => {
        props.goToPrevFlashcard();
        props.setSideToQuestion();
      }}>
      <i className="fa fa-angle-left fa-3x text-secondary" aria-hidden="true"></i>
      {/* <Button>
        Back
      </Button> */}
    </Link>
  );
}

function ProgressBar(props) {
  const percentageIndicator = props.progressBarPercentageIndicator;
  const containerStyling = {
    height: 10,
    width: '100%',
    backgroundColor: '#3F3F3D'
  };
  const fillerStyling = {
    height: '100%',
    width: `${percentageIndicator}%`,
    backgroundColor: '#24997F',
    textAlign: 'right'
  };
  return (
    <div className="progress-bar-container" style={containerStyling}>
      <div style={fillerStyling}>
      </div>
    </div>
  );
}

function Flashcard(props) {
  return (
    <div className={
      props.index === props.activeIndex
        ? 'flashcards-review-flashcard d-flex justify-content-center align-items-center col-12'
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

export { NextArrow, BackArrow, Flashcard, ProgressBar };
