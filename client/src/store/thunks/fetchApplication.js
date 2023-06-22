import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const fetchApplication = createAsyncThunk(
  'application/fetch',
  async ({ id = false, slug = false }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        slug === false
          ? `${import.meta.env.VITE_API_URL}/applications/${id}`
          : `${import.meta.env.VITE_API_URL}/applications?slug=${slug}`
      );
      await pause(1000); //DEV ONLY!
      return slug === false
        ? response.data.data.data
        : response.data.data.data[0];
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

// fetchApplication.pending
// fetchApplication.fulfilled
// fetchApplication.rejected

//DEV ONLY!!
//slows the speed of loading down
const pause = (duration) => {
  return new Promise((resolve) => {
    setTimeout(resolve, duration);
  });
};

export { fetchApplication };
