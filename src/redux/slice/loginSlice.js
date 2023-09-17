import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const loginUser = createAsyncThunk(
  "login/loginUser",
  async (userData) => {
    try {
      const response = await fetch("https://reqres.in/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });
      const data = await response.json();
      localStorage.setItem("token", data.token);
      console.log(data);
      return data;
    } catch (error) {
      console.log("error try ctach", error);
      throw error;
    }
  }
);

const loginSlice = createSlice({
  name: "login",
  initialState: {
    token: null,
    status: "idle",
    error: null,
  },

  reducers: {},

  extraReducers: (bulider) => {
    bulider
      .addCase(loginUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.token = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default loginSlice.reducer;
