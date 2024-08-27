import React from 'react';
import SidebarComponent from './components/SidebarComponent';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import './DashboardLayout.css';
import { jwtDecode } from 'jwt-decode'; // Correct import statement


function DashboardLayout({ children }) {
  const token = localStorage.getItem('authToken');
  let userRole = 'user';

  if (token) {
    const decodedToken = jwtDecode(token); // Decode the JWT token
    userRole = decodedToken.role || 'user'; // Extract the role from the decoded token
  }

  return (
    <div className="dashboard-layout">
      <SidebarComponent userRole={userRole} />
      <div className="dashboard-main">
        <Navbar />
        <div className="dashboard-content">
          {children}
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default DashboardLayout;
