import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosClient from "../../../api/axiosClient";
import axiosErrorHandler from "../../../utils/axiosErrorHandler";

type TDataType = {
    parentID: string;
}

const getParentById = createAsyncThunk('users/thunkUserDetails', async ({ parentID }: TDataType, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
        const res = await axiosClient.get(`Account/parent/${parentID}`);
        return res.data.data;
    } catch (error) {
        return rejectWithValue(axiosErrorHandler(error));
    }
});

export default getParentById;