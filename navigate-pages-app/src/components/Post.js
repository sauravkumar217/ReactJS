import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const Post = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
        if (!response.ok) throw new Error('Post not found');
        const data = await response.json();
        setPost(data);
        setError(null);
      } catch (err) {
        setError(err.message);
        setPost(null);
      }
    };

    fetchPost();
  }, [id]);

  const handleNextPost = () => {
    const nextId = parseInt(id) + 1;
    navigate(`/post/${nextId}`);
  };

  if (error) return <div className="page-content error">Error: {error}</div>;
  if (!post) return <div className="page-content">Loading...</div>;

  return (
    <div className="page-content">
      <h1>{post.title}</h1>
      <p>{post.body}</p>
      <button onClick={handleNextPost} className="next-button">
        Next Post
      </button>
    </div>
  );
};

export default Post;