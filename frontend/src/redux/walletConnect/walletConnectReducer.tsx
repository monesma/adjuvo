import { createSlice } from "@reduxjs/toolkit";

const walletConnectSlice = createSlice({
  name: "walletConnectSlice",
  initialState: {
    isConnected: false,
    accountId: ""
  },
  reducers: {
    setIsConnected: (state, action: { payload: boolean }) => {
      state.isConnected = action.payload;
    },
    setAccountId: (state, action: { payload: string }) => {
      state.accountId = action.payload;
    }
  },
});

export const {setIsConnected, setAccountId} = walletConnectSlice.actions

export default walletConnectSlice.reducer;
