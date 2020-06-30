import React from 'react';
import { Link } from 'react-router-dom';

class SearchItem extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Link to={{ pathname: '/notes/' + this.props.noteId }}>
        <div className="search-item">
          <h5>{this.props.noteTitle}</h5>
          <p>{this.props.noteContent}</p>
        </div>
      </Link>
    );
  }

}

export default SearchItem;
