import React, { useEffect, useState } from "react";

export default function HomePage() {
  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    try {
      const response = await fetch("http://localhost:4000/posts");
      const data = await response.json();
      setPosts(data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

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
            <p className="date-time">{new Date(post.createdAt).toLocaleString()}</p>
            <p className="summary">{post.summary}</p>
            <hr/>
          </div>  
        ))
      ) : (
        <p>No posts available</p>
      )}
    </div>
  );
}
