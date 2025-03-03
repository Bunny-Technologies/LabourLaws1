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

    // ✅ Simulated authentication for now (Backend commented out)
    if (username === "admin" && password === "password") {
      // ✅ Save user authentication state in localStorage
      localStorage.setItem("user", JSON.stringify({ username }));

      // ✅ Update App.jsx state
      setIsAuthenticated(true);

      // ✅ Navigate to the departments page
      navigate("/departments");
    } else {
      setError("❌ Invalid username or password");
    }

    /*
    try {
      const response = await axios.post("http://localhost:5006/api/login", {
        username,
        password,
      });

      if (response.data.message === "✅ Login successful") {
        localStorage.setItem("user", JSON.stringify({ username }));
        setIsAuthenticated(true);
        navigate("/departments");
      }
      
    } catch (err) {
      setError("❌ Invalid username or password");
    }
    */
  };

  return (
    <div className="login-container">
      <h2>Government Labour Law Portal</h2>
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
  );
};

export default Login;
