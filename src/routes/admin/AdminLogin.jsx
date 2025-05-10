import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminShared.css";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    // Mock admin credentials
    const mockAdmin = {
      email: "admin@egyptour.com",
      password: "admin123",
    };

    if (email === mockAdmin.email && password === mockAdmin.password) {
      // Store admin session in localStorage
      localStorage.setItem("adminSession", "true");
      navigate("/admin/dashboard");
    } else {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="page-container">
      <div className="admin-headline-container">
        <h1 className="admin-main-headline">Admin Login</h1>
        <p className="admin-sub-headline">Sign in to access the admin panel</p>
      </div>

      <div className="admin-content">
        <form onSubmit={handleSubmit} className="admin-form">
          {error && <div className="admin-error-message">{error}</div>}
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@egyptour.com"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="admin123"
              required
            />
          </div>
          <button type="submit" className="admin-primary-btn">
            Sign In
          </button>
        </form>
        <div className="admin-login-help">
          <p>Demo Credentials:</p>
          <p>Email: admin@egyptour.com</p>
          <p>Password: admin123</p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
