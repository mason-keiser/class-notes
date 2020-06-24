import React from 'react';
import Header from './header';
import NoteComponent from './note-component';
// import { Link } from 'react-router-dom';

class Note extends React.Component {
  constructor(props) {
    super(props);
    this.state = { note: null };
  }

  componentDidMount() {
    fetch(`/api/notes/${this.props.noteId}`)
      .then(res => res.json())
      .then(data => this.setState({ note: data }))
      .catch(error => console.error(error));
  }

  render() {
    const note = this.state.note;
    return (
      <div className="note-page-container">
        <Header />
        <main className="note-main">
          <div className="note-left-component">
            <h3>Difficulty</h3>
          </div>
          <NoteComponent />
        </main>
      </div>
    );
  }
}

export default Note;
