import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosClient from "../../../../api/axiosClient";
import axiosErrorHandler from "../../../../utils/axiosErrorHandler";

const thunkDeleteQuestion = createAsyncThunk('exams/thunkDeleteQuestion', async ({ examId, questionId }: { examId: string; questionId: string; }, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
        const res = await axiosClient.delete(`FinalExam/${examId}/questions/${questionId}`);
        return res.data.data;
    } catch (error) {
        return rejectWithValue(axiosErrorHandler(error));
    }
});

export default thunkDeleteQuestion;