import React from 'react';
import NoteList from './note-list';
import Header from './header';

export default class Notebook extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <NoteList />
      </div>
    );
  }
}
