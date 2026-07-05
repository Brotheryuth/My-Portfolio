import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../Button/Button';
import { useAuth } from '../../hooks/useAuth';
import './Navbar.css';

function Navbar() {
  const [isDark, setDark] = useState(false);
  const [isMenuOpen, setMenuOpen] = useState(false);
  const { isAuthenticated, logout } = useAuth();

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      document.body.classList.add('dark-mode');
      setDark(true);
    }
  }, []);

  const toggleTheme = () => {
    if (isDark) {
      document.body.classList.remove('dark-mode');
      localStorage.setItem('theme', 'light');
      setDark(false);
    } else {
      document.body.classList.add('dark-mode');
      localStorage.setItem('theme', 'dark');
      setDark(true);
    }
  };

  const themeIcon = isDark ? (
    <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="5"></circle>
      <line x1="12" y1="1" x2="12" y2="3"></line>
      <line x1="12" y1="21" x2="12" y2="23"></line>
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
      <line x1="1" y1="12" x2="3" y2="12"></line>
      <line x1="21" y1="12" x2="23" y2="12"></line>
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
    </svg>
  ) : (
    <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
    </svg>
  );

  return (
    <nav className="navbar-container">
      <div className="navbar-header">
        <Link to="/" className="navbar-brand">
          LY SERAKYUTH
        </Link>
        <div className="navbar-header-actions">
          <Button onClick={toggleTheme} variant="outline" className="theme-btn header-theme-btn">
            {themeIcon}
          </Button>
          {/* Hamburger menu button */}
          <button
            className={`navbar-toggle-btn ${isMenuOpen ? 'open' : ''}`}
            onClick={() => setMenuOpen(!isMenuOpen)}
            aria-label="Toggle navigation menu"
          >
            <span className="bar"></span>
            <span className="bar"></span>
            <span className="bar"></span>
          </button>
        </div>
      </div>

      {/* Sliding menu wrapper */}
      <div className={`navbar-menu-wrapper ${isMenuOpen ? 'active' : ''}`}>
        <div className="navbar-navigation-links">
          <Link to="/" className="navbar-link" onClick={() => setMenuOpen(false)}>HOME</Link>
          <Link to="/skills" className="navbar-link" onClick={() => setMenuOpen(false)}>SKILLS</Link>
          <Link to="/projects" className="navbar-link" onClick={() => setMenuOpen(false)}>PROJECTS</Link>
          <Link to="/about" className="navbar-link" onClick={() => setMenuOpen(false)}>ABOUT</Link>
        </div>

        <div className="navbar-actions">
          <Button onClick={() => { toggleTheme(); setMenuOpen(false); }} variant="outline" className="theme-btn menu-theme-btn">
            {themeIcon}
          </Button>

          <Link to="/dashboard" className="profile-nav-link" title="Dashboard" onClick={() => setMenuOpen(false)}>
            <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" className="profile-icon">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
          </Link>

          {isAuthenticated && (
            <Button onClick={() => { logout(); setMenuOpen(false); }} variant="text" className="logout-nav-btn">
              LOGOUT
            </Button>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;