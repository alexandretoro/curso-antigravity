import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Button from '../Button/Button.jsx';
import './TopNavBar.css';

export function TopNavBar() {
  const location = useLocation();

  return (
    <header className="top-navbar">
      <div className="top-navbar__brand">
        <Link to="/" className="top-navbar__logo-link">
          <h1 className="top-navbar__logo">BlockEscrow</h1>
        </Link>
        <nav className="top-navbar__nav">
          <Link
            to="/explorer"
            className={`top-navbar__link ${location.pathname === '/explorer' || location.pathname === '/transacao' ? 'top-navbar__link--active' : ''}`}
          >
            Explorer
          </Link>
          <Link to="/" className={`top-navbar__link ${location.pathname === '/' ? 'top-navbar__link--active' : ''}`}>
            Simulator
          </Link>
          <a href="#" className="top-navbar__link">Docs</a>
          <a href="#" className="top-navbar__link">Nodes</a>
        </nav>
      </div>

      <div className="top-navbar__actions">
        <div className="top-navbar__status">
          <div className="top-navbar__status-item">
            <span className="font-label-caps top-navbar__label">Network</span>
            <span className="font-data-code top-navbar__val--secondary">Simulated Mainnet</span>
          </div>
          <div className="top-navbar__status-item">
            <span className="font-label-caps top-navbar__label">Block Height</span>
            <span className="font-data-code top-navbar__val--primary">18,402,192</span>
          </div>
        </div>

        <Button variant="primary" size="md">
          Connect Wallet
        </Button>

        <button className="top-navbar__icon-btn" aria-label="Settings">
          <span className="material-symbols-outlined">settings</span>
        </button>

        <button className="top-navbar__icon-btn" aria-label="Notifications">
          <span className="material-symbols-outlined">notifications</span>
        </button>

        <img
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuBbxqSHf-ceYBMVXQAPM8AU9eINIHu5q0KVgVwz_dECaTEOHmxUkjcjg3dD0_sF4yglnCoGkTF7HxkyrGL7hGTjPJF__vGfJOoQQHhkJr40tUaabMpyrUioeGJ9FbEtXo8ZAza6TbLhLpK79O9JhRpb233YfOhm2U0OExLZ4VJunuOpYlwIX-AZ6FtmInde4ZE8Y8NxDCipVJ_Qig9ZEbnxubJjNLHDG1HyyXMI56oO4LNqxBjY-XH-WDOArsW_43t4ZSrKgMZURxRf"
          alt="User Avatar"
          className="top-navbar__avatar"
        />
      </div>
    </header>
  );
}

export default TopNavBar;
