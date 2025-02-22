import React, { useState, useEffect } from "react";
import { FaPlus, FaUserCircle } from "react-icons/fa";
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

export default CommunityPage;
