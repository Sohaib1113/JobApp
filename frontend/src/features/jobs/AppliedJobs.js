
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAppliedJobs } from '../appliedJobs/appliedJobsSlice';
import './Jobs.css';

function AppliedJobs() {
  const dispatch = useDispatch();
  const appliedJobs = useSelector(state => state.appliedJobs.appliedJobs);
  const jobs = useSelector(state => state.jobs.jobs.filter(job => appliedJobs.includes(job.id)));
  const jobStatus = useSelector(state => state.jobs.status);

  useEffect(() => {
    dispatch(fetchAppliedJobs());
  }, [dispatch]);

  if (jobStatus === 'loading') {
    return <p>Loading applied jobs...</p>;
  }

  return (
    <div className="jobs-page">
      <h1>Applied Jobs</h1>
      <div className="jobs-container">
        {jobs.map((job) => (
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
          </div>
        ))}
      </div>
    </div>
  );
}

export default AppliedJobs;
