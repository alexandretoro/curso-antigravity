import React from 'react';
import { NavLink } from 'react-router-dom';
import './BottomNavBar.css';

export function BottomNavBar() {
  return (
    <nav className="bottom-navbar">
      <NavLink
        to="/"
        end
        className={({ isActive }) => `bottom-navbar__item ${isActive ? 'bottom-navbar__item--active' : ''}`}
      >
        <span className="material-symbols-outlined">home</span>
        <span className="font-label-caps bottom-navbar__label">Home</span>
      </NavLink>

      <NavLink
        to="/smart-contracts"
        className={({ isActive }) => `bottom-navbar__item ${isActive ? 'bottom-navbar__item--active' : ''}`}
      >
        <span className="material-symbols-outlined">gavel</span>
        <span className="font-label-caps bottom-navbar__label">Contracts</span>
      </NavLink>

      <NavLink
        to="/transacao"
        className={({ isActive }) => `bottom-navbar__item ${isActive ? 'bottom-navbar__item--active' : ''}`}
      >
        <span className="material-symbols-outlined">terminal</span>
        <span className="font-label-caps bottom-navbar__label">Terminal</span>
      </NavLink>

      <NavLink
        to="/log-de-eventos"
        className={({ isActive }) => `bottom-navbar__item ${isActive ? 'bottom-navbar__item--active' : ''}`}
      >
        <span className="material-symbols-outlined">list_alt</span>
        <span className="font-label-caps bottom-navbar__label">Logs</span>
      </NavLink>
    </nav>
  );
}

export default BottomNavBar;
