import React from 'react'
import "../styles/Signup.css";
import { Link } from "react-router-dom";
import { FaEnvelope, FaLock } from "react-icons/fa";

export const Login = () => {

    return (
        <div className='container'>

            <div className="header">
                <div className="text">Login</div>
                <div className="underline"></div>
            </div>
            <div className="inputs">
                <div className="input">
                    <FaEnvelope className="icon" />
                    <input type="email" placeholder='Email' />
                </div>
                <div className="input">
                    <FaLock className="icon" />
                    <input type="password" placeholder='Enter Password' />
                </div>
            </div>
            <div className="forgot-password">
                <a href="/forgot-password">Forgot Password</a>
            </div>
            <div className="submit-container">
                    <button className="submit">Login</button>
            </div>
        </div>
    )
}
export default Login;
