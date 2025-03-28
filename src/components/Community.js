import React, { useState } from "react";
import "../styles/Community.css";
import Sidebar from "./Sidebar";

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

export default function CommunityPage() {
  return (
    <div className="community-page">
      <div className="main-content">
        <Sidebar />
        <Community />
      </div>
    </div>
  );
}
