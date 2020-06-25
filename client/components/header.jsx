import React from 'react';
import { Button } from 'reactstrap';
import { Link } from 'react-router-dom';

export default function Header(props) {
  return (
    <header className="header-container">
      <div className="header-left-container">
        <Link to="/">
          <i className="fa fa-bars theme-green fa-2x header-hamburger-icon"></i>
        </Link>
      </div>
      <div className="header-center-container">
        <Button outline color="success" className="header-outline-button">New Note</Button>
      </div>
      <div className="header-right-container">
        <div className="header-search-block">
          <h5>Search</h5>
          <div className="header-search-deco"></div>
        </div>
        <p className="theme-green header-student-name">Sherlock</p>
      </div>
    </header>
  );
}
