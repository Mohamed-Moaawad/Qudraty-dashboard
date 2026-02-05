import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosClient from "../../../api/axiosClient";
import axiosErrorHandler from "../../../utils/axiosErrorHandler";

const thunkGetSingleAdvertisement = createAsyncThunk('calmTime/thunkGetSingleAdvertisement', async ({ id }: { id: string }, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
        const res = await axiosClient.get(`admin/Advertisment/${id}`);
        return res.data.data;
    } catch (error) {
        return rejectWithValue(axiosErrorHandler(error));
    }
});

export default thunkGetSingleAdvertisement;