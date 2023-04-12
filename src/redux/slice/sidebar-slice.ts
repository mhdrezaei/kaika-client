import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import { sidebarState } from "../../types/redux/redux-types";

// Define the initial state using that type
const initialState: sidebarState = {
  isOpen: false,
};

export const sidebarSlice = createSlice({
  name: "counter",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    close: (state) => {
      state.isOpen = false;
    },
    open: (state) => {
      state.isOpen = true;
    },
  },
});

export const sidebarAction = sidebarSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.sidebar;

export default sidebarSlice.reducer;
