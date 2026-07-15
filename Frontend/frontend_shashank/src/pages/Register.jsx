import { useState } from "react";
import { Link } from "react-router-dom";
import { registerUser } from "../services/authService";
import "../styles/Register.css";

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "student",
    company_email: "",
    company_name: "",
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
      const data = await registerUser(formData);

      console.log(data);
      alert("Registration Successful!");
    } catch (error) {
      console.error("Full Error:", error);

      if (error.response) {
        console.log("Response Data:", error.response.data);
        console.log("Status:", error.response.status);
        alert(JSON.stringify(error.response.data));
      } else {
        alert(error.message);
      }
    }
  };

  return (
    <div className="register-page">
      <div className="register-card">
        <Link to="/" className="brand">
          <span className="brand-icon">✦</span>
          <span>ReferralX</span>
        </Link>

        <h1>Sign up</h1>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Full Name</label>
            <input
              type="text"
              name="name"
              placeholder="John Snow"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

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

          <div className="form-group">
            <label>Role</label>
            <select name="role" value={formData.role} onChange={handleChange}>
              <option value="student">Student</option>
              <option value="employee">Employee</option>
            </select>
          </div>

          {formData.role === "employee" && (
            <>
              <div className="form-group">
                <label>Company Email</label>
                <input
                  type="email"
                  name="company_email"
                  placeholder="employee@company.com"
                  value={formData.company_email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Company Name</label>
                <input
                  type="text"
                  name="company_name"
                  placeholder="Google"
                  value={formData.company_name}
                  onChange={handleChange}
                  required
                />
              </div>
            </>
          )}

          <div className="checkbox-row">
            <input type="checkbox" required />
            <span>I agree to the Terms & Conditions</span>
          </div>

          <button type="submit" className="signup-btn">
            Sign Up
          </button>
        </form>

        <div className="divider">
          <span>or</span>
        </div>

        <button className="social-btn">
          <img
            src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg"
            alt="Google"
          />
          Sign up with Google
        </button>

        <button className="social-btn">
          <img
            src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/facebook/facebook-original.svg"
            alt="Facebook"
          />
          Sign up with Facebook
        </button>

        <p className="signin-text">
          Already have an account? <Link to="/login">Sign in</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
