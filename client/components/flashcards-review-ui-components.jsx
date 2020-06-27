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
  const side = props.side;
  const index = props.activeIndex;
  const length = props.flashcards.length;
  let fillerStyles;
  const containerStyles = {
    height: 10,
    width: '100%',
    backgroundColor: '#3F3F3C'
  };
  if (side === 'answer' && index === length - 1) {
    fillerStyles = {
      height: '100%',
      width: '100%',
      backgroundColor: '#24997F',
      textAlign: 'right'
    };
  } else {
    fillerStyles = {
      height: '100%',
      width: `${percentageIndicator}%`,
      backgroundColor: '#24997F',
      textAlign: 'right'
    };
  }
  return (
    <div style={containerStyles}>
      <div style={fillerStyles}>
      </div>
    </div>
  );
}

// keep below code in case it needs to be reused.  remove before production
// function Indicator(props) {
//   return (
//     <div className={
//       props.index <= props.activeIndex
//         ? 'flashcards-review-indicator-focused'
//         : 'flashcards-review-indicator-unfocused'
//     }
//     key={props.index}>
//       <i className="fa fa-circle mx-1"></i>
//     </div>
//   );
// }

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

export { NextButton, BackButton, Flashcard, ProgressBar };
