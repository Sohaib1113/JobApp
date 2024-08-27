import React, { useEffect, useState } from 'react';
import axios from 'axios';
import JobForm from './JobForm';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './JobListing.css'; // Add custom CSS for styling

const JobListing = () => {
  const [jobs, setJobs] = useState([]);
  const [editingJob, setEditingJob] = useState(null); // State to manage the job being edited

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
    setEditingJob(job); // Set the job to be edited
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
      // Update the jobs array with the edited job
      setJobs(jobs.map(job => job.id === updatedJob.id ? updatedJob : job));
      setEditingJob(null); // Clear the editing state
    } else {
      // Add the new job to the jobs array
      setJobs([...jobs, updatedJob]);
    }
  };

  return (
    <div className="job-listing-container">
      <h1>Job Listings</h1>

      {editingJob ? (
        <JobForm onSubmit={handleJobSubmit} editingJob={editingJob} />
      ) : (
        <>
          <table className="job-listing-table">
            <thead>
              <tr>
                <th>Company Name</th>
                <th>Position</th>
                <th>Contract</th>
                <th>Location</th>
                <th>Description</th> 
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
                  <td>{job.description}</td> 
                  <td>
                    <button className="edit-btn" onClick={() => handleEdit(job)}>Edit</button>
                    <button className="delete-btn" onClick={() => handleDelete(job.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}

      <ToastContainer />
    </div>
  );
};

export default JobListing;
