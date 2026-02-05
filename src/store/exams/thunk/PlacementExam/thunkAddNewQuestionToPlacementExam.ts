import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosClient from "../../../../api/axiosClient";
import axiosErrorHandler from "../../../../utils/axiosErrorHandler";

type TPropsData = {
    data: {
        questionText: string,
        imageUrl?: string,
        options: {
            text: string,
            isCorrect: boolean
        }[]
    }
}

const thunkAddNewQuestionToPlacementExam = createAsyncThunk('exams/thunkAddNewQuestionToPlacementExam', async ({ data }: TPropsData, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
        const newData = {
            questionText: data.questionText,
            imageUrl: data.imageUrl,
            type: 0,
            options: data.options
        }
        const res = await axiosClient.post(`admin/PlacementExam`, newData);
        return res.data.data;
    } catch (error) {
        return rejectWithValue(axiosErrorHandler(error));
    };
});

export default thunkAddNewQuestionToPlacementExam;