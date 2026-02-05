import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosClient from "../../../../api/axiosClient";
import axiosErrorHandler from "../../../../utils/axiosErrorHandler";


type TPropsData = {
    data: {
        examId: string;
        questionText: string;
        imageUrl: string | null;
        options: {
            text: string;
            isCorrect: boolean;
        }[];
    }
}

const thunkAddNewQuestionStandalone = createAsyncThunk('exams/thunkAddNewQuestionStandalone', async ({ data }: TPropsData, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
        const res = await axiosClient.post(`FinalExam/${data.examId}/standalone-question`, {
            examId: data.examId,
            questionText: data.questionText,
            imageUrl: data.imageUrl,
            options: data.options,
        });
        return res.data.data;
    } catch (error) {
        return rejectWithValue(axiosErrorHandler(error));
    }
});

export default thunkAddNewQuestionStandalone;