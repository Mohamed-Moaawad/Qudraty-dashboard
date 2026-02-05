import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosClient from "../../../api/axiosClient";
import axiosErrorHandler from "../../../utils/axiosErrorHandler";

type TPropsData = {
    data: {
        name: string;
        price: number;
        description: string;
        durationInDays: number;
    }
}

const thunkAddSubscriptionPlan = createAsyncThunk('subscriptions/thunkAddSubscriptionPlan', async ({ data }: TPropsData, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
        const res = await axiosClient.post(`admin/Subscription/`, data);
        return res.data.data;
    } catch (error) {
        return rejectWithValue(axiosErrorHandler(error));
    }
});

export default thunkAddSubscriptionPlan;