import logo from './logo.svg';
import './App.css';
import {useEffect} from "react"
import axios from 'axios';
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Routes from './Routes';
import { LinkContainer } from "react-router-bootstrap";
import React from "react"

function App() {
  const createAccount = () => {
    axios.post("http://localhost:9000/account/create", {
      username: "testUser", 
      email: "aaaa@virginia.edu", 
      password: "testPassword"
    })
  }
  useEffect(() => {
    fetch("http://localhost:9000/users/info").then((res) => res.json()).then((data) => console.log(data.result))
  }, [])
  return (
    <div>
      {/* <Navbar collapseOnSelect expand="md" className="color-nav">
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
      <Routes /> */}
    </div>
  );
}

export default App;
