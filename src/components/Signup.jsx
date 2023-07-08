import React from 'react';
import './Signup.css'
import { Link, useNavigate } from 'react-router-dom';

export default function SignUp() {

    const navigate = useNavigate();

    function handleLogOff(){
        navigate("/subscription")
    }

    return(
        <div id='eSignPage'>
            <div id='eSignDiv'>
                <div className='eSign' id='eSign1'></div>
                <div className='eSign' id='eSign2'>
                    <h1 >Sign Up</h1>
                    <h4 id='eSignH3'>Create an account to get started...</h4>
                    <form action="submit" id='eSignForm'>
                        <input className='eInput' type="text" placeholder='User Name' required/>
                        <input className='eInput' type="email" placeholder='Email' required/>
                        <input className='eInput' type="password" placeholder='Password' required/>
                        <input className='eInput' type="password" placeholder='Confirm Password' required/>
                        <input className='eInput' id='eSignBtn' type="submit" value="Sign Up" onClick={handleLogOff}/>
                        <p id='eSignTxt'>A journey to financial Freedom</p>
                    </form>
                </div>
            </div>
        </div>
    )
}                                                                                               