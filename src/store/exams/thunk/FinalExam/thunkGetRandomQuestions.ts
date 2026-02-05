import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosClient from "../../../../api/axiosClient";
import axiosErrorHandler from "../../../../utils/axiosErrorHandler";

type TPropsData = {
    subjectId: string;
    pageNumber: number;
}

const thunkGetRandomQuestions = createAsyncThunk('exams/thunkGetRandomQuestions', async ({ subjectId, pageNumber }: TPropsData, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
        const res = await axiosClient.get(`FinalExam/random-questions`, {
            params: {
                subjectId,
                pageNumber,
            }
        });
        return res.data.data;
    } catch (error) {
        return rejectWithValue(axiosErrorHandler(error));
    };
});

export default thunkGetRandomQuestions;