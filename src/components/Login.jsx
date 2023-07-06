import React, { useState } from 'react';
import './Login.css';
import { Link,useNavigate } from "react-router-dom";


const Login = () => {
  const [userData, setUserData] = useState([])
  const [loggedIn, setLoggedIn] = useState(false)
  
  const navigate = useNavigate();

  function handleLogin(e) {
    e.preventDefault();
    let form = e.target;
    let mail = e.target.elements[0].value;
    let pass = e.target.elements[1].value;

    fetch("https://pockets.onrender.com//login",{
      method: "POST",
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({"email": mail, "password": pass})
    }).then(res=>res.json())
    .then(data=>{setUserData(data);
      setLoggedIn(true);
      data ? navigate("/") :0
      console.log('User:', data)})
    form.reset()
  }

  return (
    <div id='gloginHome'>
      <div id='gLogPage'>
        <div id='gSignDiv'>
          <div className='gLog' id='gLog1'></div>
          <div className='gLog' id='gLog2'>
            <h2>Log in to Pockets</h2>
            {loggedIn ? (
              <p>You are already logged in.</p>
            ) :  
            (
              <>
                {/* {message && <p>{message}</p>} */}
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
                <Link to="/Signup">
                  Sign up to Pockets
                </Link>
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
