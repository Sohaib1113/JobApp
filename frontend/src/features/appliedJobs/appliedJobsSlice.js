
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const applyForJob = createAsyncThunk('appliedJobs/applyForJob', async (jobId, { getState }) => {
  const token = getState().auth.token;  // Assuming you have an auth slice handling authentication
  await axios.post(
    `http://localhost:5000/api/applications/apply`,
    { jobId },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return jobId;
});

export const fetchAppliedJobs = createAsyncThunk('appliedJobs/fetchAppliedJobs', async () => {
  const token = localStorage.getItem('authToken');
  const response = await axios.get('http://localhost:5000/api/applications/my-applications', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data.map(app => app.jobId);
});

const appliedJobsSlice = createSlice({
  name: 'appliedJobs',
  initialState: {
    appliedJobs: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAppliedJobs.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAppliedJobs.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.appliedJobs = action.payload;
      })
      .addCase(fetchAppliedJobs.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(applyForJob.fulfilled, (state, action) => {
        state.appliedJobs.push(action.payload);
      });
  },
});

export default appliedJobsSlice.reducer;
