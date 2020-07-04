import React from 'react';
import NoteList from './note-list';
import NotebookHeader from './notebook-header';

export default class Notebooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = { student: null };
  }

  componentDidMount() {
    fetch('/api/students/1')
      .then(response => response.json())
      .then(data => {
        this.setState({ student: data });
      })
      .catch(err => console.error('getStudentData() fetch failed:', err));
  }

  render() {
    const studentName = this.state.student === null ? 'Student Name' : this.state.student.firstName;
    const notebooks = this.state.student === null ? 'none' : this.state.student.notebooks;
    return (
      <div>
        <NotebookHeader studentName={studentName}/>
        <NoteList notebooks={notebooks} notebookId={this.props.match.params.notebookId}/>
      </div>
    );
  }
}
