import React, { useState } from "react";
import "../styles/Profile.css";
import "../styles/Dashboard.css";
import Sidebar from "./Sidebar"; 

const Profile = () => {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        firstName: "John",
        lastName: "Doe",    
        address: "",
        city: "",
        country: "",
        postalCode: "",
        aboutMe: ""
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Updated Profile Data:", formData);
        alert("Profile updated successfully!");
    };

    return (
        <div className="profile-container">
            <Sidebar /> {/* Sidebar Component */}
            <main className="profile-main">
                <h1>User Profile</h1>
                <div className="profile-card">
                    <div className="profile-header">
                        <h2>Edit Profile</h2>
                        <p>Complete your profile</p>
                    </div>
                    <form className="profile-form" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>Company (disabled)</label>
                            <input type="text" value="Company Name" disabled />
                        </div>
                        <div className="form-group">
                            <label>Username</label>
                            <input type="text" name="username" value={formData.username} onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label>Email address</label>
                            <input type="email" name="email" value={formData.email} onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label>First Name</label>
                            <input type="text" name="firstName" value={formData.firstName} readOnly />
                        </div>
                        <div className="form-group">
                            <label>Last Name</label>
                            <input type="text" name="lastName" value={formData.lastName} readOnly />
                        </div>
                        {/* <div className="form-group">
                            <label>Address</label>
                            <input type="text" name="address" value={formData.address} onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label>City</label>
                            <input type="text" name="city" value={formData.city} onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label>Country</label>
                            <input type="text" name="country" value={formData.country} onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label>Postal Code</label>
                            <input type="text" name="postalCode" value={formData.postalCode} onChange={handleChange} />
                        </div> */}
                        <div className="form-group full-width">
                            <label>About Me</label>
                            <textarea name="aboutMe" value={formData.aboutMe} onChange={handleChange}></textarea>
                        </div>
                        <button type="submit" className="update-btn">UPDATE PROFILE</button>
                    </form>
                </div>
            </main>
        </div>
    );
};

export default Profile;
