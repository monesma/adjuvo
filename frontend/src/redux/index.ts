import { configureStore } from "@reduxjs/toolkit";
import walletConnect from "./walletConnect/walletConnectReducer"
import metamask from "./metamask/metamaskReducer"
import load from './load/loadReducer'
import builder from './builder/builderReducer'
import hederaApp from './hederaApp/hederaAppReducer'
import notifications from './notifications/notificationsReducer'

export const store = configureStore({
  reducer:{
    walletConnect,
    metamask,
    load,
    builder,
    hederaApp,
    notifications
  },
})


export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
