import axios from "axios";
import React from "react";
import {useState, useContext} from "react"; 
import {UserIDContext} from "../UserIDContext";
import "./Login.css"; 
import { Navbar } from "react-bootstrap";


const Login = () => {
    const [loginEmail, setLoginEmail] = useState(""); 
    const [loginPassword, setLoginPassword] = useState(""); 
    const [signupEmail, setSignupEmail] = useState(""); 
    const [signupPassword, setSignupPassword] = useState(""); 
    const [username, setUsername] = useState(""); 
    const [statusText, setStatusText] = useState(""); 
    const {curUserID, setCurUserID} = useContext(UserIDContext); 
    console.log(curUserID); 
    const login = (compID, pass) => {
        console.log("loggin in")
        const email = compID + "@virginia.edu";
        fetch("http://localhost:9000/account/login/" + email + "/" + pass).then((res) => res.json()).then((text) => {
            if(text.id) {
                setCurUserID(text.id); console.log(text.id)
            }
            else if (text.error == "Firebase: Error (auth/wrong-password).") {
                setStatusText("Your password is incorrect!")
                alert("Your password is incorrect!"); 
            }
            else {
                setStatusText("This user doesn't exist. Please try signing in again. Remember to enter your computing ID, not your email.")
                alert("This user doesn't exist. Please try signing in again. Remember to enter your computing ID, not your email."); 
            }
        })
    }
    const register = (compID, pass, username) => {
        if(compID.split("@")[1]) {
            setStatusText("Please enter your computing ID, not your email!")
            alert("Please enter your computing ID, not your email!")
        }
        else if(pass.length < 7) {
            setStatusText("Password is too short! Please use a password with at least 7 characters.")
            alert("Password is too short! Please use a password with at least 7 characters.")
        }
        else {
            const email = compID + "@virginia.edu"; 
            axios.post("http://localhost:9000/account/create", {
                email: email,
                password: pass,
                username: username
            }).then((res) => {setStatusText(res.data); 
            if(res.data == "Account Created! You may now log in.") {
                login(compID, pass);
                setSignupEmail(""); setSignupPassword(""); setUsername("")
            }  
            else {
                alert(res.data); 
            }
            }); 
        }
    }
    return(
        <div className='login-signup-form'>
            <div className="color-nav">
            <div className="logo-nav">
                <img
                alt="Hoos Selling Logo"
                src="/uvalogo-removebg-preview.png"
                width="70"
                height="40"
                />{' '}
                HOOS SELLING
            </div>
            </div>
            
            <div className="login">
            <h1>Login</h1>
            <input type="text" placeholder="Enter Computing ID" value={loginEmail} onChange={(e)=>{{
                console.log(e.target.value); 
                setLoginEmail(e.target.value); 
            }}}/>
            <br></br>
            <input type="password" placeholder="Enter Password" value={loginPassword} onChange={(e)=>{setLoginPassword(e.target.value)}}/>
            <br></br>
            <button onClick={() => {login(loginEmail, loginPassword)}} className='login-btn'>Sign In</button>
            <p></p>
            </div>

            <div className="signup">
            <h1>Create an Account</h1>
            <input type="text" placeholder="Enter Computing ID" value={signupEmail} onChange={(e)=>{{
                console.log(e.target.value); 
                setSignupEmail(e.target.value); 
            }}}/>
            <br></br>
            <input type="password" placeholder="Enter Password" value={signupPassword} onChange={(e)=>{setSignupPassword(e.target.value)}}/>
            <br></br>
            <input type="text" placeholder="Enter Username" value={username} onChange={(e)=>{setUsername(e.target.value)}}/>
            <br></br>
            <button onClick={() => {register(signupEmail, signupPassword, username)}} className='login-btn'>Sign Up</button>
            <p></p>
            </div>
            <p>{statusText}</p>
        </div>
    );
}

export default Login