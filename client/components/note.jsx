import React from 'react';
import NotebookHeader from './notebook-header';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { Link } from 'react-router-dom';
import CodePlayground from './code-playground';

function Modal(props) {
  let modalContent;
  let modalStyle;
  if (props.modal === 'cancel') {
    modalContent = 'Changes have been cancelled';
    modalStyle = 'note-modal modal-visible';
  }
  if (props.modal === 'update') {
    modalContent = 'Note has been updated';
    modalStyle = 'note-modal modal-visible';
  }
  if (props.modal === 'create') {
    modalContent = 'Note has been created';
    modalStyle = 'note-modal modal-visible';
  }
  if (props.modal === 'flashcard') {
    modalContent = 'flashcard has been created';
    modalStyle = 'note-modal modal-visible';
  }
  if (props.modal === 'hidden') {
    modalContent = '';
    modalStyle = 'note-modal modal-hidden';
  }
  return (
    <div className={modalStyle}>
      <div className="note-modal-main d-flex justify-content-center align-items-center">
        <p>{modalContent}</p>
      </div>
    </div>
  );
}

class Note extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      note: null,
      view: 'viewNote',
      element: null,
      notebooks: [],
      flashcard: { fcTags: [''], fcDeckId: null, fcQuestion: '', fcAnswer: '' },
      modal: 'hidden',
      tagInput: '',
      codeOpened: false,
      dropdownMenuOpen: 'false'
    };
    this.deleteNote = this.deleteNote.bind(this);
    this.editNote = this.editNote.bind(this);
    this.createNewNote = this.createNewNote.bind(this);
    this.createFlashcard = this.createFlashcard.bind(this);
    this.handleDifficultyChange = this.handleDifficultyChange.bind(this);
    this.handleNotebookIdChange = this.handleNotebookIdChange.bind(this);
    this.handleContentChange = this.handleContentChange.bind(this);
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.createNewNote = this.createNewNote.bind(this);
    this.getAllNoteData = this.getAllNoteData.bind(this);
    this.getNotebooks = this.getNotebooks.bind(this);
    this.addOneResource = this.addOneResource.bind(this);
    this.deleteOneResource = this.deleteOneResource.bind(this);
    this.handleResourceName = this.handleResourceName.bind(this);
    this.handleResourceLink = this.handleResourceLink.bind(this);
    this.addOneResource = this.addOneResource.bind(this);
    this.deleteOneResource = this.deleteOneResource.bind(this);
    this.showModal = this.showModal.bind(this);
    this.flashCardQuestion = this.flashCardQuestion.bind(this);
    this.flashCardAnswer = this.flashCardAnswer.bind(this);
    this.handleTagInputChange = this.handleTagInputChange.bind(this);
    this.addTag = this.addTag.bind(this);
    this.codeClicked = this.codeClicked.bind(this);
    this.codeBackClicked = this.codeBackClicked.bind(this);
    this.handleCodeChange = this.handleCodeChange.bind(this);
  }

  componentDidMount() {
    this.getAllNoteData();
    this.getNotebooks();
  }

  getAllNoteData() {
    if (this.props.match.params.noteId) {
      fetch(`/api/notes/${this.props.match.params.noteId}`)
        .then(res => res.json())
        .then(data => {
          this.setState({
            note: data,
            flashcard: { fcTags: [''], fcQuestion: '', fcAnswer: '', fcDeckId: data.notebookId }
          });
        })
        .catch(error => console.error(error));
    } else {
      this.setState({
        note: {
          notebookId: '',
          noteTitle: '',
          noteContent: '',
          noteDifficulty: 1,
          noteResource: [],
          noteCode: { html: '', css: '', js: '' },
          noteTags: ['']
        },
        view: 'createNote',
        flashcard: { fcTags: [''], fcQuestion: '', fcAnswer: '', fcDeckId: 1 }
      });
    }
  }

  getNotebooks() {
    fetch('/api/students/1')
      .then(res => res.json())
      .then(notebookData => this.setState({
        notebooks: notebookData.notebooks
      }))
      .catch(error => console.error(error));
  }

  handleTitleChange(event) {
    this.setState({
      note: {
        ...this.state.note,
        noteTitle: event.target.value
      }
    });
  }

  handleDifficultyChange(number) {
    this.setState({
      note: {
        ...this.state.note,
        noteDifficulty: number
      }
    });
  }

  handleNotebookIdChange(notebookId, notebookName) {
    this.setState({
      note: {
        ...this.state.note,
        notebookId: notebookId,
        notebookName: notebookName
      }
    });
  }

  toggleDropdown() {
    this.setState({
      dropdownMenuOpen: !this.state.dropdownMenuOpen
    });
  }

  handleContentChange(event) {
    this.setState({
      note: {
        ...this.state.note,
        noteContent: event.target.value
      }
    });
  }

  handleTagInputChange(event) {
    this.setState({ tagInput: event.target.value });
  }

  addTag(event) {
    if (event.key === 'Enter') {
      event.preventDefault();
      const tagsArray = this.state.note.noteTags;

      tagsArray.push(event.target.value);
      this.setState({
        note: {
          ...this.state.note,
          noteTags: tagsArray
        },
        tagInput: ''
      });

    }
  }

  handleResourceName(index, event) {
    const resourceArray = [...this.state.note.noteResource];
    const newName = {
      name: event.target.value,
      link: resourceArray[index].link
    };
    resourceArray.splice(index, 1, newName);
    this.setState({
      note: {
        ...this.state.note,
        noteResource: resourceArray
      }
    });
  }

  handleResourceLink(index, event) {
    const resourceArray = [...this.state.note.noteResource];
    const newName = {
      name: resourceArray[index].name,
      link: event.target.value
    };
    resourceArray.splice(index, 1, newName);
    this.setState({
      note: {
        ...this.state.note,
        noteResource: resourceArray
      }
    });
  }

  addOneResource() {
    const resource = { link: '', name: '' };
    const resourceArray = [...this.state.note.noteResource];
    resourceArray.push(resource);
    this.setState({
      note: {
        ...this.state.note,
        noteResource: resourceArray
      }
    });
  }

  deleteOneResource(index) {
    const resourceArray = [...this.state.note.noteResource];
    resourceArray.splice(index, 1);
    this.setState({
      note: {
        ...this.state.note,
        noteResource: resourceArray
      }
    });
  }

  flashCardQuestion(event) {
    this.setState({
      flashcard: {
        ...this.state.flashcard,
        fcQuestion: event.target.value
      }
    });
  }

  flashCardAnswer(event) {
    this.setState({
      flashcard: {
        ...this.state.flashcard,
        fcAnswer: event.target.value
      }
    });
  }

  createNewNote(event) {
    event.preventDefault();
    const noteTitle = this.state.note.noteTitle;
    const noteContent = this.state.note.noteContent;
    const noteTags = this.state.note.noteTags;
    const notebookId = this.state.note.notebookId;
    if (!noteTitle || !noteContent || !noteTags || !notebookId) {
      alert('Error: A new note must have a title, content, at least one tag entered, and a notebook selected before creating it.');
      return;
    }
    const newNote = this.state.note;
    fetch('/api/notes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newNote)
    })
      .then(res => res.json())
      .then(data => {
        this.setState({
          view: 'viewNote'
        });
        this.showModal('create');
        this.props.history.push(`/notes/${data.noteId}`);
      })
      .catch(error => console.error(error));
  }

  editNote(event) {
    event.preventDefault();
    const { notebookName, noteId, ...rest } = this.state.note;
    fetch(`/api/notes/${this.props.match.params.noteId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(rest)
    })
      .then(res => res.json())
      .then(update => {
      })
      .catch(error => console.error(error));
  }

  deleteNote(noteId) {
    fetch(`/api/notes/${noteId}`, {
      method: 'DELETE'
    })
      .then(() => { this.setState({ view: 'deleteSuccess' }); })
      .catch(error => console.error(error));
  }

  createFlashcard(event) {
    event.preventDefault();
    if (!this.state.flashcard.fcQuestion && !this.state.flashcard.fcAnswer) {
      alert('Error: Please enter a valid question and answer.');
      return;
    }
    fetch('/api/flashcards/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(this.state.flashcard)
    })
      .then(res => res.json())
      .then(data => {
        this.setState({
          flashcard: {
            ...this.state.flashcard,
            fcTags: [''],
            fcQuestion: '',
            fcAnswer: ''
          }
        });
        if (!data.error) {
          this.showModal('flashcard');
        }
      })
      .catch(error => console.error(error));
  }

  codeClicked() {
    this.setState({ codeOpened: true });
  }

  codeBackClicked() {
    this.setState({ codeOpened: false });
  }

  showModal(string) {
    if (string === 'cancel') {
      this.setState({
        modal: 'cancel'
      });
    }
    if (string === 'update') {
      this.setState({
        modal: 'update'
      });
    }
    if (string === 'create') {
      this.setState({
        modal: 'create'
      });
    }
    if (string === 'flashcard') {
      this.setState({
        modal: 'flashcard'
      });
    }
    setTimeout(() => {
      this.setState({
        modal: 'hidden'
      });
    }, 2000);
  }

  handleCodeChange(code) {
    this.setState({
      note: {
        ...this.state.note,
        noteCode: code
      }
    });
  }

  render() {
    const note = this.state.note;
    const view = this.state.view;
    const element = this.state.element;
    const dropdownMenuOpen = this.state.dropdownMenuOpen;
    const justifyContent = element ? 'justify-content-between' : 'justify-content-end';
    const closeButton = this.state.view === 'viewNote' ? '/notebook' : '/';
    const dropdownListClass = this.state.dropdownMenuOpen ? 'dropdown-list dropdown-hidden' : 'dropdown-list dropdown-visible';
    let label;
    if (this.state.view === 'createNote') {
      label = 'Select Notebook Name:';
    }
    if (this.state.view === 'viewNote') {
      label = 'Notebook Name:';
    }
    let elementRow, rightColumn;
    if (view === 'deleteSuccess') {
      return (
        <>
          <NotebookHeader />
          <div className="page-container">
            <div className="note-delete">
              <h3>Your note has been deleted.</h3>
              <Link to="/notebook" className="notebooks-link">
                <Button className="solid-button mt-4">Back</Button>
              </Link>
            </div>
          </div>
        </>
      );
    }

    switch (element) {
      case 'flashcard':
        elementRow = (
          <div className="height-90">
            <FormGroup className="mb-4">
              <Label for="flashcardQuestion" className="note-font-1">Enter Question:</Label>
              <Input type="textarea" name="flashcardQuestion" id="flashcardQuestion"
                className="note-input" value={this.state.flashcard.fcQuestion}
                onChange={this.flashCardQuestion} />
            </FormGroup>
            <FormGroup className="mb-4">
              <Label for="flashcardAnswer" className="note-font-1">Enter Answer:</Label>
              <Input type="textarea" name="flashcardAnswer" id="flashcardAnswer"
                className="note-input" value={this.state.flashcard.fcAnswer}
                onChange={this.flashCardAnswer} />
            </FormGroup>
            <div className="d-flex flex-row align-items-center justify-content-between">
              <FormGroup className="mb-5 flashcard-select-tag">
                <Label for="flashcardTag">Flashcard Tag:</Label>
                <Input type="select" name="flashcardTag" id="flashcardTag" className="note-input">
                  <option defaultValue>Select a Tag</option>
                  <option>Create new tag</option>
                </Input>
              </FormGroup>
              <Button className="solid-button-large ml-4" onClick={this.createFlashcard}>Make Flashcard</Button>
            </div>
          </div>
        );
        break;
      case 'resource':
        elementRow = (
          <div className="height-90">
            {
              note.noteResource.map((item, index) => {
                return (
                  <div key={index} className="d-flex flex-row align-items-center justify-content-between mb-2">
                    <FormGroup className="resource">
                      <Label for="resourceName">Resource Name</Label>
                      <Input type="text" name="resourceName" id="resourceName" placeholder="Name" className="note-input"
                        defaultValue={item.name} onChange={() => this.handleResourceName(index, event)} />
                    </FormGroup>
                    <FormGroup className="resource-link ml-4">
                      <Label for="resourceLink">Link</Label>
                      <Input type="text" name="resourceLink" id="resourceLink" placeholder="Name" className="note-input"
                        defaultValue={item.link} onChange={() => this.handleResourceLink(index, event)} />
                    </FormGroup>
                    <div className="minus-button ml-4" onClick={() => this.deleteOneResource(index)}><i className="fas fa-minus"></i></div>
                  </div>
                );
              })
            }
            <div className="add-button" onClick={this.addOneResource}><i className="fas fa-plus"></i></div>
          </div>
        );
        break;
      case 'code':
        elementRow = (
          <div className="height-90">
            <h3>HTML</h3>
            <p>{note.noteCode.html}</p>
            <h3>CSS</h3>
            <p>{note.noteCode.css}</p>
            <h3>JavaScript</h3>
            <p>{note.noteCode.javascript}</p>
          </div>
        );
        break;
    }

    switch (view) {
      case 'viewNote':
        rightColumn = (
          <div className={`d-flex flex-column height-90 ${justifyContent}`}>
            {elementRow}
            <div className="height-10 d-flex align-items-end justify-content-center ">
              <Button type="submit" className="solid-button"
                onClick={() => {
                  this.editNote(event);
                  this.showModal('update');
                }}>Update</Button>
              <Button type="reset" className="solid-button ml-4"
                onClick={() => {
                  this.getAllNoteData();
                  this.showModal('cancel');
                }}>Cancel</Button>
              <Button className="solid-button ml-4" onClick={() => this.deleteNote(note.noteId)}>Delete</Button>
            </div>
          </div>
        );
        break;
      case 'createNote':
        rightColumn = (
          <div className={`d-flex flex-column height-90 ${justifyContent}`}>
            {elementRow}
            <div className="height-10 d-flex align-items-end justify-content-center">
              <Button type="submit" className="solid-button"
                onClick={() => {
                  this.createNewNote(event);
                }}>Create</Button>
              <Button type="reset" className="solid-button ml-4"
                onClick={() => {
                  this.getAllNoteData();
                  this.showModal('cancel');
                }}>Cancel</Button>
            </div>
          </div>
        );
        break;
    }

    return note === null ? (null) : (

      <>
        <CodePlayground codeClicked={this.codeClicked} codeBackClicked={this.codeBackClicked}
          isOpened={this.state.codeOpened} noteCode={this.state.note.noteCode}
          handleCodeChange={this.handleCodeChange} noteView={this.state.view}/>
        <Form>
          <header className="header-container d-flex flex-row justify-content-between">
            <div className="d-flex flex-row align-items-center col">
              <Link to="/" className="d-flex flex-row align-items-center" style={{ textDecoration: 'none' }}>
                <img src="/images/code-note-icon.png" alt="Code Note Icon" />
              </Link>
              <FormGroup className="ml-5 mb-0">
                <Label for="noteTile"></Label>
                <input
                  className="header-note-title"
                  type="text" name="noteTile"
                  id="noteTile"
                  placeholder="Enter title here"
                  defaultValue={note.noteTitle}
                  onChange={this.handleTitleChange} />
              </FormGroup>
            </div>
            <div className="d-flex flex-row align-items-center justify-content-end col-md-4">
              {note.noteTags.map((tag, index) => {
                if (tag === '') {
                  return;
                }
                return <p key={index} className="tag-display">{tag}</p>;

              })}
              <FormGroup className='tag-group'>
                <Input type="text" name="noteTags" id="noteTags" className="col tag-input"
                  placeholder='Add a tag' value={this.state.tagInput}
                  onChange={this.handleTagInputChange} onKeyPress={this.addTag} />
              </FormGroup>
              <div className={`diff-status ml-4 diff-${note.noteDifficulty}`}></div>
              <Link to={{ pathname: closeButton }}>
                <Button className="d-flex flex-row align-items-center justify-content-center close-page-button ml-4">
                  <i className="fas fa-times"></i>
                </Button>
              </Link>
            </div>
          </header>
          <main className="page-container">
            <div className="col-6">
              <div className="d-flex flex-row align-items-center mb-4">
                <div className="note-font-1">Difficulty:</div>
                <div className="difficulty diff-1"
                  onClick={() => this.handleDifficultyChange(1)}></div>
                <div className="difficulty diff-2"
                  onClick={() => this.handleDifficultyChange(2)}></div>
                <div className="difficulty diff-3"
                  onClick={() => this.handleDifficultyChange(3)}></div>
                <div className="difficulty diff-4"
                  onClick={() => this.handleDifficultyChange(4)}></div>
                <div className="difficulty diff-5"
                  onClick={() => this.handleDifficultyChange(5)}></div>
              </div>
              <FormGroup>
                <Label for="dropdown container col-6" className="note-font-1">{label}</Label>
                <div className="dropdown-container" id="dropdown-container">
                  <div onClick={() => this.toggleDropdown()} className="dropdown-header">
                    <div className="dropdown-header-title">{this.state.note.notebookName}</div>
                    {dropdownMenuOpen
                      ? <i className="fa fa-angle-down fa-2x"></i>
                      : <i className="fa fa-angle-up fa-2x"></i>
                    }
                  </div>
                  <div className={dropdownListClass}>
                    {
                      this.state.notebooks.map(notebook => {
                        return (
                          <div className="dropdown-list-item" key={notebook.notebookId}
                            onClick={() => {
                              this.handleNotebookIdChange(notebook.notebookId, notebook.notebookName);
                              this.toggleDropdown();
                            }}>{notebook.notebookName}</div>
                        );
                      })
                    }
                  </div>
                </div>
              </FormGroup>
              <FormGroup>
                <Label for="noteContent" className="note-font-1">Enter Note:</Label>
                <textarea
                  className="form-control note-content note-input"
                  type="textarea"
                  name="noteContent"
                  id="noteContent"
                  defaultValue={note.noteContent}
                  placeholder="Enter note here"
                  onChange={this.handleContentChange}></textarea>
              </FormGroup>
              <Modal
                modal={this.state.modal} />
            </div>
            <div className={'col-5 d-flex flex-column h-100'}>
              <div className="height-10">
                <Button
                  className="solid-button"
                  onClick={() => this.setState({ element: 'flashcard' })}>Flashcard</Button>
                <Button
                  className="solid-button ml-4"
                  onClick={() => this.setState({ element: 'resource' })}>Resource</Button>
                <Button
                  className="solid-button ml-4"
                  onClick={this.codeClicked}>Code</Button>
              </div>
              {rightColumn}
            </div>
          </main>
        </Form>
      </>
    );
  }
}

export default Note;
