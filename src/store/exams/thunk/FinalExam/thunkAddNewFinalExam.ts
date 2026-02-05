import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosClient from "../../../../api/axiosClient";
import axiosErrorHandler from "../../../../utils/axiosErrorHandler";


type TPropsData = {
    data: {
        title: string;
        description: string;
        subjectId: string;
    }
}

const thunkAddNewFinalExam = createAsyncThunk('exams/thunkAddNewFinalExam', async ({ data }: TPropsData, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
        const res = await axiosClient.post(`FinalExam`, data);
        return res.data.data
    } catch (error) {
        return rejectWithValue(axiosErrorHandler(error));
    }
});

export default thunkAddNewFinalExam;