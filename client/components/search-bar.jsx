import React from 'react';
import { FormGroup, Label, Input } from 'reactstrap';
import SearchItem from './search-list-item';

export default class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

      searchValue: 'Keyword',
      tagValue: 'Tags',
      difficultyValue: 'Difficulty',
      notes: []
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);

  }

  handleChange(event) {
    if (event.target.id === 'searchNotes') {
      this.setState({ searchValue: event.target.value });
    }
    if (event.target.id === 'searchTags') {
      this.setState({ tagValue: event.target.value });
    }
    if (event.target.id === 'searchDifficulty') {
      this.setState({ difficultyValue: event.target.value });
    }

  }

  handleKeyPress(event) {
    if (event.key === 'Enter') {
      if (event.target.id === 'searchNotes') {
        fetch(`/api/notes/search/${this.state.searchValue}`)
          .then(res => res.json())
          .then(data => this.setState({ notes: data }))
          .catch(error => console.error(error));
      }
      if (event.target.id === 'searchTags') {
        console.log('yo');
      }
      if (event.target.id === 'searchDifficulty') {
        console.log('yo');
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
                  id="searchNotes" value={this.state.searchValue} onChange={this.handleChange}
                  onKeyPress={this.handleKeyPress} />
              </FormGroup>
              <FormGroup className="mb-4">
                <Label for="searchTags" className="note-font-1"></Label>
                <Input type="text" name="searchTags" className="search-input"
                  id="searchTags" value={this.state.tagValue} onChange={this.handleChange} />
              </FormGroup>
              <FormGroup className="mb-4">
                <Label for="searchTags" className="note-font-1"></Label>
                <Input type="text" name="searchTags" className="search-input"
                  id="searchDifficulty" value={this.state.difficultyValue} onChange={this.handleChange} />
              </FormGroup>
            </div>
            <i className="fas fa-times fa-2x" onClick={this.props.closeXClicked}></i>
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
                  onKeyPress={this.handleKeyPress} />
              </FormGroup>
              <FormGroup className="mb-4">
                <Label for="searchTags" className="note-font-1"></Label>
                <Input type="text" name="searchTags" className="search-input"
                  id="searchTags" value={this.state.tagValue} onChange={this.handleChange} />
              </FormGroup>
              <FormGroup className="mb-4">
                <Label for="searchTags" className="note-font-1"></Label>
                <Input type="text" name="searchTags" className="search-input"
                  id="searchDifficulty" value={this.state.difficultyValue} onChange={this.handleChange} />
              </FormGroup>
            </div>
            <i className="fas fa-times fa-2x" onClick={this.props.closeXClicked}></i>
          </div>
          <div>
            {this.state.notes.map(note => <SearchItem key={note.noteId} noteId={note.noteId} noteTitle = {note.noteTitle} noteContent={note.noteContent}/>)}
          </div>
        </div>

      );

    }
  }
}
