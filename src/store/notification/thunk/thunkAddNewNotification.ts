import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosClient from "../../../api/axiosClient";
import axiosErrorHandler from "../../../utils/axiosErrorHandler";

type TPropsData = {
    data: {
        title: string,
        body: string,
        data: null,
        targetUserType: number,
        targetSubscriptionPlanId: null,
    }
}

const thunkAddNewNotification = createAsyncThunk('subscriptions/thunkAddNewNotification', async ({ data }: TPropsData, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
        const res = await axiosClient.post(`admin/Notification/send`, data);
        return res.data.data;
    } catch (error) {
        return rejectWithValue(axiosErrorHandler(error));
    }
});

export default thunkAddNewNotification;