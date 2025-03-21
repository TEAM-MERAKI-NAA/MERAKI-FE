import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/Forgot-password.css";
import { FaEnvelope, FaKey, FaLock } from "react-icons/fa";
import { Link } from "react-router-dom";

export const ForgotPassword = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");  // Store email persistently
    const [otp, setOtp] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [showResetFields, setShowResetFields] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    // Handle input changes
    const handleEmailChange = (e) => setEmail(e.target.value);
    const handleOtpChange = (e) => setOtp(e.target.value);
    const handleNewPasswordChange = (e) => setNewPassword(e.target.value);

    // Email validation function
    const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    // Function to send OTP
    const handleSendOtp = async () => {
        if (!email || !isValidEmail(email)) {
            setError("Please enter a valid email address.");
            return;
        }

        try {
            const response = await axios.post(
                "http://4.206.179.192:8000/auth/api/forgot-password/",
                { email }, // Send email to the API
                { headers: { "Content-Type": "application/json" } }
            );

            console.log("✅ OTP Sent:", response.data);
            setSuccess("OTP sent successfully. Check your email!");
            setShowResetFields(true);  // Show OTP & password fields
            setError(""); // Clear previous errors
        } catch (error) {
            console.error("❌ Error Sending OTP:", error.response?.data);
            setError(error.response?.data?.message || "Failed to send OTP.");
        }
    };

    // Function to reset password
    const handleResetPassword = async () => {
        if (!email || !otp || !newPassword) {
            setError("All fields (Email, OTP, and New Password) are required.");
            return;
        }

        try {

            const response = await axios.post(
                "http://4.206.179.192:8000/auth/api/reset-password/",
                { email, otp, password: newPassword }, // Ensure email is included
                { headers: { "Content-Type": "application/json" } }
            );

            setSuccess("Password reset successful! Redirecting to login...");
            setTimeout(() => navigate("/login"), 3000);
            setError("");
        } catch (error) {
            setError(
                error.response?.data?.message ||
                error.response?.data?.error ||
                "Error resetting password."
            );
        }
    };

    return (
        <div className="forgot-password-container">
            <h2 className="forgot-password-title">Forgot Password</h2>

            {/* Display messages */}
            {error && <div className="error-message">{error}</div>}
            {success && <div className="success-message">{success}</div>}

            {/* Step 1: Enter Email & Send OTP */}
            {!showResetFields ? (
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
                    <button className="send-otp-btn forgot" onClick={handleSendOtp}>
                        Send OTP
                    </button>
                </div>
            ) : (
                // Step 2: Enter OTP & New Password
                <div>
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
                    </div>
                    <div className="input-container">
                        <div className="input forgot">
                            <FaLock className="icon" />
                            <input
                                type="password"
                                placeholder="Enter New Password"
                                value={newPassword}
                                onChange={handleNewPasswordChange}
                                required
                            />
                        </div>
                    </div>
                    <button className="confirm-btn forgot" onClick={handleResetPassword}>
                        Reset Password
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
