import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Import Axios
import "../styles/Signup.css";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";

export const Signup = () => {
    const navigate = useNavigate();

    // State for form inputs
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
    });

    const [error, setError] = useState(""); // Handle errors
    const [loading, setLoading] = useState(false); // Loading state

    // Handle input change
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Form validation before sending API request
    const validateForm = () => {
        const { username, email, password } = formData;

        if (!username || !email || !password) {
            setError("All fields are required.");
            return false;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setError("Invalid email format.");
            return false;
        }

        // Password length check
        if (password.length < 6) {
            setError("Password must be at least 6 characters.");
            return false;
        }

        setError(""); // Clear errors if all checks pass
        return true;
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;
        console.log(formData)
        setLoading(true); // Start loading
        try {
            const response = await axios.post("http://4.206.179.192:8000/auth/api/register/", formData, {
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (response.status === 201) {
                console.log("User registered successfully:", response.data);
                navigate("/dashboard"); // Redirect to dashboard on success
            } else {
                setError("Registration failed. Please try again.");
            }
        } catch (error) {
            setError(error.response?.data?.message || "Something went wrong. Please try again later.");
        } finally {
            setLoading(false); // Stop loading
        }
    };

    return (
        <div className="container">
            <div className="header">
                <div className="text">Sign Up</div>
                <div className="underline"></div>
            </div>

            {error && <div className="error-message">{error}</div>} {/* Show errors */}

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
