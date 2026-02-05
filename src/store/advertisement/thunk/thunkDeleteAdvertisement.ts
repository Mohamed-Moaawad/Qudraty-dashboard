import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosClient from "../../../api/axiosClient";
import axiosErrorHandler from "../../../utils/axiosErrorHandler";

type TPropsData = {
    data: {
        id: string;
        title: string;
        description: string;
        imageUrl: string;
        authorUrl: string;
        order: number;
        isActive: boolean;
    }
};

const thunkDeleteAdvertisement = createAsyncThunk('calmTime/thunkDeleteAdvertisement', async ({ data }: TPropsData, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
        const formData = new FormData();
        formData.append('Id', data.id);
        formData.append('title', data.title);
        formData.append('description', data.description);
        formData.append('imageUrl', data.imageUrl);
        formData.append('authorUrl', data.authorUrl);
        formData.append('order', data.order.toString());
        formData.append('isActive', data.isActive.toString());
        const res = await axiosClient.put(`admin/Advertisment`, formData);
        return res.data.data;
    } catch (error) {
        return rejectWithValue(axiosErrorHandler(error));
    }
});

export default thunkDeleteAdvertisement;