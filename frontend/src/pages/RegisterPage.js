import { useState } from "react";

export default function RegisterPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function register(e) {
    e.preventDefault();
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
    <form className="register" onSubmit={register} action="">
      <h2>Register</h2>
      <input
        type="text"
        placeholder="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Register</button>
    </form>
  );
}
