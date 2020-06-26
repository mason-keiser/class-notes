import React from 'react'
import { Link } from 'react-router-dom'

function FcListItem(props) {
    const fcListItem = <props className="fcItem"></props>;
    const fcId = fcListItem.fcId;
    return (
      <div className="my-y pb-3 col-4 fc-list-item" id={fcId}>
        <div className="card h-100">
          <div className="card-body m-0 p-0 fc-list-item-body rounded-0 h-50">
            <Link to={{ pathname: '/flashcards/' + fcId }}>
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
            flashcards: [],
            notebookName: []
        };
        this.getFlashcards =this.getFlashcards.bind(this);
        this.getNotebookName = this.getNotebookName.bind(this);
    }

    componentDidMount() {
        this.getFlashcards();
        this.getNotebookName();
    }

    getFlashcards() {
        fetch('api/flashcards')
            .then(res => res.json())
            .then(data => {
                this.setState({
                    flashcards: data
                });
            })
            .catch(err => console.error('getFlashcards() fetch failed:', err));
    }

    
    getNotebookName() {
        fetch('api/notebooks/1')
            .then(response => response.json())
            .then(notebookData => {
                this.setState({
                    notebookName: notebookData[0].notebookName
                });
            })
            .catch(err => console.error('getNotebookName() fetch failed:', err));
    }

    render() {
        return (
          <div>
          <header className="fc-header">
            <Link to="/" className="d-flex flex-row align-items-center">
              <i className="fa fa-bars theme-green fa-2x header-hamburger-icon"></i>
            </Link>
          </header>
          <div className="note-list-container d-flex justify-content-centers">
            <div className="d-flex flex-wrap card-deck note-list-container-border">
              <h1 className=" text-center notebook-name mb-5 mt-2">{this.state.notebookName}</h1>
              {this.state.flashcards.map(fcListItem => {
                return (
                  <FcListItem
                    key={fcListItem.fcId}
                    flashcard={fcListItem} />
                );
              })}
            </div>
          </div>
          </div>
        );
      }
}