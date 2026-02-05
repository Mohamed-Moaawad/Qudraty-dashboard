import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosClient from "../../../api/axiosClient";
import axiosErrorHandler from "../../../utils/axiosErrorHandler";

type TPropsData = {
    title: string;
    description: string;
    media?: File;
    order: number;
};

const thunkAddNewCalmTime = createAsyncThunk('calmTime/thunkAddNewCalmTime', async ({ title, description, media, order }: TPropsData, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
        const formData = new FormData();
        formData.append('Title', title);
        formData.append('Description', description);
        if (media) {
            formData.append('Media', media);
        }
        formData.append('Order', order.toString());

        const res = await axiosClient.post(`admin/CalmTime`, formData);
        return res.data.data;
    } catch (error) {
        return rejectWithValue(axiosErrorHandler(error));
    }
});

export default thunkAddNewCalmTime;