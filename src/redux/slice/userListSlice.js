import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const userList = createAsyncThunk("user/userList", async () => {
  try {
    const response = await fetch("https://reqres.in/api/users");
    if (!response.ok) {
      throw new Error("Failed to get user data");
    }
    const data = await response.json();
    console.log(data.data);
    return data.data;
  } catch (error) {
    console.log("error get data", error);
    throw error;
  }
});

const userSlice = createSlice({
  name: "user",
  initialState: {
    userData: null,
    status: "idle",
    error: null,
  },
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(userList.pending, (state) => {
        state.status = "loading";
      })
      .addCase(userList.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.userData = action.payload;
      })
      .addCase(userList.rejected, (state, action) => {
        state.status = "failed";
        state.userData = action.error.message;
      });
  },
});

export default userSlice.reducer;
