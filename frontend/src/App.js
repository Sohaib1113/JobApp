import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import DashboardLayout from './DashboardLayout';
import Jobs from './features/jobs/Jobs';
import Admin from './features/admin/Admin';
import JobListing from './features/admin/JobListing';
import AppliedJobs from './features/jobs/AppliedJobs';  // Import the Applied Jobs component
import Login from './features/auth/Login';
import Signup from './features/auth/Signup';
import PrivateRoute from './features/auth/PrivateRoute'; // Adjust the path based on where you placed it

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Login />} />  {/* Default route */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        
        {/* Protected Routes */}
        <Route
          path="/jobs"
          element={
            <PrivateRoute>
              <DashboardLayout>
                <Jobs />
              </DashboardLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <PrivateRoute>
              <DashboardLayout>
                <Admin />
              </DashboardLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/jobs-listing"
          element={
            <PrivateRoute>
              <DashboardLayout>
                <JobListing />
              </DashboardLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/applied-jobs"
          element={
            <PrivateRoute>
              <DashboardLayout>
                <AppliedJobs />
              </DashboardLayout>
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
