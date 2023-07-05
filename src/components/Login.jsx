import React, { useState } from 'react';
import Signup from './Signup';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [redirectToSignup, setRedirectToSignup] = useState(false);

  const isLoggedIn = false; // Set this to true if user is already logged in

  const handleSubmit = (event) => {
    event.preventDefault();

    // Check if user is already logged in
    if (isLoggedIn) {
      setMessage('You are already logged in.');
      return;
    }

    // Send the data to the backend
    const data = {
      email,
      password,
    };

    // Make an API request to send the data to the backend
    // Example using fetch:
    fetch('https://pockets.onrender.com/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((result) => {
        // Handle the response from the backend
        if (result.success) {
          setMessage('Congratulations! Login successful.');
        } else {
          setMessage(result.message);
        }
      })
      .catch((error) => {
        // Handle any errors
        console.error(error);
        setMessage('An error occurred. Please try again.');
      });
  };

  return (
    <div id='gLogPage'>
      <div id='gSignDiv'>
        <div className='gLog' id='gLog1'></div>
        <div className='gLog' id='gLog2'>
          <h2>Log in to Pockets</h2>
          {isLoggedIn ? (
            <p>You are already logged in.</p>
          ) : redirectToSignup ? (
            <Signup />
          ) : (
            <>
              {message && <p>{message}</p>}
              <form onSubmit={handleSubmit}>
                <div>
                  <input
                    className='gInput'
                    type="email"
                    placeholder="Email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <input
                    className='gInput'
                    type="text"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <button type="submit">Log In</button>
              </form>
              <p id='gLogInTxt2'>
                <button type="button" onClick={() => setRedirectToSignup(true)}>
                  Sign up for Facebook
                </button>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
