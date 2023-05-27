import React from 'react';
import Header from './Header';
import Footer from './Footer';
import BestBooks from './BestBooks';
import 'bootstrap/dist/css/bootstrap.min.css';
import { withAuth0 } from '@auth0/auth0-react';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import LoginButton from './LoginButton';
import LogoutButton from './LogoutButton';
import Content from './Content';

class App extends React.Component {

  render() {
    return (
      <>
      {/* this.props.auth0.isAuthenticated is a boolean */}
      {/* This will tell us if the user is logged in */}
      <h1>Auth0</h1>
      {this.props.auth0.isAuthenticated ? <LogoutButton/> : <LoginButton/> }
          {this.props.auth0.isAuthenticated ? <Content/> : <h2>Please login</h2> }
        <Router>
          <Header />
          <Routes>
            <Route 
            // "/" is the homepage
              exact path="/"
              //the homepage will render bestbooks js
              element={<BestBooks />}
            >
            </Route>
            {/* PLACEHOLDER: add a route with a path of '/about' that renders the `About` component */}
          </Routes>
          <Footer />
        </Router>
      </>
    )
  }
}

export default withAuth0(App);
