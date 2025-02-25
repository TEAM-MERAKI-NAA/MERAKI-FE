import React, { useState, useEffect } from "react";
import { FaPlus, FaUserCircle } from "react-icons/fa";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faTwitter,
  faLinkedin,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import "../styles/Community.css";

const CommunityPage = () => {
  const [posts, setPosts] = useState([]);
  const [friendSuggestions, setFriendSuggestions] = useState([]);

  useEffect(() => {
    // Fetch posts (Replace with actual API)
    fetch("/api/posts")
      .then((res) => res.json())
      .then((data) => setPosts(data))
      .catch((err) => console.error("Error fetching posts:", err));

    // Fetch friend suggestions (Replace with actual API)
    fetch("/api/friends")
      .then((res) => res.json())
      .then((data) => setFriendSuggestions(data))
      .catch((err) => console.error("Error fetching friends:", err));
  }, []);

  return (
    <div className="social-feed-container">
      {/* Left Feed Section */}
      <div className="feed-section">
        {/* Search Bar */}
        <div className="search-bar">
          <input type="text" placeholder="Search for friends, groups, pages" />
          <button className="add-post-btn">
            <FaPlus /> Add New Post
          </button>
        </div>

        {/* Stories Section */}
        <div className="stories-section">
          {friendSuggestions.slice(0, 6).map((friend, index) => (
            <div key={index} className="story">
              <FaUserCircle className="story-avatar" />
              <p>{friend.username}</p>
            </div>
          ))}
        </div>

        {/* Posts Section */}
        <div className="posts-section">
          {posts.map((post) => (
            <div key={post.id} className="post">
              {/* Post Header */}
              <div className="post-header">
                <FaUserCircle className="user-avatar" />
                <div>
                  <h4>{post.username}</h4>
                  <p>{post.time}</p>
                </div>
              </div>

              {/* Post Content */}
              <p className="post-content">{post.content}</p>
              {post.image && (
                <img src={post.image} alt="Post" className="post-image" />
              )}

              {/* Post Actions */}
              <div className="post-actions">
                <span>👍 {post.likes}</span>
                <span>💬 {post.comments}</span>
                <span>🔄 {post.shares}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right Sidebar */}
      <div className="sidebar">
        <h3>Friend Suggestions</h3>
        {friendSuggestions.map((friend) => (
          <div key={friend.id} className="friend-suggestion">
            <FaUserCircle className="friend-avatar" />
            <div>
              <p>{friend.username}</p>
              <button className="add-friend-btn">+</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
// Footer Component with Embedded Map
function Footer() {
  return (
    <footer id="main-footer">
      <div className="footer-overlay"></div>
      <div className="footer-content">
        <div className="footer-section">
          <h3>Contact Us</h3>
          <p>Email: info@immigrationhub.com</p>
          <p>Phone: +1 (555) 123-4567</p>
          <p>Address: 123 Immigration St, Toronto, Canada</p>
        </div>
        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul>
            <li>
              <a href="#">Home</a>
            </li>
            <li>
              <a href="#">About</a>
            </li>
            <li>
              <a href="#">Services</a>
            </li>
            <li>
              <a href="#">Contact</a>
            </li>
          </ul>
        </div>
        <div className="footer-section">
          <h3>Stay Connected</h3>
          <p>Follow us on social media for updates.</p>
          <div className="social-icons">
            <a href="#">
              <FontAwesomeIcon icon={faFacebook} />
            </a>
            <a href="#">
              <FontAwesomeIcon icon={faTwitter} />
            </a>
            <a href="#">
              <FontAwesomeIcon icon={faLinkedin} />
            </a>
            <a href="#">
              <FontAwesomeIcon icon={faInstagram} />
            </a>
          </div>
        </div>
        <div className="footer-section map-container">
          <h3>Find Us Here</h3>
          <iframe
            title="Google Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2879.883366256811!2d-79.35346270944989!3d43.796033168663065!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89d4d30025d174a9%3A0x672b651841539a31!2sSeneca%20Newnham%20Campus!5e0!3m2!1sen!2sca!4v1740111432556!5m2!1sen!2sca"
            width="100%"
            height="300"
            style={{ border: "0" }}
            allowFullScreen
            loading="lazy"
          ></iframe>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2025 Team Meraki. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default function Community() {
  return (
    <div>
      <Footer />
    </div>
  );
}
