import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { HederaAppQuery } from '../../types/hederaApp-types';

interface HederaAppState {
    infos: HederaAppQuery | null;
    isLogged: boolean;
}

const initialState: HederaAppState = {
  infos: null,
  isLogged: false,
};


const hederaAppSlice = createSlice({
  name: 'hederaApp',
  initialState,
  reducers: {
    loginHederaApp: (
      state,
      action: PayloadAction<HederaAppQuery>
    ) => {
      state.infos = action.payload;
      state.isLogged = true;
    },
    logoutHederaApp: (state) => {
      state.infos = null;
      state.isLogged = false;
    },
  },
});

export const { loginHederaApp, logoutHederaApp } = hederaAppSlice.actions;
export const selectHederaApp = (state: unknown) => state.hederaApp;
export default hederaAppSlice.reducer;
