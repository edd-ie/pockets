import React from 'react';
import './PassReset.css';


export default function PassReset({setReset}) {
    
    function passRest(e){
        e.preventDefault();
        
        const form = e.target;
        let mail = form[0].value
        let pass = form[1].value

        let dataset = {
            email: mail,
            password: pass
        }
        
        fetch("https://pockets.onrender.com/changePass",{
            method: 'PATCH',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(dataset)
        })

        form.reset()
        setReset(false)
    }
    


    return(
        <div className="ePassResetMain">
            <div className="ePassResetContainer">
                <div className="ePassResetheader">
                    <h2>Password reset</h2>
                </div>
                <div className="ePassResetBody">
                    <form action="submit" id="ePassResetForm" onSubmit={passRest}>
                        <input type="email" placeholder="Email" />
                        <input type="password" placeholder="New Password" />
                        <button type="submit">Reset</button>
                    </form>
                </div>
            </div>
        </div>
    )
}