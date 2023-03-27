import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const fetchApplication = createAsyncThunk(
  "application/fetch",
  async ({ id = false, slug = false }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        slug === false
          ? `${process.env.REACT_APP_API_URL}/applications/${id}`
          : `${process.env.REACT_APP_API_URL}/applications?slug=${slug}`
      );
      await pause(1000); //DEV ONLY!
      console.log(response.data.data.data);
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
//yüklemeyi yavaşlatacak
const pause = (duration) => {
  return new Promise((resolve) => {
    setTimeout(resolve, duration);
  });
};

export { fetchApplication };
