import React, { useState, useEffect } from 'react';
import axios from 'axios';
import JobForm from './JobForm';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Admin.css'; // Import the CSS file

const Admin = () => {
  const [jobs, setJobs] = useState([]);
  const [editingJob, setEditingJob] = useState(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/jobs');
        setJobs(res.data);
      } catch (err) {
        toast.error('Failed to fetch jobs. Please try again.', {
          position: "top-center",
          autoClose: 5000,
        });
      }
    };

    fetchJobs();
  }, []);

  const handleEdit = (job) => {
    setEditingJob(job);
  };

  const handleDelete = async (jobId) => {
    const token = localStorage.getItem('authToken');

    if (window.confirm("Are you sure you want to delete this job?")) {
      try {
        await axios.delete(`http://localhost:5000/api/jobs/${jobId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setJobs(jobs.filter(job => job.id !== jobId));
        toast.success('Job deleted successfully!', {
          position: "top-center",
          autoClose: 5000,
        });
      } catch (err) {
        toast.error('Failed to delete job. Please try again.', {
          position: "top-center",
          autoClose: 5000,
        });
        console.error(err.response?.data || err.message);
      }
    }
  };

  const handleJobSubmit = (updatedJob) => {
    if (editingJob) {
      setJobs(jobs.map(job => job.id === updatedJob.id ? updatedJob : job));
      setEditingJob(null);
    } else {
      setJobs([...jobs, updatedJob]);
    }
  };

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>
      <JobForm onSubmit={handleJobSubmit} editingJob={editingJob} />

      <h2>Posted Jobs</h2>
      <table className="job-table">
        <thead>
          <tr>
            <th>Company Name</th>
            <th>Position</th>
            <th>Contract</th>
            <th>Location</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {jobs.map((job) => (
            <tr key={job.id}>
              <td>{job.companyName}</td>
              <td>{job.position}</td>
              <td>{job.contract}</td>
              <td>{job.location}</td>
              <td>
                <button className="edit-button" onClick={() => handleEdit(job)}>Edit</button>
                <button className="delete-button" onClick={() => handleDelete(job.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <ToastContainer />
    </div>
  );
};

export default Admin;
