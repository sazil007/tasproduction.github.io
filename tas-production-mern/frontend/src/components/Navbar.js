import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          TAS <span>Production</span> House
        </Link>
        <div className="mobile-menu-btn" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          ☰
        </div>
        <ul className={`nav-menu ${mobileMenuOpen ? 'active' : ''}`}>
          <li><Link to="/" className="nav-link">Home</Link></li>
          <li><Link to="/services" className="nav-link">Services</Link></li>
          <li><Link to="/portfolio" className="nav-link">Portfolio</Link></li>
          <li><Link to="/contact" className="nav-link">Contact</Link></li>
          {user ? (
            <>
              {user.role === 'admin' && (
                <li><Link to="/admin" className="nav-link">Admin</Link></li>
              )}
              <li className="user-info">
                <span>Welcome, {user.name}</span>
                <button onClick={handleLogout} className="btn-logout">Logout</button>
              </li>
            </>
          ) : (
            <>
              <li><Link to="/login" className="nav-link btn-login">Login</Link></li>
              <li><Link to="/register" className="nav-link btn-signup">Sign Up</Link></li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;