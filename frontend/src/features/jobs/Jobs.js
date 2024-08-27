import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { applyForJob, setJobs, setAppliedJobs } from './jobsSlice';
import axios from 'axios';
import './Jobs.css';

function Jobs() {
  const dispatch = useDispatch();
  const jobs = useSelector((state) => state.jobs.jobs);
  const appliedJobs = useSelector((state) => state.jobs.appliedJobs);
  const status = useSelector((state) => state.jobs.status);
  const error = useSelector((state) => state.jobs.error);

  const [searchTerm, setSearchTerm] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [contractFilter, setContractFilter] = useState('');

  useEffect(() => {
    const fetchJobsAndAppliedJobs = async () => {
      try {
        const token = localStorage.getItem('authToken');

        const [jobsResponse, appliedJobsResponse] = await Promise.all([
          axios.get('http://localhost:5000/api/jobs'),
          axios.get('http://localhost:5000/api/applications/my-applications', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }),
        ]);

        dispatch(setJobs(jobsResponse.data));
        dispatch(setAppliedJobs(appliedJobsResponse.data.map(app => app.jobId)));

      } catch (error) {
        console.error('Failed to fetch jobs or applied jobs:', error);
      }
    };

    fetchJobsAndAppliedJobs();
  }, [dispatch]);

  const handleApply = (jobId) => {
    dispatch(applyForJob(jobId));
  };

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch = job.companyName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLocation = locationFilter ? job.location === locationFilter : true;
    const matchesContract = contractFilter ? job.contract === contractFilter : true;
    return matchesSearch && matchesLocation && matchesContract;
  });

  return (
    <div className="jobs-page">
      <h1>Available Jobs</h1>

      <div className="filters">
        <input
          type="text"
          placeholder="Search by company name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />

        <select value={locationFilter} onChange={(e) => setLocationFilter(e.target.value)} className="filter-select">
          <option value="">All Locations</option>
          {[...new Set(jobs.map(job => job.location))].map((location) => (
            <option key={location} value={location}>{location}</option>
          ))}
        </select>

        <select value={contractFilter} onChange={(e) => setContractFilter(e.target.value)} className="filter-select">
          <option value="">All Contracts</option>
          {[...new Set(jobs.map(job => job.contract))].map((contract) => (
            <option key={contract} value={contract}>{contract}</option>
          ))}
        </select>
      </div>

      {status === 'loading' ? (
        <p>Loading jobs...</p>
      ) : error ? (
        <p>{error}</p>
      ) : filteredJobs.length > 0 ? (
        <div className="jobs-container">
          {filteredJobs.map((job) => (
            <div key={job.id} className="job-card">
              <img 
                src="https://cdn.pixabay.com/photo/2017/10/17/10/05/job-2860035_1280.jpg" 
                alt={`${job.position} at ${job.companyName}`} 
                className="job-image"
              />
              <h2>{job.position}</h2>
              <p><strong>Company:</strong> {job.companyName}</p>
              <p><strong>Location:</strong> {job.location}</p>
              <p><strong>Contract:</strong> {job.contract}</p>
              <p><strong>Description:</strong> {job.description}</p>
              <button 
                onClick={() => handleApply(job.id)} 
                disabled={status === 'loading' || appliedJobs.includes(job.id)}
                className="apply-button"
              >
                {appliedJobs.includes(job.id) ? 'Applied' : 'Apply'}
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p>No jobs available that match your criteria.</p>
      )}
    </div>
  );
}

export default Jobs;
