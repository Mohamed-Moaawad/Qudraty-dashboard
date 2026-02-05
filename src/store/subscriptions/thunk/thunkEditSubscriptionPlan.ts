import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosClient from "../../../api/axiosClient";
import axiosErrorHandler from "../../../utils/axiosErrorHandler";

type TPropsData = {
    data: {
        id: string;
        name: string | null;
        price: number | null;
        description: string | null;
        durationInDays: number | null;
        isActive: boolean | null;
    }
}

const thunkEditSubscriptionPlan = createAsyncThunk('subscriptions/thunkEditSubscriptionPlan', async ({ data }: TPropsData, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
        const res = await axiosClient.put(`admin/Subscription`, data);
        return res.data.data;
    } catch (error) {
        return rejectWithValue(axiosErrorHandler(error));
    }
});

export default thunkEditSubscriptionPlan;

