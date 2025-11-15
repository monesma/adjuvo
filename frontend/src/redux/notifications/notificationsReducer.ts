import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { NotificationQuery } from '../../types/notification-types';

interface NotificationsState {
  infos: NotificationQuery[];
  count: number;
}

const initialState: NotificationsState = {
  infos: [],
  count: 0,
};

const notificationSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    setNotifications: (state, action: PayloadAction<NotificationQuery[]>) => {
      state.infos = action.payload;
      state.count = action.payload.length;
    },
    clearNotifications: (state) => {
      state.infos = [];
      state.count = 0;
    },
  },
});

export const { setNotifications, clearNotifications } = notificationSlice.actions;
export const selectNotifications = (state: unknown) => state.notifications;
export default notificationSlice.reducer;
