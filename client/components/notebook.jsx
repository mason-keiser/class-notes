import React from 'react';

export default class Notebook extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: []
    };
  }
}
