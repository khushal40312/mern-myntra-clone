import { createSlice } from '@reduxjs/toolkit';

const adminSlice = createSlice({
  name: 'admin',
  initialState: {
    isAdmin: false,
  },
  reducers: {
    setAdminTrue: (state) => {
      state.isAdmin = true;
    },
    setAdminFalse: (state) => {
      state.isAdmin = false;
    },
    toggleAdmin: (state) => {
      state.isAdmin = !state.isAdmin;
    }
  }
});

export const { setAdminTrue, setAdminFalse, toggleAdmin } = adminSlice.actions;

export default adminSlice.reducer;
