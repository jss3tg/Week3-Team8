import './App.css';
import {useEffect} from "react"
import axios from 'axios';
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Routes from './Routes';
import { LinkContainer } from "react-router-bootstrap";
import React, {useContext, useState} from "react"
import Login from "./components/Login.js"
import UserIDProvider from './UserIDContext';
import { UserIDContext } from './UserIDContext';

function App() {
  const {curUserID, setCurUserID} = useContext(UserIDContext); 
  const setLoginPage = (id) => {
    setCurUserID(id); 
  }
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
    if(curUserID && curUserID != "") {
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
          <LinkContainer to="/productpage">
              <Nav.Link>Products</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/sellDash">
              <Nav.Link>Seller Dashboard</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/cart">
              <Nav.Link>Cart</Nav.Link>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <Routes />
    </UserIDProvider>
    </span>
  );
    }
    else {
      return(
        <span className="font-link">
    <UserIDProvider>
      <Login setLoginPage={setLoginPage}/>
    </UserIDProvider>
    </span>
      );
    }
}

export default App;
