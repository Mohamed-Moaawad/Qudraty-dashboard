import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosClient from "../../../api/axiosClient";
import axiosErrorHandler from "../../../utils/axiosErrorHandler";

type TOption = {
    text: string;
    isCorrect: boolean;
};

type TQuestion = {
    text: string;
    imageUrl?: string
    topicId: number;
    timestamp?: string;
    options: TOption[];
};

type TPropsData = {
    data: TQuestion;
};


const thunkAddNewQuestion = createAsyncThunk('topics/thunkAddNewQuestion', async ({ data }: TPropsData, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
        const res = await axiosClient.post(`admin/Topic/question`, data);
        return res.data.data;
    } catch (error) {
        return rejectWithValue(axiosErrorHandler(error));
    }
});

export default thunkAddNewQuestion;