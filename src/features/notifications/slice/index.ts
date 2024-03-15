import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PURGE } from "redux-persist";
import type { RootState } from "../../../src/store";
import type { Notification, NotificationsGroup } from "../types";

interface NotificationsState {
  inbox: NotificationsGroup;
  archived: NotificationsGroup;
}

const initialState: NotificationsState = {
  inbox: {},
  archived: {},
};

export const notificationsSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    setArchiveNotification: (state, action: PayloadAction<{ id: string }>) => {
      const { id } = action.payload;
      state.archived[id] = state.inbox[id];
      delete state.inbox[id];
    },
    setArchiveAllNotifications: (state) => {
      state.archived = { ...state.archived, ...state.inbox };
      state.inbox = {};
    },
    setUnarchiveNotification: (
      state,
      action: PayloadAction<{ id: string }>
    ) => {
      const { id } = action.payload;
      state.inbox[id] = state.archived[id];
      delete state.archived[id];
    },
    setAddNewNotification: (
      state,
      action: PayloadAction<{ notification: Notification }>
    ) => {
      const { notification } = action.payload;
      state.inbox[notification.id] = notification;
    },
    setNotifications: (
      state,
      action: PayloadAction<{
        notifications: NotificationsGroup;
        archivedIds: string[];
      }>
    ) => {
      const { notifications, archivedIds } = action.payload;
      let archived = {} as NotificationsGroup;
      let inbox = {} as NotificationsGroup;
      Object.keys(notifications).forEach((id) => {
        if (archivedIds.includes(id)) {
          archived[id] = notifications[id];
        } else {
          inbox[id] = notifications[id];
        }
      });
      state.archived = archived;
      state.inbox = inbox;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(PURGE, () => {
      return initialState;
    });
  },
});

export const {
  setArchiveNotification,
  setUnarchiveNotification,
  setNotifications,
  setAddNewNotification,
  setArchiveAllNotifications,
} = notificationsSlice.actions;

export const selectNotificationsSlice = (state: RootState) =>
  state.notifications;

export default notificationsSlice.reducer;
