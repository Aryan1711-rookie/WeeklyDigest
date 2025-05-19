import { createSlice } from "@reduxjs/toolkit";

let storedUser = null;
try {
  const userData = localStorage.getItem("user");
  storedUser = userData ? JSON.parse(userData) : null;
} catch (error) {
  storedUser = null;
  localStorage.removeItem("user");
}

const authSlice = createSlice({
  name: "auth",
  initialState: {
    loading: false,
    user: storedUser,
    error: null,
  },
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    logoutUser: (state) => {
      state.user = null;
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      sessionStorage.removeItem("token");
    },
  },
});

export const { setLoading, setUser, logoutUser, setError } = authSlice.actions;
export default authSlice.reducer;
