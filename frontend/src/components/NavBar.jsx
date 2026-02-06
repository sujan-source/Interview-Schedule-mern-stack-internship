import { Link, useLocation } from "react-router-dom";
import { FaUserCircle, FaSignOutAlt } from 'react-icons/fa';

export default function Navbar({ role, isLoggedIn, onLogout, user }) {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="navbar">
      <Link to="/" className="brand-link">
        <h2 className="logo">InterView</h2>
      </Link>

      <ul className="nav-links">
        <li>
          <Link to="/" className={isActive("/") ? "active" : ""}>Home</Link>
        </li>

        {!isLoggedIn ? (
          <>
            <li><Link to="/login" className={isActive("/login") ? "active" : ""}>Login</Link></li>
            <li><Link to="/signup" className={isActive("/signup") ? "active" : ""}>Signup</Link></li>
          </>
        ) : (
          <>
            <li><Link to="/dashboard" className={isActive("/dashboard") ? "active" : ""}>Dashboard</Link></li>
            {role === "user" && (
              <li><Link to="/profile" className={isActive("/profile") ? "active" : ""}>Profile</Link></li>
            )}
            <li className="user-profile-nav">
              <span className="user-name">{user?.name}</span>
              <button className="btn-logout" onClick={onLogout}>
                <FaSignOutAlt /> Logout
              </button>
            </li>
          </>
        )}
      </ul>
      <style jsx>{`
        .brand-link { text-decoration: none; }
        .user-profile-nav { display: flex; align-items: center; gap: 15px; }
        .user-name { font-size: 0.9rem; color: var(--text-muted); }
      `}</style>
    </nav>
  );
}
