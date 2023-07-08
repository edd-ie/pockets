import React, { useState } from 'react';
import './Login.css';
import { Link } from "react-router-dom";


const Login = ({setUserData, webState}) => {

  function handleLogin(e) {
    e.preventDefault();
    let form = e.target;
    let mail = e.target.elements[0].value;
    let pass = e.target.elements[1].value;

    let credentials = {"email": mail, "password": pass}

    fetch("https://pockets.onrender.com/login",{
      method: "POST",
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(credentials)
    }).then(res=>{
      if (res.ok){
        return res.json().then(data=>{
          console.log('Login data:',data)
          setUserData(data) 
          webState(true)
        })
      }
    }) 
    
    form.reset()
  }

  return (
    <div id='gloginHome'>
      <div id='gLogPage'>
        <div id='gSignDiv'>
          <div className='gLog' id='gLog1'></div>
          <div className='gLog' id='gLog2'>
            <h2>Log in to Pockets</h2>
                <form onSubmit={handleLogin}>
                  <div>
                    <input
                      className='gInput'
                      type="email"
                      placeholder="Email address"
                      required
                    />
                  </div>
                  <div>
                    <input
                      className='gInput'
                      type="password"
                      placeholder="Password"
                      required
                    />
                  </div>
                  <button type="submit">Log In</button>
                </form>
                  <p id='gLogInTxt2'>
                    Sign up to Pockets
                  </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
