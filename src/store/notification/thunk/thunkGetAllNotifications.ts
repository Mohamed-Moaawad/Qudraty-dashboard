import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosClient from "../../../api/axiosClient";
import axiosErrorHandler from "../../../utils/axiosErrorHandler";

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
    sentAt: string; // ممكن تحوله لـ Date لو تحب
};

type TNotificationsData = {
    data: TNotification[];
    pageNumber: number;
    pageSize: number;
    totalRecords: number;
    totalPages: number;
};

type TResponse = {
    statusCode: number;
    meta: unknown;
    succeeded: boolean;
    message: string;
    errors: unknown[];
    data: TNotificationsData;
};

const thunkGetAllNotifications = createAsyncThunk('subscriptions/thunkGetAllNotifications', async ({ pageNumber = 1 }: { pageNumber?: number }, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
        const res = await axiosClient.get<TResponse>(`admin/Notification?pageNumber=${pageNumber}`);
        return res.data.data;
    } catch (error) {
        return rejectWithValue(axiosErrorHandler(error));
    }
});

export default thunkGetAllNotifications;