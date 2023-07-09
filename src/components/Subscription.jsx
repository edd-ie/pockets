import React from "react";
import './Subscription.css'
import { Link } from "react-router-dom";

export default function Subscription({userId, setUserData}) {

    function handleSub(e){
        fetch(`https://pockets.onrender.com/users/${userId}`,{
            method: "PUT",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({subscription: e})
        })
        .then(res => res.json())
        .then(data => {console.log(data)
            setUserData(data)
        })
    
    }


    return (
        <div id="eSub">
            <div id="eBasic">
                <div className="eTopSub">
                    <h1 className="eHeadSub">BASIC</h1>
                </div>
                <div className="eMiddleSub">
                    <h3 className="eSubText">Features</h3>
                    <ul className="eListSub">
                        <li>Access to site</li>
                        <li>Limited cards (2)</li>
                        <li>Limited sim cards (2)</li>
                        <li>Limited saving tracking</li>
                        <li>Basic data analysis</li>
                    </ul>
                </div>
                <div className="eBottomSub" onClick={()=>handleSub("Basic")}>
                    <Link className="eLink" to='/'>
                        <div className="eButtonSub">
                            Select
                        </div>
                    </Link>
                </div>
            </div>

            <div id="ePremium">
                <div className="eTopSub">
                    <h1 className="eHeadSub">PRO</h1>
                </div>
                <div className="eMiddleSub">
                    <h3 className="eSubText">Features</h3>
                    <ul className="eListSub">
                        <li>Access to full site</li>
                        <li>Unlimited cards</li>
                        <li>Unlimited sim cards</li>
                        <li>Unlimited saving tracking</li>
                        <li>Advanced data analysis</li>
                    </ul>
                </div>
                <div className="eBottomSub" onClick={()=>handleSub("Premium")}>
                    <Link className="eLink" to='/'>
                        <div className="eButtonSub">
                            Select
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
}