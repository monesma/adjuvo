import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { BuilderQuery } from '../../types/builder-types';

interface BuilderState {
    infos: BuilderQuery | null;
    isLogged: boolean;
}

const initialState: BuilderState = {
  infos: null,
  isLogged: false,
};

const builderSlice = createSlice({
  name: 'builder',
  initialState,
  reducers: {
    loginBuilder: (
      state,
      action: PayloadAction<BuilderQuery>
    ) => {
      state.infos = action.payload;
      state.isLogged = true;
    },
    logoutBuilder: (state) => {
      state.infos = null;
      state.isLogged = false;
    },
  },
});

export const { loginBuilder, logoutBuilder } = builderSlice.actions;
export const selectBuilder = (state: unknown) => state.builder;
export default builderSlice.reducer;
