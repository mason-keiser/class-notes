import React from 'react';
import { Button, FormGroup, Label, Input } from 'reactstrap';
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
    this.handleSearchButton = this.handleSearchButton.bind(this);
    this.handleX = this.handleX.bind(this);
    this.handleChangeField = this.handleChangeField.bind(this);
    this.handleSearchDifficulty = this.handleSearchDifficulty.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  handleChange(event) {
    if (event.target.id === 'searchNotes') {
      this.setState({ searchValue: event.target.value });
    }
    if (event.target.id === 'searchTags') {
      this.setState({ tagValue: event.target.value });
    }
  }

  handleSearchDifficulty(number) {
    this.setState({ searchValue: '', tagValue: '' });
    fetch(`/api/notes/search/difficulty/${number}`)
      .then(res => res.json())
      .then(data => {
        if (data.message) {
          return this.setState({
            message: data.message,
            notes: []
          });
        }
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

  handleSearchButton(event) {
    event.preventDefault();
    if (this.state.searchValue) {
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
        .catch(error => { console.error(error); });
    }
    if (this.state.tagValue) {
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
        .catch(error => { console.error(error); });
    }
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
    }
  }

  render() {
    const searchBarClass = this.props.isOpened ? 'search-container-end' : 'search-container-start';
    const searchResultClass = this.props.isOpened ? 'search-results-start' : 'search-results-end';
    if (!this.state.notes[0]) {
      return (
        <div className={searchBarClass}>
          <div className='search-top'>
            <div className='search-form d-flex align-items-center'>
              <h3 className="search-text">Search Notes</h3>
              <FormGroup className="mb-4 ml-4">
                <Label for="searchNotes" className="note-font-1"></Label>
                <Input type="text" name="searchNotes" className="search-input font-18"
                  id="searchNotes" placeholder="Keyword" onKeyPress={this.handleKeyPress}
                  value={this.state.searchValue} onChange={this.handleChange} onClick={this.handleChangeField} />
              </FormGroup>
              <FormGroup className="mb-4 ml-4">
                <Label for="searchTags" className="note-font-1"></Label>
                <Input type="text" name="searchTags" className="search-input font-18"
                  id="searchTags" placeholder="Tags" onKeyPress={this.handleKeyPress}
                  value={this.state.tagValue} onChange={this.handleChange} onClick={this.handleChangeField} />
              </FormGroup>
              <Button className="search-bar-button ml-5 mr-5" onClick={this.handleSearchButton}>Search</Button>
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
          <div className={searchResultClass}>
            <h5 className="no-results-message">{this.state.message}</h5>
          </div>
        </div>
      );
    } else {
      return (
        <div className={searchBarClass}>
          <div className='search-top'>
            <div className='search-form'>
              <h3 className="search-text">Search Notes</h3>
              <FormGroup className="mb-4 ml-4">
                <Label for="searchNotes" className="note-font-1"></Label>
                <Input type="text" name="searchNotes" className="search-input font-18"
                  id="searchNotes" value={this.state.searchValue} onChange={this.handleChange}
                  onClick={this.handleChangeField} />
              </FormGroup>
              <FormGroup className="mb-4 ml-4">
                <Label for="searchTags" className="note-font-1"></Label>
                <Input type="text" name="searchTags" className="search-input font-18"
                  id="searchTags" value={this.state.tagValue} onChange={this.handleChange}
                  onClick={this.handleChangeField} />
              </FormGroup>
              <Button className="search-bar-button ml-5 mr-5" onClick={this.handleSearchButton}>Search</Button>
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
          <div className={searchResultClass}>
            {this.state.notes.map(note => <SearchItem key={note.noteId} noteId={note.noteId} noteTitle={note.noteTitle} noteContent={note.noteContent} />)}
          </div>
        </div>
      );

    }
  }
}
