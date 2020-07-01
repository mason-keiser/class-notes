import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Form, FormGroup, Input } from 'reactstrap';

function FcListItem(props) {
  const fcListItem = props.flashcard;
  // const fcId = fcListItem.fcId;
  const fcDeckId = fcListItem.fcDeckId;
  return (
    <div className="">
      <Link to={{ pathname: '/flashcards-review/' + fcDeckId }}>
        <p className="card-text text-left fc-list-item-content q h-75">{fcListItem.fcQuestion}</p>
        <p className="card-text text-left fc-list-item-content h-75 mb-4">{fcListItem.fcAnswer}</p>
        <button color="success" className="fc-list-item-content study-button">Study</button>
      </Link>
    </div>
  );
}

function FcDeckItems(props) {
  const fcItem = props.flashcard
  const fcId = fcItem.fcDeckId
  return (
    <div>
      <div>{fcItem.fcQuestion}</div>
      <div>{fcItem.fcAnswer}</div>
    </div>
  )
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
      <div className="d-flex flex-row mainFcCont" style={{ 
        backgroundColor: '#333333',
        display: 'flex',
        flex: 'row',
        justifyContent: 'space-evenly'
        
       }}>
      <div className = "fc-list-container d-flex flex-column align-content-center justify-content-center">
        <div className="fc-list fc-list-container-border mt-5" style= {{ height: '100vh', width: '100%'}}>
          <div id ="fccard">
            <div id='cardTitle'>
              <h1 id='notebookName'className=" snotebook-name mb-5 mt-2" style={{
                    color: '#24997F',
                    fontSize: '35x',
                    margin: '10px 0px 0px 0px'
                  }}>{this.state.notebookName}</h1>
              <h4 id='deckLength' className="">{this.state.flashcards.length + ' card(s)'}</h4>
            </div>
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
       <div className="flashcardDeck d-flex flex-row col-3 justify-content-center mb-5 mt-5">
         <div className='fcLists fc-list-container-border' style={{ height: '100vh', width: '100%'}}>
          <div>
            {this.state.flashcards.map(fcItem => {
              return(
              <FcDeckItems
                key={fcItem.fcDeckId}
                flashcard={fcItem} />
              );
            
          })}</div>
             <div></div>
         </div>
     </div>
     </div>

    );
  }
}
