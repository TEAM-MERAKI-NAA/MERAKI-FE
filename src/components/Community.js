import React, { useState } from "react";
import "../styles/Community.css";

const Community = () => {
  const [posts, setPosts] = useState([
    {
      id: 1,
      title: "Help in Updating SIn",
      content:
        "Hello, I am jhon and i need help updating my Sin Number. But i dont know how to can anyone help.",
      author: "John Doe",
      date: "Feb 7, 2025",
      comments: [],
    },
    {
      id: 2,
      title: "Important document to remmebr while applying study permit",
      content:
        "Hey gys, this is jane. please remember to attach your identity while applying for study or work permit. ",
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
            <button onClick={() => setSelectedPost(post.id)}>Comment</button>
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

export default Community;
