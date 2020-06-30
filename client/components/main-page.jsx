import React from 'react';
import { Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import SearchBar from './search-bar';

export default class MainPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { searchOpened: false };
    this.searchClicked = this.searchClicked.bind(this);
    this.closeXClicked = this.closeXClicked.bind(this);
  }

  searchClicked() {
    this.setState({ searchOpened: true });
  }

  closeXClicked() {
    this.setState({ searchOpened: false });
  }

  render() {
    return (
      <>
        <SearchBar searchClicked={this.searchClicked} closeXClicked={this.closeXClicked} isOpened={this.state.searchOpened} />
        <main className="main-page-container">
          <div className="search-block" onClick={this.searchClicked}>
            <h5>Search</h5>
            <div className="search-deco"></div>
          </div>
          <div className="title-block">
            <Link to="/notebook" className="notebooks-link">
              <h3>Notebook</h3>
            </Link>
            <Link to="/notes/create">
              <Button outline color="success" className="outline-button">New Note</Button>
            </Link>
            <h1 className="title">CODE NOTES</h1>
          </div>
          <div className="main-page-left">
            <Link to="/flashcards" className="link">
              <h5>Flashcards</h5>
            </Link>
            <h5>Login</h5>
          </div>
          <div className="main-page-right">
            <h5>MOOD</h5>
          </div>
        </main>
        <footer className="main-page-footer">
          <div className="col-2">
            <h6> &copy;All rights reserved</h6>
          </div>
          <div className="col"></div>
        </footer>
      </>
    );
  }
}
