import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/Signup.css"; // Using the same stylesheet as signup
import { Link } from "react-router-dom";
import { FaUser, FaLock } from "react-icons/fa";

export const Login = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        if (!formData.username || !formData.password) {
            setError("Username and password are required.");
            setLoading(false);
            return;
        }

        try {
            const formDataToSend = new FormData();
            formDataToSend.append("username", formData.username);
            formDataToSend.append("password", formData.password);

            console.log("Sending Login Data:");
            for (let pair of formDataToSend.entries()) {
                console.log(pair[0] + ": " + pair[1]);
            }

            const response = await axios.post(
                "http://4.206.179.192:8000/auth/api/login/",
                formDataToSend,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            console.log("Response:", response.data);

            if (response.status === 200 && response.data.access) {
                const token = response.data.access;
                localStorage.setItem("authToken", token);
                navigate("/dashboard");
            } else {
                setError("Invalid login credentials. Please try again.");
            }
        } catch (error) {
            console.error("Error Response:", error.response?.data);
            setError(
                error.response?.data?.message ||
                error.response?.data?.error ||
                "Invalid login. Please check your credentials."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container">
            <div className="login-card">
                <h2 className="login-title">Login</h2>

                {error && <div className="error-message">{error}</div>}

                <form className="form-container" onSubmit={handleSubmit}>
                    <div className="inputs">
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

                        <div className="forgot-password">
                            <Link to="/forgot-password">Forgot Password?</Link>
                        </div>

                        <button className="submit" type="submit" disabled={loading}>
                            {loading ? "Logging in..." : "Login"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
