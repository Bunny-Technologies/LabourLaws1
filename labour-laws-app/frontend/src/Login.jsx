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

    try {
      console.log("🔍 Sending request to backend...");
      const response = await axios.post("http://localhost:5006/api/login", {
        username,
        password,
      });

      console.log("🔍 Server Response:", response.data);

      if (response.data.message === "✅ Login successful") {
        localStorage.setItem("user", JSON.stringify(response.data.user)); // ✅ Store user in localStorage
        setIsAuthenticated(true); // ✅ Set authentication state
        navigate("/departments"); // ✅ Redirect after login
      } else {
        setError("❌ Invalid username or password");
      }
    } catch (err) {
      console.error("❌ API Error:", err);
      setError("❌ Invalid credentials");
    }
  };

  return (
    <div className="login-box-wrapper">
      <div className="login-container">
        {/* Government Header with Logo */}
        <img 
          src="https://thumbs.dreamstime.com/b/labor-laws-text-violet-indigo-round-grungy-stamp-labor-laws-text-violet-indigo-round-grungy-texture-stamp-244040401.jpg" 
          alt="Government Logo" 
          width="80px"
          className="login-logo"
          style={{ marginBottom: "15px" }}
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
      </div>
    </div>
  );
};

export default Login;
