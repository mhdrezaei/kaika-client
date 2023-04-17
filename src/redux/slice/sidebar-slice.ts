import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { ISidebarState } from "../../types/redux/redux-types";

// Define the initial state using that type
const initialState: ISidebarState = {
  isOpen: false,
};

export const sidebarSlice = createSlice({
  name: "sidebar",
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
export const selectSidebar = (state: RootState) => state.sidebar;

export default sidebarSlice.reducer;
