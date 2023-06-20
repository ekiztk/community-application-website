import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const removeApplication = createAsyncThunk(
  "application/remove",
  async ({ id, token }, { rejectWithValue }) => {
    try {
      // eslint-disable-next-line no-unused-vars
      const response = await axios.delete(
        `${import.meta.env.VITE_API_URL}/applications/${id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return {};
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export { removeApplication };
