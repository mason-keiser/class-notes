import React from 'react';
import { Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import SearchBar from './search-bar';

export default class FlashcardsHeader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchOpened: false
    }
    this.searchClicked = this.searchClicked.bind(this)
    this.closeXClicked = this.closeXClicked.bind(this)
  }

  searchClicked() {
    this.setState({
      searchOpened: true
    })
  }

  closeXClicked() {
    this.setState({
      searchOpened: false
    })
  }


  render() {
    return (
      <div>
        <SearchBar searchClicked={this.searchClicked} closeXClicked={this.closeXClicked} isOpened={this.state.searchOpened}/>
        <header className="header-container d-flex justify-content-between">
          <div className="col-4">
            <Link to="/">
              <img src="/images/code-note-icon.png" alt="Code Note Icon" />
              {/* <i className="fa fa-bars theme-green fa-2x header-hamburger-icon"></i> */}
            </Link>
          </div>
          <div className="d-flex flex-row justify-content-center col-4">
            <Link to="/notebooks-list">
              <Button outline color="success" className="header-outline-button">Notebook</Button>
            </Link>
          </div>
          <div className="d-flex flex-row align-items-center justify-content-end col-4">
            <div className="search-block mr-5" onClick={this.searchClicked}>
              <h5>Search</h5>
              <div className="search-deco"></div>
            </div>
            <p className="theme-green header-student-name">{this.props.studentName}</p>
          </div>
        </header>
      </div>
    );
  }
}
