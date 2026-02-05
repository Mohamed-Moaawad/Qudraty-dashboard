import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosClient from "../../../api/axiosClient";
import axiosErrorHandler from "../../../utils/axiosErrorHandler";

type TDataProps = {
    subjectId: string;
    isActive?: boolean;
}

const thunkGetTopics = createAsyncThunk('topics/thunkGetTopics', async ({ subjectId, isActive = true }: TDataProps, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
        const res = await axiosClient.get(`/admin/Topic?SubjectId=${subjectId}&IsActive=${isActive}`);
        return res.data.data
    } catch (error) {
        return rejectWithValue(axiosErrorHandler(error));
    }
});

export default thunkGetTopics;