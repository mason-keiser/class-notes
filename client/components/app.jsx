import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import MainPage from './main-page';
import Header from './header';

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
  //   return this.state.isLoading
  //     ? <h1>Testing connections...</h1>
  //     : <h1>{ this.state.message.toUpperCase() }</h1>;
  // }

    return (
      <Router>
        <Header />
        <Switch>
          <Route path="/" exact component={MainPage}/>
        </Switch>
      </Router>
    );
  }
}
