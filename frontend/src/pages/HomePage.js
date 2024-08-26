import React, { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";

export default function HomePage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:4000/posts");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setPosts(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  if (loading) {
    return (
      <div className="spinner-container">
        <ClipLoader color="#ffffff" loading={loading} size={150} />
      </div>
    );
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="entries">
      {posts.length > 0 ? (
        posts.map((post) => (
          <div key={post._id} className="post">
            {post.cover && (
              <img
                src={`http://localhost:4000/uploads/${post.cover
                  .split("/")
                  .pop()}`}
                alt={post.title}
              />
            )}
            <h2 className="title">{post.title}</h2>
            <p className="date-time">
              {new Date(post.createdAt).toLocaleString()}
            </p>
            <p className="summary">{post.summary}</p>
            <hr />
          </div>
        ))
      ) : (
        <p>No posts available</p>
      )}
    </div>
  );
}
