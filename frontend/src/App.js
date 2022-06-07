import logo from './logo.svg';
import './App.css';
import {useEffect} from "react"
import axios from 'axios';

function App() {
  const createAccount = () => {
    axios.post("http://localhost:9000/account/create", {
      username: "testUser", 
      email: "aaaa@virginia.edu", 
      password: "testPassword"
    })
  }
  return (
    <div>
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
    </div>
  );
}

export default App;
