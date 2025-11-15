import { createSlice } from "@reduxjs/toolkit";

const metamaskSlice = createSlice({
  name: "metamaskSlice",
  initialState: {
    metamaskAccountAddress: ""
  },
  reducers: {
    setMetamaskAccountAddress: (state, action: { payload: string }) => {
      state.metamaskAccountAddress = action.payload;
    }
  },
});

export const actions = {
  metamask: metamaskSlice.actions,
};
export const {setMetamaskAccountAddress} = metamaskSlice.actions
export default metamaskSlice.reducer;
