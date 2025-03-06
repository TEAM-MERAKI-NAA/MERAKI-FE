import React, { useState, useEffect } from "react";
import "../styles/Community.css";
import "../styles/Homepage.css";

function Navbar() {
  const [isSticky, setSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setSticky(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav id="main-navbar" className={isSticky ? "sticky" : ""}>
      <div id="navbar-logo">Immigration Hub</div>
      <ul id="navbar-links">
        <li>
          <a href="/Homepage">Home</a>
        </li>
        <li>
          <a href="/AboutUs">About</a>
        </li>
        <li>
          <a href="/Homepage">Features</a>
        </li>
        <li>
          <a href="/Homepage">Contact</a>
        </li>
      </ul>
    </nav>
  );
}

const Community = () => {
  const [posts, setPosts] = useState([
    {
      id: 1,
      title: "Help in Updating SIN",
      content:
        "Hello, I am John and I need help updating my SIN Number. Can anyone help?",
      author: "John Doe",
      date: "Feb 7, 2025",
      comments: [],
    },
    {
      id: 2,
      title: "Important Documents for Study Permit",
      content:
        "Hey guys, this is Jane. Remember to attach your identity while applying for a study or work permit.",
      author: "Jane Smith",
      date: "Feb 6, 2025",
      comments: [],
    },
  ]);

  const [newComment, setNewComment] = useState("");
  const [selectedPost, setSelectedPost] = useState(null);
  const [newPost, setNewPost] = useState({ title: "", content: "", image: "" });

  const addComment = (postId) => {
    if (!newComment) return;
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId
          ? { ...post, comments: [...post.comments, newComment] }
          : post
      )
    );
    setNewComment("");
  };

  const addPost = () => {
    if (!newPost.title || !newPost.content) return;
    setPosts([{ id: Date.now(), ...newPost, comments: [] }, ...posts]);
    setNewPost({ title: "", content: "", image: "" });
  };

  return (
    <div className="community-container">
      <h1>Community Posts</h1>

      {/* New Post Section */}
      <div className="new-post-section">
        <input
          type="text"
          placeholder="Post Title"
          value={newPost.title}
          onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
        />
        <textarea
          placeholder="Write something..."
          value={newPost.content}
          onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
        ></textarea>
        <input
          type="file"
          accept="image/*"
          onChange={(e) =>
            setNewPost({
              ...newPost,
              image: URL.createObjectURL(e.target.files[0]),
            })
          }
        />
        <button onClick={addPost}>Post</button>
      </div>

      {/* Post List */}
      <div className="post-list">
        {posts.map((post) => (
          <div key={post.id} className="post-card">
            {post.image && (
              <img src={post.image} alt="Post" className="post-image" />
            )}
            <h2>{post.title}</h2>
            <p>{post.content}</p>
            <small>
              By {post.author || "Anonymous"} | {post.date || "Just now"}
            </small>
            <button
              className="comment-btn"
              onClick={() => setSelectedPost(post.id)}
            >
              Comment
            </button>

            {selectedPost === post.id && (
              <div className="comment-section">
                <input
                  type="text"
                  placeholder="Write a comment..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                />
                <button onClick={() => addComment(post.id)}>Post</button>
                <ul>
                  {post.comments.map((comment, index) => (
                    <li key={index}>{comment}</li>
                  ))}
                </ul>
              </div>
            )}
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
              <a href="Homepage">Home</a>
            </li>
            <li>
              <a href="AboutUs">About</a>
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
              <i className="fab fa-facebook"></i>
            </a>
            <a href="#">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#">
              <i className="fab fa-linkedin"></i>
            </a>
            <a href="#">
              <i className="fab fa-instagram"></i>
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

export default function CommunityPage() {
  return (
    <div>
      <Navbar />
      <Community />
      <Footer />
    </div>
  );
}
