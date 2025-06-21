import { createSlice } from "@reduxjs/toolkit";
import { nanoid } from "nanoid";
import { toast } from "react-toastify";
import { currentDateAndTime, currentDate } from "../../../utils/dateTime";
const initialState = [];
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    registerUser: (state, action) => {
      state.push({
        id: nanoid(),
        isLogin: false,
        joinedOn: currentDate(),
        loginHistory: [],
        loginTime: null,
        gender: "",
        dob: "",
        address: "",
        mobileNo: "",
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
        const timeStamp = currentDateAndTime();
        foundUser.isLogin = true;
        foundUser.loginTime = timeStamp;
        foundUser.loginHistory = [timeStamp, ...(foundUser.loginHistory || [])]
          .sort((a, b) => new Date(b) - new Date(a))
          .slice(0, 8);
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
    updateProfile: (state, action) => {
      const user = state.find((u) => u.id === action.payload.id);
      if (user) {
        Object.assign(user, action.payload);
        toast.success("Profile updated.");
      }
    },
  },
});
export const { registerUser, loginUser, logoutUser, updateProfile } =
  userSlice.actions;
export const selectLoggedInUser = (state) => state.user.find((u) => u.isLogin);
export default userSlice.reducer;
