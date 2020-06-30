import React from 'react';
import { FormGroup, Label, Input } from 'reactstrap';
import SearchItem from './search-list-item';

export default class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchValue: '',
      tagValue: '',
      difficultyValue: '',
      notes: []
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleX = this.handleX.bind(this);
    this.handleChangeField = this.handleChangeField.bind(this);
  }

  handleChange(event) {
    if (event.target.id === 'searchNotes') {
      this.setState({ searchValue: event.target.value });
      // fetch(`/api/notes/search/${event.target.value}`)
      //   .then(res => res.json())
      //   .then(data => this.setState({ notes: data }))
      //   .catch(error => console.error(error));
    }
    if (event.target.id === 'searchTags') {
      this.setState({ tagValue: event.target.value });
    }
    if (event.target.id === 'searchDifficulty') {
      this.setState({ difficultyValue: event.target.value });
    }
  }

  handleX() {
    this.setState({
      searchValue: '',
      tagValue: '',
      difficultyValue: '',
      notes: []
    });
    this.props.closeXClicked();
  }

  handleChangeField() {
    this.setState({
      searchValue: '',
      tagValue: '',
      difficultyValue: '',
      notes: []
    });
  }

  handleKeyPress(event) {
    if (event.key === 'Enter') {
      if (event.target.id === 'searchNotes') {
        fetch(`/api/notes/search/${this.state.searchValue}`)
          .then(res => res.json())
          .then(data => {
            this.setState({ notes: data });
          })
          .catch(error => {
            this.setState({ notes: [{ noteTitle: 'no results found' }] });
            console.error(error);
          });
      }
      if (event.target.id === 'searchTags') {
        console.log('need endpoint for searching Tags');
      }
      if (event.target.id === 'searchDifficulty') {
        fetch(`/api/notes/search/difficulty/${this.state.difficultyValue}`)
          .then(res => res.json())
          .then(data => {
            this.setState({ notes: data });
          })
          .catch(error => {
            this.setState({ notes: [{ noteTitle: 'No results found.' }] });
            console.error(error);
          });
      }
    }
  }

  render() {
    if (!this.state.notes[0]) {
      const searchBarClass = this.props.isOpened ? 'search-container search-container-end'
        : 'search-container search-container-start';
      return (
        <div className={searchBarClass}>
          <div className='search-top'>
            <div className='search-form'>
              <h3 className="search-text">Search </h3>
              <FormGroup className="mb-4">
                <Label for="searchNotes" className="note-font-1"></Label>
                <Input type="text" name="searchNotes" className="search-input"
                  id="searchNotes" placeholder="Keyword"
                  value={this.state.searchValue} onChange={this.handleChange}
                  onKeyPress={this.handleKeyPress} onClick={this.handleChangeField}/>
              </FormGroup>
              <FormGroup className="mb-4">
                <Label for="searchTags" className="note-font-1"></Label>
                <Input type="text" name="searchTags" className="search-input"
                  id="searchTags" placeholder="Tags"
                  value={this.state.tagValue} onChange={this.handleChange} onClick={this.handleChangeField}/>
              </FormGroup>
              <FormGroup className="mb-4">
                <Label for="searchTags" className="note-font-1"></Label>
                <Input type="text" name="searchTags" className="search-input"
                  id="searchDifficulty" placeholder="Difficulty"
                  value={this.state.difficultyValue} onChange={this.handleChange}
                  onKeyPress={this.handleKeyPress} onClick={this.handleChangeField}/>
              </FormGroup>
            </div>
            <i className="fas fa-times fa-2x" onClick={this.handleX}></i>
          </div>
        </div>
      );
    } else {
      const searchBarClass = this.props.isOpened ? 'search-container search-container-end'
        : 'search-container search-container-start';
      return (
        <div className={searchBarClass}>
          <div className='search-top'>
            <div className='search-form'>
              <h3 className="search-text">Search </h3>
              <FormGroup className="mb-4">
                <Label for="searchNotes" className="note-font-1"></Label>
                <Input type="text" name="searchNotes" className="search-input"
                  id="searchNotes" value={this.state.searchValue} onChange={this.handleChange}
                  onKeyPress={this.handleKeyPress} onClick={this.handleChangeField}/>
              </FormGroup>
              <FormGroup className="mb-4">
                <Label for="searchTags" className="note-font-1"></Label>
                <Input type="text" name="searchTags" className="search-input"
                  id="searchTags" value={this.state.tagValue} onChange={this.handleChange}
                  onClick={this.handleChangeField}/>
              </FormGroup>
              <FormGroup className="mb-4">
                <Label for="searchTags" className="note-font-1"></Label>
                <Input type="text" name="searchTags" className="search-input"
                  id="searchDifficulty" value={this.state.difficultyValue} onChange={this.handleChange}
                  onKeyPress={this.handleKeyPress} onClick={this.handleChangeField}/>
              </FormGroup>
            </div>
            <i className="fas fa-times fa-2x" onClick={this.handleX}></i>
          </div>
          <div>
            {this.state.notes.map(note => <SearchItem key={note.noteId} noteId={note.noteId} noteTitle = {note.noteTitle} noteContent={note.noteContent}/>)}
          </div>
        </div>
      );

    }
  }
}
