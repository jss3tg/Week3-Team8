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
    <div className="App">
    </div>
  );
}

export default App;
