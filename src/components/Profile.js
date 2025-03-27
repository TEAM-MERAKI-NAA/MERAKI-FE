// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import "../styles/Profile.css";
// import "../styles/Dashboard.css";
// import Sidebar from "./Sidebar"; 

// const Profile = () => {
//     const [formData, setFormData] = useState({
//         username: "",
//         email: "",
//         firstName: "",
//         lastName: "",    
//         address: "",
//         city: "",
//         country: "",
//         postalCode: "",
//         aboutMe: "",
//         gender: "",
//     });

//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState("");

//     useEffect(() => {
//         const fetchUserProfile = async () => {
//             const accessToken = localStorage.getItem("accessToken"); // Retrieve token

//             if (!accessToken) {
//                 setError("Unauthorized! Please log in again.");
//                 setLoading(false);
//                 return;
//             }

//             try {
//                 const response = await axios.get("http://4.206.179.192:8000/profile/api/profile/", {
//                     headers: { Authorization: `Bearer ${accessToken}` },
//                 });

//                 console.log("Fetched Profile Data:", response.data);

//                 setFormData({
//                     username: response.data.username || "",
//                     email: response.data.email || "",
//                     firstName: response.data.first_name || "",
//                     lastName: response.data.last_name || "",
//                     address: response.data.address || "",
//                     city: response.data.city || "",
//                     country: response.data.country || "",
//                     postalCode: response.data.postal_code || "",
//                     aboutMe: response.data.about_me || "",
//                     gender: response.data.gender || "", 
//                 });
//             } catch (error) {
//                 console.error("Error fetching profile:", error);
//                 setError("Error loading profile. Please try again later.");
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchUserProfile();
//     }, []);

//     const handleChange = (e) => {
//         setFormData({ ...formData, [e.target.name]: e.target.value });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         try {
//             const accessToken = localStorage.getItem("accessToken"); // Retrieve token
//             if (!accessToken) {
//                 setError("Unauthorized! Please log in again.");
//                 return;
//             }

//             const response = await axios.put(
//                 "http://4.206.179.192:8000/auth/api/profile/",
//                 {
//                     username: formData.username,
//                     address: formData.address,
//                     city: formData.city,
//                     country: formData.country,
//                     postal_code: formData.postalCode,
//                     about_me: formData.aboutMe,
//                     gender: formData.gender,
//                 },
//                 { headers: { Authorization: `Bearer ${accessToken}` } }
//             );

//             console.log("Profile Updated Successfully:", response.data);
//             alert("Profile updated successfully!");
//         } catch (error) {
//             console.error("Error updating profile:", error);
//             setError("Error updating profile. Please try again.");
//         }
//     };

//     return (
//         <div className="profile-container">
//             <Sidebar /> {/* Sidebar Component */}
//             <main className="profile-main">
//                 <h1>User Profile</h1>

//                 {loading ? <p>Loading profile...</p> : null}
//                 {error ? <p className="error-message">{error}</p> : null}

//                 <div className="profile-card">
//                     <div className="profile-header">
//                         <h2>Edit Profile</h2>
//                     </div>
//                     <form className="profile-form" onSubmit={handleSubmit}>
//                         {/* <div className="form-group">
//                             <label>Username</label>
//                             <input type="text" name="username" value={formData.username} readOnly />
//                         </div> */}
//                         <div className="form-group">
//                             <label>Email address</label>
//                             <input type="email" name="email" value={formData.email} readOnly />
//                         </div>
//                         <div className="form-group">
//                             <label>First Name</label>
//                             <input type="text" name="firstName" value={formData.firstName} readOnly />
//                         </div>
//                         <div className="form-group">
//                             <label>Last Name</label>
//                             <input type="text" name="lastName" value={formData.lastName} readOnly />
//                         </div>
//                         <div className="form-group">
//                             <label>Contact No. (optional)</label>
//                             <input type="text" name="address" value={formData.address} onChange={handleChange} />
//                         </div>

//                         {/* Gender Field as a Simple Input */}
//                         <div className="form-group">
//                             <label>Gender</label>
//                             <input type="text" name="gender" value={formData.gender} onChange={handleChange} />
//                         </div>

//                         <div className="form-group">
//                             <label>City</label>
//                             <input type="text" name="city" value={formData.city} onChange={handleChange} />
//                         </div>
//                         <div className="form-group">
//                             <label>Nationality</label>
//                             <input type="text" name="country" value={formData.country} onChange={handleChange} />
//                         </div>
//                         <div className="form-group">
//                             <label>Province</label>
//                             <input type="text" name="postalCode" value={formData.postalCode} onChange={handleChange} />
//                         </div>
//                         <div className="form-group full-width">
//                             <label>About Me</label>
//                             <textarea name="aboutMe" value={formData.aboutMe} onChange={handleChange}></textarea>
//                         </div>
//                         <button type="submit" className="update-btn">UPDATE PROFILE</button>
//                     </form>
//                 </div>
//             </main>
//         </div>
//     );
// };

// export default Profile;

import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/Profile.css";
import "../styles/Dashboard.css";
import Sidebar from "./Sidebar";

const Profile = () => {
    const [formData, setFormData] = useState({
        id: null,
        email: "",
        firstName: "",
        lastName: "",
        address: "",
        city: "",
        country: "",
        postalCode: "",
        aboutMe: "",
        gender: "",
    });

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const fetchUserProfile = async (accessToken) => {
        try {
            const response = await axios.get("http://4.206.179.192:8000/profile/api/profile/", {
                headers: { Authorization: `Bearer ${accessToken}` },
            });

            console.log("Fetched Profile Data:", response.data);

            setFormData({
                id: response.data.id || null,
                email: response.data.email || "",
                firstName: response.data.first_name || "",
                lastName: response.data.last_name || "",
                address: response.data.address || "",
                city: response.data.city || "",
                country: response.data.country || "",
                postalCode: response.data.postal_code || "",
                aboutMe: response.data.about_me || "",
                gender: response.data.gender || "",
            });
        } catch (error) {
            console.error("Error fetching profile:", error);
            setError("Error loading profile. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    const verifyAndFetch = async () => {
        let accessToken = localStorage.getItem("accessToken");
        const refreshToken = localStorage.getItem("refreshToken");

        if (!accessToken && refreshToken) {
            try {
                const response = await axios.post(
                    "http://4.206.179.192:8000/auth/api/token/refresh/",
                    { refresh: refreshToken }
                );
                accessToken = response.data.access;
                localStorage.setItem("accessToken", accessToken);
            } catch (err) {
                console.error("Token refresh failed", err);
                setError("Session expired. Please log in again.");
                setLoading(false);
                return;
            }
        }

        if (accessToken) {
            await fetchUserProfile(accessToken);
        } else {
            setError("Unauthorized! Please log in again.");
            setLoading(false);
        }
    };

    useEffect(() => {
        verifyAndFetch();
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const accessToken = localStorage.getItem("accessToken");
            if (!accessToken) {
                setError("Unauthorized! Please log in again.");
                return;
            }

            const response = await axios.put(
                `http://4.206.179.192:8000/profile/api/profile/${formData.id}/`,
                {
                    address: formData.address,
                    city: formData.city,
                    country: formData.country,
                    postal_code: formData.postalCode,
                    about_me: formData.aboutMe,
                    gender: formData.gender,
                },
                { headers: { Authorization: `Bearer ${accessToken}` } }
            );

            console.log("Profile Updated Successfully:", response.data);
            alert("Profile updated successfully!");
        } catch (error) {
            console.error("Error updating profile:", error);
            setError("Error updating profile. Please try again.");
        }
    };

    return (
        <div className="profile-container">
            <Sidebar />
            <main className="profile-main">
                <h1>User Profile</h1>

                {loading ? <p>Loading profile...</p> : null}
                {error ? <p className="error-message">{error}</p> : null}

                <div className="profile-card">
                    <div className="profile-header">
                        <h2>Edit Profile</h2>
                    </div>
                    <form className="profile-form" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>Email address</label>
                            <input type="email" name="email" value={formData.email} readOnly />
                        </div>
                        <div className="form-group">
                            <label>First Name</label>
                            <input type="text" name="firstName" value={formData.firstName} readOnly />
                        </div>
                        <div className="form-group">
                            <label>Last Name</label>
                            <input type="text" name="lastName" value={formData.lastName} readOnly />
                        </div>
                        <div className="form-group">
                            <label>Contact No. (optional)</label>
                            <input type="text" name="address" value={formData.address} onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label>Gender</label>
                            <input type="text" name="gender" value={formData.gender} onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label>City</label>
                            <input type="text" name="city" value={formData.city} onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label>Nationality</label>
                            <input type="text" name="country" value={formData.country} onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label>Province</label>
                            <input type="text" name="postalCode" value={formData.postalCode} onChange={handleChange} />
                        </div>
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
