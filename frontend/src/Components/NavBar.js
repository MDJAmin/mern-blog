import React from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../android-chrome-192x192.png";
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
      <div className="pages">
        <Link to="/">
          <img id="logo" src={logo} alt="logo"></img>
        </Link>
        <Link to="/Introduction-Page" className="logo">
            MyBlog
          </Link>
      </div>
      <div className="login-register">
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
      </div>
    </header>
  );
}
