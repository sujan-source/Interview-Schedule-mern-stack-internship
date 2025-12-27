import { Link } from "react-router-dom";
import "./Navbar.css";

export default function Navbar({ role, isLoggedIn, onLogout }) {
  return (
    <nav className="navbar">
      <h2 className="logo">
        Interview Scheduler
        {isLoggedIn && (
          <span className="role"> ({role.toUpperCase()})</span>
        )}
      </h2>

      <ul className="nav-links">
        <li>
          <Link to="/">Home</Link>
        </li>

        <li>
          <Link to="/about">About Us</Link>
        </li>

        {!isLoggedIn && (
          <>
            <li>
              <Link to="/login">Login</Link>
            </li>

            <li>
              <Link to="/signup">Signup</Link>
            </li>
          </>
        )}

        {isLoggedIn && (
          <li>
            <button className="logout-btn" onClick={onLogout}>
              Logout
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
}

