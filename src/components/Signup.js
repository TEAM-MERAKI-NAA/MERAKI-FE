import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import "../styles/Signup.css";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";

export const Signup = () => {
    const navigate = useNavigate(); // Initialize useNavigate for redirection

    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: ""
    });

    const [errors, setErrors] = useState({
        username: "",
        email: "",
        password: ""
    });

    // Function to handle input change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });

        // Live validation
        validateField(name, value);
    };

    // Function to validate input fields
    const validateField = (name, value) => {
        let errorMessage = "";

        if (name === "username") {
            errorMessage = value.trim() === "" ? "Username is required" : "";
        } else if (name === "email") {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            errorMessage = !emailRegex.test(value) ? "Invalid email address" : "";
        } else if (name === "password") {
            errorMessage = value.length < 6 ? "Password must be at least 6 characters" : "";
        }

        setErrors((prevErrors) => ({ ...prevErrors, [name]: errorMessage }));
    };

    // Function to validate all fields before submission
    const validateForm = () => {
        let isValid = true;
        let newErrors = {};

        Object.keys(formData).forEach((field) => {
            validateField(field, formData[field]);
            if (formData[field].trim() === "") {
                newErrors[field] = "This field is required";
                isValid = false;
            }
        });

        setErrors(newErrors);
        return isValid;
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();

        if (validateForm()) {
            navigate("/dashboard"); // Redirect user to Dashboard after successful sign-up
        }
    };

    return (
        <div className='container'>
            <div className="header">
                <div className="text">Sign Up</div>
                <div className="underline"></div>
            </div>

            <form onSubmit={handleSubmit} className="inputs">
                <div className="input">
                    <FaUser className="icon" />
                    <input
                        type="text"
                        name="username"
                        placeholder="Username"
                        value={formData.username}
                        onChange={handleChange}
                    />
                </div>
                {errors.username && <span className="error-message">{errors.username}</span>}

                <div className="input">
                    <FaEnvelope className="icon" />
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                </div>
                {errors.email && <span className="error-message">{errors.email}</span>}

                <div className="input">
                    <FaLock className="icon" />
                    <input
                        type="password"
                        name="password"
                        placeholder="Enter Password"
                        value={formData.password}
                        onChange={handleChange}
                    />
                </div>
                {errors.password && <span className="error-message">{errors.password}</span>}

                <div className="submit-container">
                    <button type="submit" className="submit">Sign Up</button>
                </div>
            </form>
        </div>
    );
};

export default Signup;
