import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import MainPage from './main-page';
import Notebook from './notebook';
import Note from './note';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: null,
      isLoading: true
    };
  }

  // componentDidMount() {
  //   fetch('/api/health-check')
  //     .then(res => res.json())
  //     .then(data => this.setState({ message: data.message || data.error }))
  //     .catch(err => this.setState({ message: err.message }))
  //     .finally(() => this.setState({ isLoading: false }));
  // }

  render() {
    return (
      <Router>
        <Switch>
          <Route path="/" exact component={MainPage}/>
          <Route path="/notebook" exact component={Notebook}/>
          <Route path="/notes" component={Note}/>
        </Switch>
      </Router>
    );
  }
}
