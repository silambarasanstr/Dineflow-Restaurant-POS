import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { getProfile } from "./authService";

// Restore logged-in user when the app starts
export const restoreSession = createAsyncThunk(
  "auth/restoreSession",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getProfile();

      return response.data;
    } catch (error) {
      localStorage.removeItem("token");

      return rejectWithValue(
        error.response?.data?.message || "Session expired",
      );
    }
  },
);

const token = localStorage.getItem("token");

const initialState = {
  user: null,
  token,
  isAuthenticated: !!token,
  loading: !!token,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,

  reducers: {
    loginSuccess: (state, action) => {
      const { user, token } = action.payload;

      state.user = user;
      state.token = token;
      state.isAuthenticated = true;
      state.loading = false;
      state.error = null;
    },

    logout: (state) => {
      localStorage.removeItem("token");

      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.loading = false;
      state.error = null;
    },

    clearAuthError: (state) => {
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder
      // Restore session
      .addCase(restoreSession.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(restoreSession.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = localStorage.getItem("token");
        state.isAuthenticated = true;
        state.loading = false;
        state.error = null;
      })

      .addCase(restoreSession.rejected, (state, action) => {
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
        state.loading = false;
        state.error = action.payload || "Session expired";
      });
  },
});

export const { loginSuccess, logout, clearAuthError } = authSlice.actions;

export default authSlice.reducer;
