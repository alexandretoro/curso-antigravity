import React from 'react';
import { NavLink } from 'react-router-dom';
import Button from '../Button/Button.jsx';
import './SideNavBar.css';

export function SideNavBar() {
  return (
    <aside className="side-navbar">
      <nav className="side-navbar__menu">
        <NavLink
          to="/"
          end
          className={({ isActive }) => `side-navbar__item ${isActive ? 'side-navbar__item--active' : ''}`}
        >
          <span className="material-symbols-outlined">dashboard</span>
          <span className="font-label-caps">Dashboard</span>
        </NavLink>

        <NavLink
          to="/smart-contracts"
          className={({ isActive }) => `side-navbar__item ${isActive ? 'side-navbar__item--active' : ''}`}
        >
          <span className="material-symbols-outlined">description</span>
          <span className="font-label-caps">Smart Contracts</span>
        </NavLink>

        <NavLink
          to="/transacao"
          className={({ isActive }) => `side-navbar__item ${isActive ? 'side-navbar__item--active' : ''}`}
        >
          <span className="material-symbols-outlined">receipt_long</span>
          <span className="font-label-caps">Transactions</span>
        </NavLink>

        <NavLink
          to="/log-de-eventos"
          className={({ isActive }) => `side-navbar__item ${isActive ? 'side-navbar__item--active' : ''}`}
        >
          <span className="material-symbols-outlined">list_alt</span>
          <span className="font-label-caps">Event Logs</span>
        </NavLink>

        <NavLink
          to="/teste-imutabilidade"
          className={({ isActive }) => `side-navbar__item ${isActive ? 'side-navbar__item--active' : ''}`}
        >
          <span className="material-symbols-outlined">security</span>
          <span className="font-label-caps">Security</span>
        </NavLink>
      </nav>

      <div className="side-navbar__footer">
        <Button variant="primary" fullWidth className="side-navbar__action-btn">
          New Escrow
        </Button>
        <div className="side-navbar__secondary-menu">
          <a href="#" className="side-navbar__sub-item">
            <span className="material-symbols-outlined">settings</span>
            <span className="font-label-caps">Settings</span>
          </a>
          <a href="#" className="side-navbar__sub-item">
            <span className="material-symbols-outlined">help</span>
            <span className="font-label-caps">Support</span>
          </a>
        </div>
      </div>
    </aside>
  );
}

export default SideNavBar;
