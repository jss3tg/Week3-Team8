
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
      fetch("http://localhost:9000/cart/" + "ylM1X1JG3fLvEfKFH2dW").then((res) => res.json()).then((text) => console.log(text))
  }, [])
  return (
    <UserIDProvider>
      <Navbar collapseOnSelect expand="md" className="color-nav">
        <LinkContainer to="/">
          <Navbar.Brand className="logo-nav">
            <img
            alt=""
            src="/uvalogo-removebg-preview.png"
            width="70"
            height="40"
            />{' '}
          Hoos Selling
          </Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle />
        <Navbar.Collapse className="redirect-nav">
          <Nav activeKey={window.location.pathname}>
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
      <Login />
    </UserIDProvider>
  );
}

export default App;
