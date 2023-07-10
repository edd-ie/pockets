import React, { useState } from 'react';
import './Login.css';
import { Link } from "react-router-dom";
import SignUp from './Signup';
import PassReset from './PassReset';


const Login = ({setUserData, webState, setUserId}) => {

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
          setUserData(data) 
          setUserId(data.id)
          sessionStorage.setItem('user', JSON.stringify(data));
          webState(true)
        })
      }
    }) 
    
    form.reset()
  }

  const [showSignUp, setSignUp] = useState(false)
  const [showReset, setReset] = useState(false)

  

  return (
    <div id='gloginHome'>
      {!showSignUp&&!showReset&&
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
                  <p id='gLogInTxt2' onClick={()=>setSignUp(true)}>
                    Sign up to Pockets
                  </p>
                  <p className="ePassRst">
                    Forgot your password? <span className="ePassReset" onClick={()=>setReset(true)}> Reset</span>
                  </p>
          </div>
        </div>
      </div>}
      {showSignUp&& <SignUp setUserId={(e)=>setUserId(e)} user={(e)=>setUserData(e)} webState={(e)=>webState(e)}/> }
      {showReset && <PassReset  setReset={(e)=>setReset(e)}/>}
    </div>
  );
};

export default Login;
