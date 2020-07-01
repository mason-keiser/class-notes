import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Form, FormGroup, Input } from 'reactstrap';

function FcListItem(props) {
  const fcListItem = props.flashcard;
  const fcDeckId = fcListItem.fcDeckId;
  return (
    null
  );
}

function FcDeckItems(props) {
  const fcItem = props.flashcard
  const fcId = fcItem.fcDeckId
  return (
    <div className='d-flex flex-row justify-content-center pt-5'>
      <div className='fcQ mr-5 d-flex pt-4' style={{
        border: '1px solid #3F3F3D',
        color:'#24997F',
        width: '40%',
        height: '100px',
        justifyContent: 'center',
        fontSize: '20px',
        padding: '7px'
      }}>{fcItem.fcQuestion}</div>
      <div className='fcA d-flex pt-4' style={{
        border: '1px solid #3F3F3D',
        color:'#24997F',
        width: '40%',
        justifyContent: 'center',
        fontSize: '20px',
        padding: '7px'
      }}>{fcItem.fcAnswer}</div>
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
      <div className="d-flex flex-row mainFcCont pt-0" style={{ 
        backgroundColor: '#333333',
        display: 'flex',
        flex: 'row',
        justifyContent: 'space-evenly',
       }}>
      <div className = "fc-list-container d-flex flex-column pt-0">
        <div className="fc-list pt-0" style= {{ height: '100vh', width: '100%'}}>
          <div id ="fccard" className='pt-0' style={{ border: 'solid 1px #3F3F3D'}}>
            <div id='cardTitle' style={{ border: '1px solid #c4c4c4' }}>
              <h1 id='notebookName'className="pt-3 notebook-name mb-5 " style={{
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
            <div className="">
              <Link to={{ pathname: '/flashcards-review/1' }}>
                <button color="success" className="fc-list-item-content study-button">Study</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
       <div className="flashcardDeck d-flex flex-row col ml-3 mr-4 mb-5 mt-5 cl cr-0 pl-0 pr-0" style={{ 
          height: '100vh',
          width: '100%',
          backgroundColor: '#333333',
          overflowY: 'auto'
          }}>
         <div className='fcLists qa-list-container-border mt-6.6' style={{ height: '745px', width: '100%' }}>
         <div className='pt-3' style={{
              backgroundColor: '#3F3F3D',
              width: '100%',
              height: '10%',
              color: '#24997F',
              display: 'flex',
              justifyContent: 'center',
              fontSize: '25px',
              border: '1px solid #c4c4c4',
          }}>View all available flashcards</div>
          <div>
            {this.state.flashcards.map(fcItem => {
              return(
              <FcDeckItems
                key={fcItem.fcDeckId}
                flashcard={fcItem} />
              );
            
          })}</div>
         </div>
     </div>
     </div>

    );
  }
}
