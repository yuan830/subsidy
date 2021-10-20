import React, { Component } from 'react'
import Home from './home'
import Operate from './operate'
import SubsidyMotc from './subsidyMotc'
import SubsidyPt from './subsidyPt'
import Find_hash from './find_hash'
import Data from './data'
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
              <li><NavLink to="/Home">主頁</NavLink></li>
              <li><NavLink to="/Operate">營運業者資料輸入</NavLink></li>
              <li><NavLink to="/Data">檔案雜湊值輸入</NavLink></li>
              <li><NavLink to="/SubsidyMotc">虧損補貼款統計查詢</NavLink></li>
              <li><NavLink to="/SubsidyPt">愛心與敬老補貼款查詢</NavLink></li>
              <li><NavLink to="/Find_hash">檔案雜湊值判讀</NavLink></li>
          </ul>
          <div className="content">
            <Route path="/Home">
              <Home></Home>
            </Route>
            <Route path="/Operate" >
              <Operate
              drizzle={this.props.drizzle}
              drizzleState={this.state.drizzleState}
              />
            </Route>
            <Route path="/Data">
              <Data
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
            <Route path="/Find_hash">
              <Find_hash
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



