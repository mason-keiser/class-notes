/* eslint-disable react/no-string-refs */
import React, { Component } from 'react';
import { Controlled as CodeMirror } from 'react-codemirror2';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/panda-syntax.css';

import 'codemirror/mode/htmlmixed/htmlmixed';
import 'codemirror/mode/css/css';
import 'codemirror/mode/javascript/javascript';

class CodePlayground extends Component {
  constructor() {
    super();
    this.state = {
      html: '',
      css: '',
      js: '',
      originalCode: ''
    };

    this.runCode = this.runCode.bind(this);
    this.clearCode = this.clearCode.bind(this);
    this.makeClearButtonText = this.makeClearButtonText.bind(this);
  }

  componentDidUpdate() {
    this.runCode();
  }

  componentDidMount() {
    this.setState({
      html: this.props.noteCode.html,
      css: this.props.noteCode.css,
      js: this.props.noteCode.js,
      originalCode: this.props.noteCode
    });
  }

  clearCode() {
    this.setState({
      html: this.state.originalCode.html,
      css: this.state.originalCode.css,
      js: this.state.originalCode.js
    });

  }

  makeClearButtonText() {
    if (this.props.noteView === 'createNote') {
      return 'Clear';
    } else {
      return 'Revert Back';
    }
  }

  runCode() {
    const { html, css, js } = this.state;

    const iframe = this.refs.iframe;
    const document = iframe.contentDocument;
    const documentContents = `
          <!DOCTYPE html>
          <html lang="en">
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <meta http-equiv="X-UA-Compatible" content="ie=edge">
            <title>Document</title>
            <style>
              ${css}
            </style>
          </head>
          <body>
            ${html}

            <script type="text/javascript">
              ${js}
            </script>
          </body>
          </html>
        `;

    document.open();
    document.write(documentContents);
    document.close();
  }

  render() {
    const codeContainerClass = this.props.isOpened ? 'code-playground-container-end' : 'code-playground-container-start';
    const { html, js, css } = this.state;
    const codeMirrorOptions = {
      theme: 'panda-syntax',
      lineNumbers: true,
      scrollbarStyle: null,
      lineWrapping: true
    };

    return (

      <div className={codeContainerClass}>
        <section className="playground">
          <div className='code-editor-header d-flex justify-content-between'>
            <p onClick={this.props.codeBackClicked}>&lt; Back</p>
            <p onClick={this.clearCode}>{this.makeClearButtonText()}</p>
            <p onClick={() => {
              const codeData = {
                html: this.state.html,
                css: this.state.css,
                js: this.state.js
              };
              this.props.handleCodeChange(codeData);
            }}>Attach to Note</p>
          </div>
          <div className="code-editor html-code">
            <div className="editor-header">HTML</div>
            <CodeMirror
              value={html}
              options={{
                mode: 'htmlmixed',
                ...codeMirrorOptions
              }}
              onBeforeChange={(editor, data, html) => {
                this.setState({ html });
              }}
            />
          </div>
          <div className="code-editor css-code">
            <div className="editor-header">CSS</div>
            <CodeMirror
              value={css}
              options={{
                mode: 'css',
                ...codeMirrorOptions
              }}
              id="css"
              onBeforeChange={(editor, data, css) => {
                this.setState({ css });
              }}
            />
          </div>
          <div className="code-editor js-code">
            <div className="editor-header">JavaScript</div>
            <CodeMirror
              value={js}
              options={{
                mode: 'javascript',
                ...codeMirrorOptions
              }}
              onBeforeChange={(editor, data, js) => {
                this.setState({ js });
              }}
            />
          </div>
        </section>
        <section className="result">
          <iframe title="result" className="iframe" ref="iframe" />
        </section>
      </div>

    );
  }
}

export default CodePlayground;
