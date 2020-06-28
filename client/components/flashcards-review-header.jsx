import React from 'react';
import { Button } from 'reactstrap';
import { Link } from 'react-router-dom';

export default class FlashcardsReviewHeader extends React.Component {
  render() {
    return (
      <header className="header-container">
        <div className="header-left-container">
          <Link to="/">
            <i className="fa fa-bars theme-green fa-2x header-hamburger-icon"></i>
          </Link>
        </div>
        <div className="header-center-container">
          <Link to="/notes/create">
            <Button outline color="success" className="header-outline-button">New Note</Button>
          </Link>
        </div>
        <div className="header-right-container">
          <div className="header-search-block">
            <h5>Search</h5>
            <div className="header-search-deco"></div>
          </div>
          <p className="theme-green header-student-name">{this.props.studentName}</p>
        </div>
      </header>
    );
  }
}
