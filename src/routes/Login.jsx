import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import "./Login.css";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const headlineRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    if (headlineRef.current) {
      observer.observe(headlineRef.current);
    }
    return () => observer.disconnect();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <>
      <Navbar />
      <div className="page-container">
        <div
          className={`login-headline-container ${isVisible ? "in-view" : ""}`}
          ref={headlineRef}
        >
          <h1 className="login-main-headline">Welcome Back</h1>
          <p className="login-sub-headline">Continue Your Egyptian Adventure</p>
        </div>

        <div className="login-container">
          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-options">
              <label className="remember-me">
                <input type="checkbox" />
                Remember me
              </label>
              <Link to="/forgot-password" className="forgot-password">
                Forgot password?
              </Link>
            </div>

            <button type="submit" className="login-btn">
              Sign In
            </button>

            <p className="signup-redirect">
              Don't have an account? <Link to="/signup">Sign up</Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
