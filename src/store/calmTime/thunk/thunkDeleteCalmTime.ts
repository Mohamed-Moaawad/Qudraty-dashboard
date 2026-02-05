import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosClient from "../../../api/axiosClient";
import axiosErrorHandler from "../../../utils/axiosErrorHandler";

type TPropsData = {
    id: string;
};

const thunkDeleteCalmTime = createAsyncThunk('calmTime/thunkDeleteCalmTime', async ({ id }: TPropsData, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
        const res = await axiosClient.delete(`admin/CalmTime/${id}`);
        return res.data.data;
    } catch (error) {
        return rejectWithValue(axiosErrorHandler(error));
    }
});

export default thunkDeleteCalmTime;