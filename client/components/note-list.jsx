import React from 'react';
// import NoteListItem from './note';

export default class NoteList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: []
    };
    this.getNotes = this.getNotes.bind(this);
  }

  getNotes() {
    fetch('api/notes')
      .then(response => response.json())
      .then(notesData => {
        this.setState({
          notes: notesData
        });
      })
      .catch(err => console.error('Fetch failed:', err));
  }
}
