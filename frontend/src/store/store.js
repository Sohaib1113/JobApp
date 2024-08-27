
import { configureStore } from '@reduxjs/toolkit';
import jobsReducer from '../features/jobs/jobsSlice';
import appliedJobsReducer from '../features/appliedJobs/appliedJobsSlice';

const store = configureStore({
  reducer: {
    jobs: jobsReducer,
    appliedJobs: appliedJobsReducer,
  },
});

export default store;
