import React from 'react'
import "../styles/Signup.css";
import { Link } from "react-router-dom";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";


export const Signup = () => {
    return (
        <div className='container'>

            <div className="header">
                <div className="text">Sign Up</div>
                <div className="underline"></div>
            </div>
            <div className="inputs">
                <div className="input">
                    <FaUser className="icon" />
                    <input type="text" placeholder='Name' />
                </div>
                <div className="input">
                    <FaEnvelope className="icon" />
                    <input type="email" placeholder='Email' />
                </div>
                <div className="input">
                    <FaLock className="icon" />
                    <input type="password" placeholder='Enter Password' />
                </div>
            </div>
            <div className="submit-container">
                    <button className="submit">Sign Up</button>
            </div>

        </div>
    )
}

export default Signup;