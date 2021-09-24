import React, { Component } from 'react'
import logo from './logo.svg';
import Home from './home'
import Operate from './operate'
import Passenger from './passenger'
import Time from './time'
import Driver from './driver'
import SubsidyMotc from './subsidyMotc'
import SubsidyPt from './subsidyPt'
import {
  Route,
  NavLink,
  HashRouter
} from "react-router-dom";

import './App.css';
class App extends Component {
  state = { loading: true, drizzleState: null };
  componentDidMount() {
    const { drizzle } = this.props;
    // subscribe to changes in the store
    this.unsubscribe = drizzle.store.subscribe(() => {
      // every time the store updates, grab the state from drizzle
      const drizzleState = drizzle.store.getState();
      // check to see if it's ready, if so, update local component state
      if (drizzleState.drizzleStatus.initialized) {
        this.setState({ loading: false, drizzleState });
      }
    });
  }
  componentWillUnmount() {
    this.unsubscribe();
  }
  render() {
    if (this.state.loading) return "Loading Drizzle...";
    return (
      <HashRouter>
        <div className="App">
          <h1>
            幸福巴士2.0區塊鏈補貼系統
          </h1>
          
          <ul className="header">
              <li><NavLink to="/Home">Home</NavLink></li>
              <li><NavLink to="/Operate">Operate</NavLink></li>
              <li><NavLink to="/Passenger">Passenger</NavLink></li>
              <li><NavLink to="/Time">Time</NavLink></li>
              <li><NavLink to="/Driver">Driver</NavLink></li>
              <li><NavLink to="/SubsidyMotc">SubsidyMotc</NavLink></li>
              <li><NavLink to="/SubsidyPt">SubsidyPt</NavLink></li>
          </ul>
          <div className="content">
            <Route path="/home">
              <Home></Home>
            </Route>
            <Route path="/Operate" >
              <Operate
              drizzle={this.props.drizzle}
              drizzleState={this.state.drizzleState}
              />
            </Route>
            <Route path="/Passenger">
              <Passenger
              drizzle={this.props.drizzle}
              drizzleState={this.state.drizzleState}
              />
            </Route>
            <Route path="/Time">
              <Time
              drizzle={this.props.drizzle}
              drizzleState={this.state.drizzleState}
              />
            </Route>

            <Route path="/Driver">
              <Driver
              drizzle={this.props.drizzle}
              drizzleState={this.state.drizzleState}
              />
            </Route>
            <Route path="/SubsidyMotc">
              <SubsidyMotc
              drizzle={this.props.drizzle}
              drizzleState={this.state.drizzleState}
              />
            </Route>
            <Route path="/SubsidyPt">
              <SubsidyPt
              drizzle={this.props.drizzle}
              drizzleState={this.state.drizzleState}
              />
            </Route>
          </div>
        </div>
      </HashRouter>

    );
  }
}
export default App;



