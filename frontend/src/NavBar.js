import React from "react";
import "./App.css";
import { Link } from "react-router-dom";
export default function NavBar() {
  return (
    <header>
      <Link to="/" className="logo">
        MyBlog
      </Link>
      <nav>
        <Link to="/Login">Login</Link>
        <Link to="/Register">Register</Link>
      </nav>
    </header>
  );
}
