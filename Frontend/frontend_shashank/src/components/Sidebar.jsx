import { Link, useNavigate } from "react-router-dom";
import "../styles/Sidebar.css";

function Sidebar() {
  const navigate = useNavigate();

  const user = JSON.parse(
    localStorage.getItem("user") || "null"
  );

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="sidebar">
      <h2 className="sidebar-logo">
        ReferralX
      </h2>

      <div className="sidebar-links">
        {user?.role === "student" && (
          <>
            <Link to="/student-dashboard">
              Dashboard
            </Link>

            <Link to="/referrals">
              Referrals
            </Link>

            <Link to="/applications">
              Applications
            </Link>

            <Link to="/profile">
              Profile
            </Link>
          </>
        )}

        {user?.role === "employee" && (
          <>
            <Link to="/employee-dashboard">
              Dashboard
            </Link>

            <Link to="/my-referrals">
              My Referrals
            </Link>

            <Link to="/applications">
              Applications
            </Link>

            <Link to="/profile">
              Profile
            </Link>
          </>
        )}

        {user?.role === "admin" && (
          <>
            <Link to="/admin-dashboard">
              Dashboard
            </Link>

            <Link to="/verify-employees">
              Verify Employees
            </Link>

            <Link to="/users">
              Users
            </Link>
          </>
        )}
      </div>

      <button
        className="sidebar-logout"
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
}

export default Sidebar;