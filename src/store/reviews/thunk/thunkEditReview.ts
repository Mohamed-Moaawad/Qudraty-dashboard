import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosClient from "../../../api/axiosClient";
import axiosErrorHandler from "../../../utils/axiosErrorHandler";


type TPropsData = {
    id: string;
    isActive: boolean;
}

const thunkEditReview = createAsyncThunk('review/thunkEditReview', async ({ id, isActive }: TPropsData, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
        const res = await axiosClient.put(`admin/Rating`,
            {
                id,
                isActive,
            }
        );
        return res.data.data;
    } catch (error) {
        return rejectWithValue(axiosErrorHandler(error));
    };
});

export default thunkEditReview;