import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    currentUser: "",
    currentUserID:null,
    loading: false,
    error: false,
    token: "",
  },
  reducers: {
    fetchStart: (state) => {
      state.loading = true;
      state.error = false;
    },
    loginSuccess: (state, { payload }) => {
      state.loading = false;
      state.currentUser = payload?.user?.username;
      state.currentUserID = payload?.user?.id;
      state.token = payload?.key;
    },
    logoutSuccess: (state) => {
      state.loading = false;
      state.currentUser = "";
      state.currentUserID = null;
      state.token = "";
    },
    registerSuccess: (state, { payload }) => {
      state.loading = false;
      state.currentUser = payload?.username;
      state.currentUserID = payload?.id;
      state.token = payload?.token;
      state.error = false;
    },
    fetchFail: (state) => {
      state.loading = false;
      state.error = true;
    },
  },
});

export const {
  fetchFail,
  fetchStart,
  registerSuccess,
  logoutSuccess,
  loginSuccess,
} = authSlice.actions;
export default authSlice.reducer;
