import React from 'react';
import "../styles/Signup.css";
import { FaEnvelope } from "react-icons/fa"; // Only need email icon
import { Link } from "react-router-dom";

export const ForgotPassword = () => {
    return (
        <div className='container'>

            <div className="header">
                <div className="text">Forgot Password</div>
                <div className="underline"></div>
            </div>

            <div className="inputs">
                <div className="input">
                    <FaEnvelope className="icon" />
                    <input type="email" placeholder='Enter your email' />
                </div>
            </div>

            <div className="submit-container">
                <button className="submit">Reset Password</button>
            </div>

            <div className="back-to-login-container">
                <Link to="/login" className="back-to-login">Back to Login</Link>
            </div>

        </div>
    );
};

export default ForgotPassword;
