import React from 'react';
import { Button } from 'reactstrap';

class NoteComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      view: { name: 'viewNote', params: {} }
    };
    this.setView = this.setView.bind(this);
  }

  setView(viewName, viewParams) {
    this.setState({ view: { name: viewName, params: viewParams } });
  }

  render() {
    // if (this.state.view === 'viewNote') {
    //   return (
    //     <>
    //       <div>
    //         <Button color="success">Flashcard</Button>
    //         <Button color="success">Resource</Button>
    //         <Button color="success">Code</Button>
    //       </div>
    //       <div>
    //         <Button color="success">Update</Button>
    //         <Button color="success">Delete</Button>
    //       </div>
    //     </>
    //   );
    // } else if (this.state.view === 'createNote') {
    //   return (
    //     <>
    //       <div>
    //         <Button color="success">Flashcard</Button>
    //         <Button color="success">Resource</Button>
    //         <Button color="success">Code</Button>
    //       </div>
    //       <div>
    //         <Button color="success">Create</Button>
    //       </div>
    //     </>
    //   );
    // } else if (this.state.view === 'flashcard') {
    //   return (
    //     <>
    //       <div>
    //         <Button color="success">Flashcard</Button>
    //         <Button color="success">Resource</Button>
    //         <Button color="success">Code</Button>
    //       </div>
    //       <form>
    //         <h3>Enter question</h3>
    //         <h3>Enter Answer</h3>
    //       </form>
    //     </>
    //   );
    // } else if (this.state.view === 'resource') {
    //   return (
    //     <>
    //       <div>
    //         <Button color="success">Flashcard</Button>
    //         <Button color="success">Resource</Button>
    //         <Button color="success">Code</Button>
    //       </div>
    //       <form>
    //         <h3>Resource Name</h3>
    //         <h3>Resurce Name</h3>
    //       </form>
    //     </>
    //   );
    // } else if (this.state.view === 'code') {
    //   return (
    //     <>
    //       <div>
    //         <Button color="success">Flashcard</Button>
    //         <Button color="success">Resource</Button>
    //         <Button color="success">Code</Button>
    //       </div>
    //       <h3>HTML</h3>
    //       <h3>CSS</h3>
    //       <h3>JavaScript</h3>
    //     </>
    //   );
    // }
    return (
      <div className="d-flex flex-column justify-content-between">
        <div className="note-top-button-group">
          <Button color="success">Flashcard</Button>
          <Button color="success">Resource</Button>
          <Button color="success">Code</Button>
        </div>
        <div className="note-bottom-button-group">
          <Button color="success">Update</Button>
          <Button color="success">Delete</Button>
        </div>
      </div>
    );
  }
}

export default NoteComponent;
