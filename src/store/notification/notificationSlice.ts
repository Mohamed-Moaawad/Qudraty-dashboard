import { createSlice } from "@reduxjs/toolkit";
import type { TLoading } from "../../types/types";
import thunkGetAllNotifications from "./thunk/thunkGetAllNotifications";
import { isString } from "../../utils/guards";


type TNotification = {
    id: string;
    title: string;
    body: string;
    targetUserType: string | null;
    targetSubscriptionPlanId: string | null;
    targetSubscriptionPlanName: string | null;
    totalRecipients: number;
    successCount: number;
    failureCount: number;
    sentAt: string; // أو Date لو هتحولها
};

type TInitialState = {
    notifications: TNotification[];
    pageNumber: number;
    pageSize: number;
    totalRecords: number;
    totalPages: number;
    loading: TLoading;
    error: string | null;
}

const initialState: TInitialState = {
    notifications: [],
    pageNumber: 1,
    pageSize: 10,
    totalRecords: 0,
    totalPages: 0,
    loading: 'idle',
    error: null
}

const notificationSlice = createSlice({
    name: 'notifications',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(thunkGetAllNotifications.pending, (state) => {
                state.loading = 'pending';
                state.error = null
            })
            .addCase(thunkGetAllNotifications.fulfilled, (state, action) => {
                state.loading = 'succeeded';
                state.notifications = action.payload.data;
                state.pageNumber = action.payload.pageNumber;
                state.pageSize = action.payload.pageSize;
                state.totalPages = action.payload.totalPages;
                state.totalRecords = action.payload.totalRecords;
            })
            .addCase(thunkGetAllNotifications.rejected, (state, action) => {
                state.loading = 'failed';
                if (isString(action.payload)) {
                    state.error = action.payload;
                }
            })
    },
});

export default notificationSlice.reducer;