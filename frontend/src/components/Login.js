import axios from "axios";
import React from "react";
import {useState} from "react"; 

const Login = () => {
    const [loginEmail, setLoginEmail] = useState(""); 
    const [loginPassword, setLoginPassword] = useState(""); 
    const [signupEmail, setSignupEmail] = useState(""); 
    const [signupPassword, setSignupPassword] = useState(""); 
    const [username, setUsername] = useState(""); 
    const [statusText, setStatusText] = useState(""); 
    const login = (compID, pass) => {
        console.log("loggin in")
        const email = compID + "@virginia.edu";
        fetch("http://localhost:9000/account/login/" + email + "/" + pass).then((res) => res.json()).then((text) => console.log(text))
    }
    const register = (compID, pass, username) => {
        const email = compID + "@virginia.edu"; 
        axios.post("http://localhost:9000/account/create", {
            email: email,
            password: pass,
            username: username
        }).then((res) => {console.log("fds"); setStatusText("Signed up! You may now log in."); setSignupEmail(""); setSignupPassword(""); setUsername(""); login(compID, pass)}); 
    }
    return(
        <div className='login-signup-form'>
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