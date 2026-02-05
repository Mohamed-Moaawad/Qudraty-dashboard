import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosClient from "../../api/axiosClient";
import axiosErrorHandler from "../../utils/axiosErrorHandler";

const thunkGetSubjectType = createAsyncThunk('subjectType/subjectTypeSlice', async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
        const res = await axiosClient.get(`admin/SubjectType`);
        return res.data.data;
    } catch (error) {
        return rejectWithValue(axiosErrorHandler(error));
    }
});

export default thunkGetSubjectType;