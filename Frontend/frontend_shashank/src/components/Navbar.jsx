import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import "../styles/Navbar.css";

function Navbar() {
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);

  const dropdownRef = useRef(null);

  const token = localStorage.getItem("token");

  const user = JSON.parse(
    localStorage.getItem("user") || "null"
  );

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target)
      ) {
        setShowDropdown(false);
      }
    };

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () =>
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const getDashboardLink = () => {
    if (!user) return "/";

    switch (user.role) {
      case "admin":
        return "/admin-dashboard";

      case "employee":
        return "/employee-dashboard";

      case "student":
        return "/student-dashboard";

      default:
        return "/";
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">

        {/* Logo */}
        <Link to="/" className="brand">
          <span className="brand-icon">✦</span>
          <span>ReferralX</span>
        </Link>

        {/* Center Links */}
        <div className="nav-links">
          <Link to="/">Home</Link>
          <a href="#how-it-works">
            How It Works
          </a>
          <a href="#features">
            Features
          </a>
        </div>

        {/* Right Side */}
        <div className="nav-actions">
          {!token ? (
            <>
              <Link
                to="/login"
                className="login-btn"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="register-btn"
              >
                Get Started
              </Link>
            </>
          ) : (
            <div
              className="profile-menu"
              ref={dropdownRef}
            >
              <button
                className="profile-btn"
                onClick={() =>
                  setShowDropdown(!showDropdown)
                }
              >
                <div className="avatar">
                  {user?.name
                    ?.charAt(0)
                    ?.toUpperCase() || "U"}
                </div>

                <span className="user-name">
                  {user?.name || "Account"}
                </span>

                <span>▼</span>
              </button>

              {showDropdown && (
                <div className="dropdown-menu">
                  <Link
                    to="/profile"
                    onClick={() =>
                      setShowDropdown(false)
                    }
                  >
                    My Profile
                  </Link>

                  <Link
                    to={getDashboardLink()}
                    onClick={() =>
                      setShowDropdown(false)
                    }
                  >
                    Dashboard
                  </Link>

                  <button
                    className="logout-btn"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

      </div>
    </nav>
  );
}

export default Navbar;