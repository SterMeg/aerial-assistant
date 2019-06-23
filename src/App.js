import { 
  BrowserRouter as Router, 
  Route,
  Redirect,
  Switch 
} from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import Signup from "./components/Signup";
import React, { Component } from 'react';
import { getToken } from './services/tokenService'
import { Normalize } from 'styled-normalize';
import styled, { createGlobalStyle } from 'styled-components';
import axios from "axios";
import CardList from "./components/CardList";
import Header from "./components/Header";

const GlobalStyles = createGlobalStyle`
  html {
    font-size: 62.5%;
    box-sizing: border-box;
  }

  *,
  *::before,
  *::after {
    box-sizing: inherit;
  }

  body {
    font-family: "Lato", sans-serif;
    font-size: 1.6rem;
    line-height: 1.6;
    color: #495159;
  }

  .visuallyhidden:not(:focus):not(:active) {
    position: absolute;
    width: 1px;
    height: 1px;
    margin: -1px;
    border: 0;
    padding: 0;
    white-space: nowrap;
    clip-path: inset(100%);
    clip: rect(0 0 0 0);
    overflow: hidden;
  }
`
const Wrapper = styled.main`
  display: grid;
  grid-template-columns: 1fr minmax(350px, 1170px) 1fr;
  padding: 0 15px;
  & > * {
    grid-column: 2;
  } 
`

class App extends Component {
  state = {
    user: null
  };
  componentDidMount() {
    this.getCurrentUser();
  }
  setUser = user => {
    this.setState({ user })
  };
  getCurrentUser = async () => {
    const token = getToken();
    if (token) {
      try {
        const res = await axios.get('/user/me', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        const user = res.data
        this.setState({ user })
      } catch (e) {
        console.error(e)
      }
    } 
  }
  render() {
    return (
      <React.Fragment>
        <Normalize />
        <GlobalStyles />
        <div className="App">
          <Router>
            <Header setUser={this.setUser} />
            <Wrapper>
              <Switch>
                <Route 
                  exact path="/" 
                  render={() => 
                    this.state.user ?
                    <Dashboard setUser={this.setUser} />
                    :
                    <Redirect to="/login" />
                  }
                />
              </Switch>
              <Route 
                exact 
                path="/login" 
                render={() =>
                this.state.user ? <Redirect to="/" /> : <Login getCurrentUser={this.getCurrentUser} />
                } 
              />
              <Route
                exact
                path="/signup"
                render={() => 
                  this.state.user ? <Redirect to="/" /> : <Signup setUser={this.setUser}/>
                }
              />
              <Route
                path="/moves/:id"
                component={CardList}>
              </Route>
              {/* <Route
                path="/move/:id"
                component={}>
              </Route> */}
            </Wrapper>
          </Router>
        </div>
      </React.Fragment>
    );
  }
}

export default App;
