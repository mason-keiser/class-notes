import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';

function FcListItem(props) {
  const fcListItem = props.flashcard;
  const fcDeckId = fcListItem.fcDeckId;
  return (
    <div className="">
      <Link to={{ pathname: '/flashcards-review/' + fcDeckId }}>
        <p className="card-text text-left fc-list-item-content q h-75">{fcListItem.fcQuestion}</p>
        <p className="card-text text-left fc-list-item-content h-75 mb-4">{fcListItem.fcAnswer}</p>
        <Button className="solid-button">Study</Button>
      </Link>
    </div>
  );
}

function fcDeckItems(props) {
  const fcItem = props.flashcard;
  return (
    <div className='d-flex flex-row justify-content-center pt-5'>
      <div className='fc-q-a mr-5 d-flex pt-4'>{fcItem.fcQuestion}</div>
      <div className='fc-q-a d-flex pt-4'>{fcItem.fcAnswer}</div>
    </div>
  );
}

export default class FcList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      flashcards: [],
      notebookName: ''
    };
    this.getFlashcards = this.getFlashcards.bind(this);
    this.getNotebookName = this.getNotebookName.bind(this);
  }

  componentDidMount() {
    this.getFlashcards();
    this.getNotebookName();
  }

  getFlashcards() {
    fetch('/api/flashcards')
      .then(res => res.json())
      .then(data => {
        this.setState({
          flashcards: data
        });
      })
      .catch(err => console.error('getFlashcards() fetch failed:', err));
  }

  getNotebookName() {
    fetch('api/flashcards/1')
      .then(response => response.json())
      .then(notebookData => {
        this.setState({
          notebookName: notebookData.notebookName
        });
      })
      .catch(err => console.error('getNotebookName() fetch failed:', err));
  }

  render() {
    return (
      <div className="d-flex flex-row main-fc-cont">
        <div className="fc-list-container">
          <div className="fc-list">
            <div className="fccard">
              <div className='cardTitle'>
                <h1 className="notebook-name">{this.state.notebookName}</h1>
                <h4 className='deckLength'>{this.state.flashcards.length + ' card(s)'}</h4>
              </div>
              {this.state.flashcards.map(fcListItem => {
                return (<FcListItem key={fcListItem.fcId} flashcard={fcListItem} />);
              }
              )}
            </div>
          </div>
        </div>
        <div className="flashcardDeck col" >
          <div className='fcLists mt-5'>
            <div className='pt-3 flashcard-som'>View all available flashcards</div>
            <div>
              {this.state.flashcards.map(fcItem => {
                return (
                  <fcDeckItems key={fcItem.fcId} flashcard={fcItem} />);
              })
              }
            </div>
          </div>
        </div>
      </div>
    );
  }
}
