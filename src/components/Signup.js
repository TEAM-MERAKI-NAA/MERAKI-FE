import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/Signup.css";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";

export const Signup = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const validateForm = () => {
        const { firstName, lastName, email, password, confirmPassword } = formData;

        if (!firstName || !lastName || !email || !password || !confirmPassword) {
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

        if (password !== confirmPassword) {
            setError("Passwords do not match.");
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
            const formDataToSend = new FormData();
            formDataToSend.append("first_name", formData.firstName);
            formDataToSend.append("last_name", formData.lastName);
            formDataToSend.append("email", formData.email);
            formDataToSend.append("password", formData.password);

            console.log("Sending Form Data:", Object.fromEntries(formDataToSend));

            const response = await axios.post(
                "http://4.206.179.192:8000/auth/api/register/",
                formDataToSend,
                {
                    headers: { "Content-Type": "multipart/form-data" },
                }
            );

            console.log("Response:", response.data);

            if (response.status === 201) {
                setSuccess("User registered successfully! Redirecting to login...");
                setTimeout(() => navigate("/login"), 2000);
            } else {
                setError("Registration failed. Please try again.");
            }
        } catch (error) {
            console.error("Error Response:", error.response?.data);
            setError(
                error.response?.data?.message ||
                error.response?.data?.error ||
                "Something went wrong. Please try again."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container">
            <div className="signup-card">
                <h2 className="signup-title">Sign Up</h2>

                {error && <div className="error-message">{error}</div>}
                {success && <div className="success-message">{success}</div>}

                <form className="form-container" onSubmit={handleSubmit}>
                    <div className="inputs">
                        <div className="row">
                            <div className="input">
                                <FaUser className="icon" />
                                <input
                                    type="text"
                                    name="firstName"
                                    placeholder="First Name"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="input">
                                <FaUser className="icon" />
                                <input
                                    type="text"
                                    name="lastName"
                                    placeholder="Last Name"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>

                        <div className="input full-width">
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

                        <div className="password-container">
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
                            <div className="input">
                                <FaLock className="icon" />
                                <input
                                    type="password"
                                    name="confirmPassword"
                                    placeholder="Confirm Password"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>

                        <button className="submit" type="submit" disabled={loading}>
                            {loading ? "Signing Up..." : "Sign Up"}
                        </button>
                    </div>
                </form>

                <div className="back-to-login-container">
                    <a href="/login" className="back-to-login">Already have an account? Log in</a>
                </div>
            </div>
        </div>
    );
};

export default Signup;
