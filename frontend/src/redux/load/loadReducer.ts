import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from "..";

const initialState: { isLoading: boolean, message: string | null } = {
  isLoading: false,
  message: null
};

export const loadSlice = createSlice({
  name: "load",
  initialState,
  reducers: {
    changeIsLoading: (state, action: PayloadAction<{isLoading: boolean, message: string | null}>) => {
      state.isLoading = action.payload.isLoading;
      state.message = action.payload.message;
    },
  },
});

export const { changeIsLoading } = loadSlice.actions;
export const selectLoad = (state: RootState) => state.load;
export default loadSlice.reducer;
