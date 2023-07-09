import React from 'react';
import './Signup.css'

export default function SignUp({webState, user, setUserId}) {


    function handleSignUp(e){
        e.preventDefault();
        let form = e.target;
        let name = e.target.elements[0].value;
        let mail  = e.target.elements[1].value;
        let pass = e.target.elements[2].value;
        let confirmPassword = e.target.elements[3].value;

        let credentials = {
            username: name,
            email: mail,
            password: pass,
            password_confirmation: confirmPassword,
            subscription: "basic"
        }

        fetch("https://pockets.onrender.com/signup", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
        })
        .then((r) => r.json())
        .then(data => {
            console.log("file: Signup.jsx:32 -> handleSignUp -> data:", data);
            webState(true)
            user(data)
            setUserId(data.id)
        })

        form.reset()

    }

    return(
        <div id='eSignPage'>
            <div id='eSignDiv'>
                <div className='eSign' id='eSign1'></div>
                <div className='eSign' id='eSign2'>
                    <h1 >Sign Up</h1>
                    <h4 id='eSignH3'>Create an account to get started...</h4>
                    <form action="submit" id='eSignForm' onSubmit={handleSignUp}>
                        <input className='eInput' type="text" placeholder='User Name' required/>
                        <input className='eInput' type="email" placeholder='Email' required/>
                        <input className='eInput' type="password" placeholder='Password' required/>
                        <input className='eInput' type="password" placeholder='Confirm Password' required/>
                        <input className='eInput' id='eSignBtn' type="submit" value="Sign Up"/>
                        <p id='eSignTxt'>A journey to financial Freedom</p>
                    </form>
                </div>
            </div>
        </div>
    )
}                                                                                               