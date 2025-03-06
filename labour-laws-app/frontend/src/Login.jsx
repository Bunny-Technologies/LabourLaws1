import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login.css";

const Login = ({ setIsAuthenticated }) => {  
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
  
    // Hardcoded admin credentials for now
    if (username === "admin" && password === "password") {
      console.log("✅ Login successful (Mocked Authentication)");
  
      // Simulate a server response
      const mockUser = { username: "admin", role: "Administrator" };
      localStorage.setItem("user", JSON.stringify(mockUser)); // ✅ Store user in localStorage
  
      setIsAuthenticated(true); // ✅ Set authentication state
      navigate("/departments"); // ✅ Redirect after login
    } else {
      setError("❌ Invalid username or password");
    }
  };
  

  return (
    <div className="login-wrapper">
      <div className="login-container">
        {/* Government Logo */}
        <img 
          src="https://thumbs.dreamstime.com/b/labor-laws-text-violet-indigo-round-grungy-stamp-labor-laws-text-violet-indigo-round-grungy-texture-stamp-244040401.jpg" 
          alt="Government Logo" 
          className="login-logo"
        />
        <h2>Government Labour Law Portal</h2>

        {/* Login Form */}
        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Username"
            className="input-field"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="input-field"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="login-btn">
            Login
          </button>
          {error && <p className="error-message">{error}</p>}
        </form>

        {/* Forgot Password & Signup Links */}

      </div>
    </div>
  );
};

export default Login;
