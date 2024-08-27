import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './JobForm.css'; // Make sure to link the CSS file

const JobForm = ({ onSubmit, editingJob }) => {
  const [companyName, setCompanyName] = useState('');
  const [position, setPosition] = useState('');
  const [contract, setContract] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (editingJob) {
      setCompanyName(editingJob.companyName);
      setPosition(editingJob.position);
      setContract(editingJob.contract);
      setLocation(editingJob.location);
      setDescription(editingJob.description || '');
    }
  }, [editingJob]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic form validation
    if (!companyName || !position || !contract || !location || !description) {
      alert('Please fill out all required fields.');
      return;
    }

    setLoading(true);

    const token = localStorage.getItem('authToken'); // Fetch the token from localStorage

    if (!token) {
      alert('You are not authorized to perform this action.');
      setLoading(false);
      return;
    }

    try {
      let res;
      if (editingJob) {
        // Update job
        res = await axios.put(`http://localhost:5000/api/jobs/${editingJob.id}`, {
          companyName,
          position,
          contract,
          location,
          description, // Ensure description is included here
        }, {
          headers: {
            Authorization: `Bearer ${token}`, // Attach the token in the Authorization header
          }
        });
        alert('Job updated successfully!');
      } else {
        // Create job
        res = await axios.post('http://localhost:5000/api/jobs/create', {
          companyName,
          position,
          contract,
          location,
          description, // Ensure description is included here
        }, {
          headers: {
            Authorization: `Bearer ${token}`, // Attach the token in the Authorization header
          }
        });
        alert('Job posted successfully!');
      }

      onSubmit(res.data); // Pass the new/updated job to the Admin component

      // Clear the form after submission
      setCompanyName('');
      setPosition('');
      setContract('');
      setLocation('');
      setDescription('');

    } catch (err) {
      alert(err.response?.data?.message || 'Failed to save job. Please try again.');
      console.error(err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="job-form-container">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Company Name"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Position"
          value={position}
          onChange={(e) => setPosition(e.target.value)}
        />
        <input
          type="text"
          placeholder="Contract Type"
          value={contract}
          onChange={(e) => setContract(e.target.value)}
        />
        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <textarea
          placeholder="Job Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Saving...' : editingJob ? 'Update Job' : 'Post Job'}
        </button>
      </form>
    </div>
  );
};

export default JobForm;
