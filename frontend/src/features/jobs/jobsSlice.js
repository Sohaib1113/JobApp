import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk to apply for a job
export const applyForJob = createAsyncThunk(
  'jobs/applyForJob',
  async (jobId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('authToken');
      const response = await axios.post(
        `http://localhost:5000/api/applications/apply`,
        { jobId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const jobsSlice = createSlice({
  name: 'jobs',
  initialState: {
    jobs: [],
    appliedJobs: [],
    status: 'idle',
    error: null,
  },
  reducers: {
    setJobs(state, action) {
      state.jobs = action.payload;
    },
    setAppliedJobs(state, action) {
      state.appliedJobs = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(applyForJob.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(applyForJob.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.appliedJobs.push(action.payload.jobId); // Assuming the response contains jobId
      })
      .addCase(applyForJob.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const { setJobs, setAppliedJobs } = jobsSlice.actions;

export default jobsSlice.reducer;
