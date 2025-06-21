import { createSlice } from "@reduxjs/toolkit";
import { nanoid } from "nanoid";
import { toast } from "react-toastify";
const initialState = [];
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    registerUser: (state, action) => {
      state.push({
        id: nanoid(),
        isLogin: false,
        ...action.payload,
      });
    },
    loginUser: (state, action) => {
      const foundUser = state.find(
        (user) =>
          user.userEmail === action.payload.email &&
          user.userPassword === action.payload.password
      );
      if (foundUser) {
        foundUser.isLogin = true;
        toast.success("User logged in successfully.");
      } else {
        toast.error("No user found with these credentials.");
      }
    },
    logoutUser: (state, action) => {
      const foundUser = state.find((user) => user.id === action.payload);
      if (foundUser) foundUser.isLogin = false;
      toast.success("User logged out successfully");
    },
  },
});
export const { registerUser, loginUser, logoutUser } = userSlice.actions;
export default userSlice.reducer;
