import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PURGE } from "redux-persist";
import type { NotificationsGroup } from "../types";
import type { RootState } from "../../../store";

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
    setUnarchiveNotification: (
      state,
      action: PayloadAction<{ id: string }>
    ) => {
      const { id } = action.payload;
      state.inbox[id] = state.archived[id];
      delete state.archived[id];
    },
    setDeleteNotification: (state, action: PayloadAction<{ id: string }>) => {
      const { id } = action.payload;
      delete state.inbox[id];
      delete state.archived[id];
    },
    setNotifications: (
      state,
      action: PayloadAction<{
        notifications: NotificationsGroup;
        archivedIds: string[];
      }>
    ) => {
      const { notifications, archivedIds } = action.payload;
      console.log({ notifications, archivedIds });
      state.archived = Object.keys(notifications).reduce((acc, id) => {
        if (archivedIds.includes(id)) {
          acc[id] = notifications[id];
        }
        return acc;
      }, {} as NotificationsGroup);
      state.inbox = Object.keys(notifications).reduce((acc, id) => {
        if (!archivedIds.includes(id)) {
          acc[id] = notifications[id];
        }
        return acc;
      }, {} as NotificationsGroup);
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
  setDeleteNotification,
  setNotifications,
} = notificationsSlice.actions;

export const selectNotificationsSlice = (state: RootState) =>
  state.notifications;

export default notificationsSlice.reducer;
