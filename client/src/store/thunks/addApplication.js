import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const addApplication = createAsyncThunk(
  "application/add",
  async (name, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/applications`,
        {
          name,
        }
      );
      return response.data.data.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export { addApplication };
