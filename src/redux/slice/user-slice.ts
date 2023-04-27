import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { IUserState } from "../../types/redux/redux-types";

// Define the initial state using that type
const userStorage = localStorage.getItem("user");
const initialState: IUserState =
  userStorage !== null && userStorage !== "" && userStorage !== "{}"
    ? JSON.parse(userStorage)
    : null;

export const userSlice = createSlice({
  name: "user",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setUser: (state, { payload }) => {
      localStorage.setItem("user", JSON.stringify(payload));
      return payload;
    },
  },
});

export const userAction = userSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectUser = (state: RootState) => state.user;

export default userSlice.reducer;
