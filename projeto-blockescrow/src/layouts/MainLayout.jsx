import React from 'react';
import { Outlet } from 'react-router-dom';
import TopNavBar from '../components/common/TopNavBar/TopNavBar.jsx';
import SideNavBar from '../components/common/SideNavBar/SideNavBar.jsx';
import BottomNavBar from '../components/common/BottomNavBar/BottomNavBar.jsx';
import './MainLayout.css';

export function MainLayout() {
  return (
    <div className="main-layout">
      <TopNavBar />
      <SideNavBar />
      <main className="main-layout__content">
        <Outlet />
      </main>
      <BottomNavBar />
    </div>
  );
}

export default MainLayout;
