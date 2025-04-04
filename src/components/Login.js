import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/Signup.css";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";

export const Login = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false); // 👁️ state to toggle password

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleTogglePassword = () => {
        setShowPassword((prev) => !prev);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        if (!formData.email || !formData.password) {
            setError("Email and password are required.");
            setLoading(false);
            return;
        }

        try {
            const formDataToSend = new FormData();
            formDataToSend.append("email", formData.email);
            formDataToSend.append("password", formData.password);

            const response = await axios.post(
                "http://4.206.179.192:8000/auth/api/login/",
                formDataToSend,
                { headers: { "Content-Type": "multipart/form-data" } }
            );

            if (response.status === 200 && response.data.access && response.data.refresh) {
                localStorage.setItem("accessToken", response.data.access);
                localStorage.setItem("refreshToken", response.data.refresh);
                navigate("/dashboard");
            } else {
                setError("Invalid login credentials. Please try again.");
            }
        } catch (error) {
            if (error.response?.status === 400) {
                setError("Invalid email or password. Please try again.");
            } else if (error.response?.status === 404) {
                setError("User not found. Please register first.");
            } else {
                setError(error.response?.data?.message || "Something went wrong. Please try again.");
            }
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
                        <div className="input login-inputs">
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

                        <div className="input login-inputs password-field">
                            <FaLock className="icon" />
                            <input 
                                type={showPassword ? "text" : "password"} 
                                name="password"
                                placeholder="Enter Password" 
                                value={formData.password} 
                                onChange={handleChange} 
                                required 
                            />
                            <span className="toggle-eye" onClick={handleTogglePassword}>
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </span>
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
