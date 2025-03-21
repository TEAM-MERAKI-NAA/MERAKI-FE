import React, { useState } from "react";
import "../styles/Forgot-password.css"; // Separate CSS file
import { FaEnvelope, FaKey } from "react-icons/fa";
import { Link } from "react-router-dom";

export const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [showOtpField, setShowOtpField] = useState(false);
    const [error, setError] = useState("");

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
        setError(""); // Clear error when user starts typing
    };

    const handleOtpChange = (e) => {
        setOtp(e.target.value);
    };

    // Email validation function
    const isValidEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleResetPassword = () => {
        if (!email) {
            setError("Please enter your email.");
            return;
        }

        if (!isValidEmail(email)) {
            setError("Invalid email format. Please enter a valid email.");
            return;
        }

        // If email is valid, proceed with OTP request
        console.log("Sending OTP to:", email);
        setShowOtpField(true);
    };

    const handleConfirmOtp = () => {
        if (!otp) {
            alert("Please enter the OTP.");
            return;
        }

        console.log("Verifying OTP:", otp);
        alert("OTP Verified! You can now reset your password.");
    };

    return (
        <div className="forgot-password-container">
            <h2 className="forgot-password-title">Forgot Password</h2>

            {/* Error Message Display */}
            {error && <div className="error-message">{error}</div>}

            {/* Email Input with Send OTP Button */}
            <div className="input-container">
                <div className="input forgot">
                    <FaEnvelope className="icon" />
                    <input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={handleEmailChange}
                        required
                    />
                </div>
                <button className="send-otp-btn forgot" onClick={handleResetPassword}>
                    Send OTP
                </button>
            </div>

            {/* OTP Field (Visible after clicking Send OTP) */}
            {showOtpField && (
                <div className="input-container">
                    <div className="input forgot">
                        <FaKey className="icon" />
                        <input 
                            type="text"
                            placeholder="Enter OTP"
                            value={otp}
                            onChange={handleOtpChange}
                            required
                        />
                    </div>
                    <button className="confirm-btn forgot" onClick={handleConfirmOtp}>
                        Confirm
                    </button>
                </div>
            )}

            {/* Back to Login Link */}
            <div className="back-to-login-container">
                <Link to="/login" className="back-to-login">
                    Back to Login
                </Link>
            </div>
        </div>
    );
};

export default ForgotPassword;
