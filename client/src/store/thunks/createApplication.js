import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const createApplication = createAsyncThunk(
  "application/create",
  async ({ application, token }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/applications`,
        {
          ...application,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return response.data.data.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export { createApplication };
