import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosClient from "../../../../api/axiosClient";
import axiosErrorHandler from "../../../../utils/axiosErrorHandler";


type TPropsData = {
    examId: string;
}

const thunkGetSingleFinalExam = createAsyncThunk('exams/thunkGetSingleFinalExam', async ({ examId }: TPropsData, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
        const res = await axiosClient.get(`FinalExam/${examId}`);
        return res.data.data;
    } catch (error) {
        return rejectWithValue(axiosErrorHandler(error));
    };
});

export default thunkGetSingleFinalExam;