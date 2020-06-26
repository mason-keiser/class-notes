import React from 'react'
import { Link } from 'react-router-dom'

function FcListItem(props) {
    const fcListItem = props.flashcard;
    const fcId = fcListItem.fcId;
    return (
          <div className="">
            <Link to={{ pathname: '/flashcards/' + fcId }}>
              <p className="card-text text-left fc-list-item-content q h-75">{fcListItem.fcQuestion}</p>
              <p className="card-text text-left fc-list-item-content h-75 mb-4">{fcListItem.fcAnswer}</p>
              <button color="success" className="fc-list-item-content study-button">Study</button>
            </Link>
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
          <div className="fc-list-container d-flex justify-content-centers">
            <div className=" d-flex flex-wrap card-deck fc-list-container-border">
              <div id ="fccard">
                <div id='cardTitle'>
                  <h1 id='notebookName'className="col-1 text-center notebook-name mb-5 mt-2">{this.state.notebookName}</h1>
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
        );
      }
}