import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { ILangState } from "../../types/redux/redux-types";

// Define the initial state using that type
const langStorage = localStorage.getItem("selected-lang");
const initialState: ILangState = {
  lang:
    langStorage || localStorage.setItem("selected-lang", navigator.language),
};

export const langSlice = createSlice({
  name: "language",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    selectlang: (state, { payload }) => {
      localStorage.setItem("selected-lang", payload);
    },
  },
});

export const langAction = langSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectlang = (state: RootState) => state.lang;

export default langSlice.reducer;
