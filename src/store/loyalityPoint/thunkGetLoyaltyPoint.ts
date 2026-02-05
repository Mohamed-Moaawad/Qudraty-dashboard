import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosClient from "../../api/axiosClient";
import axiosErrorHandler from "../../utils/axiosErrorHandler";

const thunkGetLoyaltyPoint = createAsyncThunk('loyaltyPoint/thunkGetLoyaltyPoint', async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
        const res = await axiosClient.get(`LoyalityPoint/rules`);
        return res.data.data
    } catch (error) {
        return rejectWithValue(axiosErrorHandler(error))
    }
});

export default thunkGetLoyaltyPoint;