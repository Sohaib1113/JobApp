import React from 'react';
import './SidebarComponent.css';
import { useNavigate } from 'react-router-dom';

function SidebarComponent({ userRole }) {
  const navigate = useNavigate();

  return (
    <div className="custom-sidebar">
      <div className="sidebar-logo">
        <h2>Job Application</h2>
      </div>
      {/* Divider added here */}
      <div className="sidebar-divider"></div>

      <div className="sidebar-menu">
        <div className="menu-item" onClick={() => navigate('/jobs')}>Jobs</div>
        {userRole === 'admin' && (
          <>
            <div className="menu-item" onClick={() => navigate('/admin')}>Admin Dashboard</div>
            <div className="menu-item" onClick={() => navigate('/admin/jobs-listing')}>Job Listings</div> {/* Corrected navigation to Job Listings */}
          </>
        )}
      </div>
    </div>
  );
}

export default SidebarComponent;
