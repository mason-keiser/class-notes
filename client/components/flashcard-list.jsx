import React from 'react'
import { Link } from 'react-router-dom'

function FcListItem(props) {
    const fcListItem = props.flashcard;
    const fcId = fcListItem.fcId;
    return (
      <div className="my-y pb-3 col-4 fc-list-item" id={fcId}>
        <div className="card h-100">
          <div className="card-body m-0 p-0 fc-list-item-body rounded-0 h-100">
            <Link to={{
              pathname: '/flashcards/' + fcId
            }}>
              <p className="card-title text-left fc-list-item-title">{fcListItem.fcTitle}</p>
              <p className="card-text text-left fc-list-item-content h-75 mb-3">{fcListItem.fcQuestion}</p>
              <p className="card-text text-left fc-list-item-content h-75 mb-3">{fcListItem.fcAnswer}</p>
            </Link>
          </div>
        </div>
      </div>
    );
}

export default class FcList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fc: [],
            fcDeck: []
        }
    }
}