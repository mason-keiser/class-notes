import React from 'react';
import NoteList from './note-list';
import NotebookHeader from './notebook-header';

export default class Notebooks extends React.Component {
  render() {
    return (
      <div>
        <NotebookHeader />
        <NoteList />
      </div>
    );
  }
}
