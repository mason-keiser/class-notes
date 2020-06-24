import React from 'react';

export default function Header(props) {
  return (
    <header className="header-container background col-12">
      <p>Back to Homepage</p>
      <button className="new-note-button green grey font-weight-bold"><p>New Note</p></button>
      <p>Search Bar</p>
    </header>
  );
}
