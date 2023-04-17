import { createSlice } from "@reduxjs/toolkit";
import { RootState, store } from "../store";
import { IAlertState } from "../../types/redux/redux-types";
import { colors } from "@material-tailwind/react/types/generic";

// Define the initial state using that type
const initialState: IAlertState = {
  isOpen: false,
  message: "",
  color: "green",
};

export const alertSlice = createSlice({
  name: "alert",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    close: (state) => {
      state.isOpen = false;
      state.message = "";
    },
    open: (
      state,
      { payload }: { payload: { message: string; color: colors } }
    ) => {
      state.isOpen = true;
      state.message = payload.message;
      state.color = payload.color;
    },
  },
});

export const alertAction = alertSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectAlert = (state: RootState) => state.alert;

export default alertSlice.reducer;
