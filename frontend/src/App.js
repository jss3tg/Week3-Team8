import './App.css';
import {useEffect} from "react"
import axios from 'axios';
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Routes from './Routes';
import { LinkContainer } from "react-router-bootstrap";
import React from "react"
import Login from "./components/Login.js"
import UserIDProvider from './UserIDContext';

function App() {
  useEffect(() => {
      // login(); 
  }, [])
  const FontLink = () => {
    return(
      <div className = 'header1'>
        <img
            alt=""
            src="/uvalogo-removebg-preview.png"
            width="70"
            height="40"
            />{' '}
            <span className="font-link">HOOS SELLING</span>
            </div>
    )
    }
  return (
    <span className="font-link">
    <UserIDProvider>
      <Navbar collapseOnSelect expand="md" className="color-nav">
        <LinkContainer to="/">
          <Navbar.Brand className="logo-nav">
          <FontLink />
          </Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle />
        <Navbar.Collapse className="redirect-nav">
          <Nav activeKey={window.location.pathname}>
            <LinkContainer to="/sellDash">
              <Nav.Link>Seller Dashboard</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/stripe">
              <Nav.Link>Cart</Nav.Link>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <Routes />
      <Login />
    </UserIDProvider>
    </span>
  );
}

export default App;
