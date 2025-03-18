import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/Signup.css";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";

export const Signup = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
    });

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const validateForm = () => {
        const { username, email, password } = formData;

        if (!username || !email || !password) {
            setError("All fields are required.");
            return false;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setError("Invalid email format.");
            return false;
        }

        if (password.length < 6) {
            setError("Password must be at least 6 characters.");
            return false;
        }

        setError(""); 
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        setLoading(true);
        setError("");
        setSuccess("");

        try {
            // Convert formData object into FormData (for multipart/form-data)
            const formDataToSend = new FormData();
            formDataToSend.append("username", formData.username);
            formDataToSend.append("email", formData.email);
            formDataToSend.append("password", formData.password);

            console.log("Sending Form Data:", Object.fromEntries(formDataToSend)); // Debugging

            const response = await axios.post(
                "http://4.206.179.192:8000/auth/api/register/",
                formDataToSend,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            console.log("Response:", response.data);

            if (response.status === 201) {
                setSuccess("User registered successfully! Redirecting to login...");
                
                // Redirect to Login page after 2 seconds
                setTimeout(() => navigate("/login"), 2000);
            } else {
                setError("Registration failed. Please try again.");
            }
        } catch (error) {
            console.error("Error Response:", error.response?.data);
            setError(
                error.response?.data?.message ||
                error.response?.data?.error ||
                JSON.stringify(error.response?.data) ||
                "Something went wrong. Please try again."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container">
            <div className="header">
                <div className="text">Sign Up</div>
                <div className="underline"></div>
            </div>

            {error && <div className="error-message">{error}</div>}
            {success && <div className="success-message">{success}</div>}

            <form className="inputs" onSubmit={handleSubmit}>
                <div className="input">
                    <FaUser className="icon" />
                    <input 
                        type="text" 
                        name="username" 
                        placeholder="Username" 
                        value={formData.username} 
                        onChange={handleChange} 
                        required 
                    />
                </div>
                <div className="input">
                    <FaEnvelope className="icon" />
                    <input 
                        type="email" 
                        name="email" 
                        placeholder="Email" 
                        value={formData.email} 
                        onChange={handleChange} 
                        required 
                    />
                </div>
                <div className="input">
                    <FaLock className="icon" />
                    <input 
                        type="password" 
                        name="password" 
                        placeholder="Enter Password" 
                        value={formData.password} 
                        onChange={handleChange} 
                        required 
                    />
                </div>
                <div className="submit-container">
                    <button className="submit" type="submit" disabled={loading}>
                        {loading ? "Signing Up..." : "Sign Up"}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Signup;
