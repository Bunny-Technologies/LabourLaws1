import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = ({ setIsAuthenticated }) => {  
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    if (username === "admin" && password === "password") {
      localStorage.setItem("user", JSON.stringify({ username }));
      setIsAuthenticated(true);
      navigate("/departments");
    } else {
      setError("❌ Invalid username or password");
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
