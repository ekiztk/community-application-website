import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const removeApplication = createAsyncThunk(
  "application/remove",
  async ({ id, token }, { rejectWithValue }) => {
    try {
      console.log(id);
      const response = await axios.delete(
        `${process.env.REACT_APP_API_URL}/applications/${id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      //fix
      return {};
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export { removeApplication };
