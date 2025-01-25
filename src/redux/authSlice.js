import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk for login
export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password }, { rejectWithValue }) => {
       
    const api = "AIzaSyCq9nTHRqa26QG8-FwNFlSDBNo4kN5pyk0";
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${api}`;

    try {
      const response = await axios.post(url, {
        email,
        password,
      });
      return response.data; // Assuming the API returns user details
    } catch (error) {
        console.log(error)
      return rejectWithValue(error.response?.data?.error?.message || "Login failed");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    loading: false,
    error: null,
  },
  reducers: {
    logout(state) {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
