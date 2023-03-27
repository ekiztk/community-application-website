//modal yapıyoruz
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  modals: [],
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    append: (state, action) => {
      state.modals.push({ ...action.payload });
    },
    destroy: (state) => {
      const data = [...state.modals];
      data.pop();
      state.modals = data;
    },
    destroyAll: (state) => {
      state.modals = [];
    },
  },
});

export const { append, destroy, destroyAll } = modalSlice.actions;
export const modalReducer = modalSlice.reducer;
