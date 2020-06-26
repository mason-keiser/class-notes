import React from 'react';
import FcList from './flashcard-list';
import NotebookHeader from './notebook-header';

export default class Flashcards extends React.Component {
  render() {
    return (
      <div>
        <NotebookHeader/>
        <FcList />
      </div>
    );
  }
}