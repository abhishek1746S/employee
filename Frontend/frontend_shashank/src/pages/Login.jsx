import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../services/authService";
import "../styles/Login.css";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const response = await loginUser(formData);

    localStorage.setItem("token", response.access_token);
    localStorage.setItem(
      "user",
      JSON.stringify(response.user)
    );

    alert("Login Successful!");

    const role = response.user.role;

    switch (role) {
      case "admin":
        navigate("/admin-dashboard");
        break;

      case "employee":
        navigate("/employee-dashboard");
        break;

      default:
        navigate("/student-dashboard");
    }
  } catch (error) {
    console.error(error);

    alert(
      error.response?.data?.detail ||
      "Invalid email or password"
    );
  }
};

  return (
    <div className="login-page">
      <div className="login-card">
        <Link to="/" className="brand">
          <span className="brand-icon">✦</span>
          <span>ReferralX</span>
        </Link>

        <h1>Sign in</h1>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email</label>

            <input
              type="email"
              name="email"
              placeholder="your@email.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>

            <input
              type="password"
              name="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="remember-row">
            <div>
              <input type="checkbox" />
              <span> Remember me</span>
            </div>

            <a href="/">Forgot password?</a>
          </div>

          <button type="submit" className="signin-btn">
            Sign In
          </button>
        </form>

        <div className="divider">
          <span>or</span>
        </div>

        <button className="social-btn">
          <img
            src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg"
            alt="google"
          />
          Sign in with Google
        </button>

        <button className="social-btn">
          <img
            src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/facebook/facebook-original.svg"
            alt="Facebook"
          />
          Sign in with Facebook
        </button>

        <p className="signup-text">
          Don't have an account? <Link to="/register">Sign up</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
