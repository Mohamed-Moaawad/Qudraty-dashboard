import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosClient from "../../../api/axiosClient";
import axiosErrorHandler from "../../../utils/axiosErrorHandler";

type TPropsData = {
    title: string;
    description: string;
    imageUrl: File;
    authorUrl: string;
    order: number;
}

const thunkAddNewAdvertisement = createAsyncThunk('calmTime/thunkAddNewAdvertisement', async ({ title, description, imageUrl, authorUrl, order }: TPropsData, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
        const formData = new FormData();
        formData.append('Title', title);
        formData.append('Description', description);
        formData.append('ImageUrl', imageUrl);
        formData.append('AuthorUrl', authorUrl);
        formData.append('Order', order.toString());

        const res = await axiosClient.post(`admin/Advertisment`, formData);
        return res.data.data;
    } catch (error) {
        return rejectWithValue(axiosErrorHandler(error));
    }
});

export default thunkAddNewAdvertisement;