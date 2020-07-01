import React from 'react';
import { FormGroup, Label, Input } from 'reactstrap';
import SearchItem from './search-list-item';

export default class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchValue: '',
      tagValue: '',
      message: '',
      notes: []
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleX = this.handleX.bind(this);
    this.handleChangeField = this.handleChangeField.bind(this);
    this.handleSearchDifficulty = this.handleSearchDifficulty.bind(this);
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
    // if (event.target.id === 'searchDifficulty') {
    //   this.setState({ difficultyValue: event.target.value });
    // }
  }

  handleSearchDifficulty(number) {
    this.setState({ searchValue: '', tagValue: ''});
    fetch(`/api/notes/search/difficulty/${number}`)
      .then(res => res.json())
      .then(data => {
        this.setState({ notes: data });
      })
      .catch(error => {
        this.setState({ notes: [{ noteTitle: 'No results found.' }] });
        console.error(error);
      });
  }

  handleX() {
    this.setState({
      searchValue: '',
      tagValue: '',
      notes: [],
      message: ''
    });
    this.props.closeXClicked();
  }

  handleChangeField() {
    this.setState({
      searchValue: '',
      tagValue: '',
      notes: [],
      message: ''
    });
  }

  handleKeyPress(event) {
    if (event.key === 'Enter') {
      if (event.target.id === 'searchNotes') {
        fetch(`/api/notes/search/${this.state.searchValue}`)
          .then(res => res.json())
          .then(data => {
            if (data.message) {
              return this.setState({
                message: data.message,
                notes: []
              });
            }
            this.setState({
              notes: data,
              message: ''
            });
          })
          .catch(error => {

            console.error(error);
          });
      }
      if (event.target.id === 'searchTags') {
        fetch(`/api/notes/search-tags/${this.state.tagValue}`)
          .then(res => res.json())
          .then(data => {
            if (data.message) {
              return this.setState({
                message: data.message,
                notes: []
              });
            }
            this.setState({
              notes: data,
              message: ''
            });
          })
          .catch(error => {

            console.error(error);
          });

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
            <div className='search-form d-flex align-items-center'>
              <h3 className="search-text">Search </h3>
              <FormGroup className="mb-4 ml-4">
                <Label for="searchNotes" className="note-font-1"></Label>
                <Input type="text" name="searchNotes" className="search-input font-18"
                  id="searchNotes" placeholder="Keyword"
                  value={this.state.searchValue} onChange={this.handleChange}
                  onKeyPress={this.handleKeyPress} onClick={this.handleChangeField}/>
              </FormGroup>
              <FormGroup className="mb-4 ml-4">
                <Label for="searchTags" className="note-font-1"></Label>
                <Input type="text" name="searchTags" className="search-input font-18"
                  id="searchTags" placeholder="Tags"
                  value={this.state.tagValue} onKeyPress={this.handleKeyPress} onChange={this.handleChange} onClick={this.handleChangeField}/>
              </FormGroup>
              <div className="ml-4 d-flex">
                <div className="color-white mr-2 font-18">Difficulty:</div>
                <div id="searchDifficulty" className="difficulty diff-1"
                  onClick={() => this.handleSearchDifficulty(1)}></div>
                <div id="searchDifficulty" className="difficulty diff-2"
                  onClick={() => this.handleSearchDifficulty(2)}></div>
                <div id="searchDifficulty" className="difficulty diff-3"
                  onClick={() => this.handleSearchDifficulty(3)}></div>
                <div id="searchDifficulty" className="difficulty diff-4"
                  onClick={() => this.handleSearchDifficulty(4)}></div>
                <div id="searchDifficulty" className="difficulty diff-5"
                  onClick={() => this.handleSearchDifficulty(5)}></div>
              </div>
            </div>
            <i className="fas fa-times fa-2x" onClick={this.handleX}></i>
          </div>
          <div className='no-results-message'>
            <p>{this.state.message}</p>
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
              <FormGroup className="mb-4 ml-4">
                <Label for="searchNotes" className="note-font-1"></Label>
                <Input type="text" name="searchNotes" className="search-input font-18"
                  id="searchNotes" value={this.state.searchValue} onChange={this.handleChange}
                  onKeyPress={this.handleKeyPress} onClick={this.handleChangeField}/>
              </FormGroup>
              <FormGroup className="mb-4 ml-4">
                <Label for="searchTags" className="note-font-1"></Label>
                <Input type="text" name="searchTags" className="search-input font-18"
                  id="searchTags" value={this.state.tagValue} onChange={this.handleChange}
                  onClick={this.handleChangeField}/>
              </FormGroup>
              <div className="d-flex ml-4">
                <div className="color-white mr-2 font-18">Difficulty:</div>
                <div id="searchDifficulty" className="difficulty diff-1"
                  onClick={() => this.handleSearchDifficulty(1)}></div>
                <div id="searchDifficulty" className="difficulty diff-2"
                  onClick={() => this.handleSearchDifficulty(2)}></div>
                <div id="searchDifficulty" className="difficulty diff-3"
                  onClick={() => this.handleSearchDifficulty(3)}></div>
                <div id="searchDifficulty" className="difficulty diff-4"
                  onClick={() => this.handleSearchDifficulty(4)}></div>
                <div id="searchDifficulty" className="difficulty diff-5"
                  onClick={() => this.handleSearchDifficulty(5)}></div>
              </div>
            </div>
            <i className="fas fa-times fa-2x" onClick={this.handleX}></i>
          </div>
          <div className='search-results-list'>
            {this.state.notes.map(note => <SearchItem key={note.noteId} noteId={note.noteId} noteTitle = {note.noteTitle} noteContent={note.noteContent}/>)}
          </div>
        </div>
      );

    }
  }
}
