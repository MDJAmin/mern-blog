import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function NavBar() {
  const navigate = useNavigate();

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    navigate("/login");
  };

  const isLoggedIn = !!localStorage.getItem("token");

  return (
    <header>
      <Link to="/" className="logo">
        MyBlog
      </Link>
      <nav>
        {isLoggedIn ? (
          <>
            <Link to="/create-post">Create Post</Link>
            <Link to="/" onClick={handleLogout}>
              Logout
            </Link>
          </>
        ) : (
          <>
            <Link to="/Login">Login</Link>
            <Link to="/Register">Register</Link>
          </>
        )}
      </nav>
    </header>
  );
}
