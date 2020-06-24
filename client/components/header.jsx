import React from 'react';
import { Button } from 'reactstrap';
import { Link } from 'react-router-dom';

export default function Header(props) {
  return (
    <header className="header-container background">
      <Link to="/">
        <h3>Back to Main Page</h3>
      </Link>
      <Button className="green" outline color="success">New Note</Button>
      <p className="green">Search</p>
      <h3 className="green" id="student-name">Sherlock</h3>
    </header>
  );
}
