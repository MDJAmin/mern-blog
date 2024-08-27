import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function RegisterPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=]).{8,}$/;
    return passwordRegex.test(password);
  };

  async function register(e) {
    e.preventDefault();
    setError(""); 

    if (!validatePassword(password)) {
      setError("Password must be at least 8 characters long and include uppercase letters, lowercase letters, numbers, and special characters.");
      setTimeout(() => setError(""), 4000);
      return;
    }

    try {
      const response = await fetch("http://localhost:4000/register", {
        method: "POST",
        body: JSON.stringify({ username, password }),
        headers: { "Content-Type": "application/json" },
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Registration successful:", data);
        alert("Registration successful");
        navigate("/login");
      } else {
        console.error("Registration failed with status:", response.status);
        alert("Registration failed!");
      }
    } catch (error) {
      console.error("Fetch error:", error);
      alert("Failed to register");
    }
  }

  return (
    <form className="register" onSubmit={register}>
      <h2>Register</h2>
      <input
        type="text"
        placeholder="username"
        required
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="password"
        required
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {error && <p className="error">{error}</p>}
      <button type="submit">Register</button>
    </form>
  );
}
