import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';

function NextArrow(props) {
  return (
    <Link to="#" className="flashcards-review-next-arrow"
      style={{ textDecoration: 'none' }}
      onClick={() => {
        props.goToNextFlashcard();
        props.setSideToQuestion();
      }}>
      <i className="fa fa-angle-right fa-3x text-secondary" aria-hidden="true"></i>
    </Link>
  );
}

function BackArrow(props) {
  return (
    <Link to="#" className="flashcards-review-back-arrow"
      style={{ textDecoration: 'none' }}
      onClick={() => {
        props.goToPrevFlashcard();
        props.setSideToQuestion();
      }}>
      <i className="fa fa-angle-left fa-3x text-secondary" aria-hidden="true"></i>
    </Link>
  );
}

function ProgressBar(props) {
  const percentageIndicator = props.progressBarPercentageIndicator;
  const containerStyling = {
    height: 40,
    width: '100%',
    backgroundColor: '#3F3F3D'
  };
  const fillerStyling = {
    height: '100%',
    width: `${percentageIndicator}%`,
    backgroundColor: '#24997F',
    textAlign: 'right',
    transition: '.2s linear'
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

function NavToFlashcards() {
  return (
    <div className="nav-to-flashcards">
      <Link to={{ pathname: '/flashcards' }}>
        <Button className="solid-button mt-4 mr-4">Back</Button>
      </Link>
    </div>
  );
}

export { NextArrow, BackArrow, Flashcard, ProgressBar, NavToFlashcards };
