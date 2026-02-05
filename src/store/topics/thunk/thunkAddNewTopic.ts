import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosClient from "../../../api/axiosClient";
import axiosErrorHandler from "../../../utils/axiosErrorHandler";

type TQuestionOption = {
    text: string;
    isCorrect: boolean;
};

type TQuestion = {
    text: string;
    timestamp: string;
    options: TQuestionOption[];
};

type TPropsData = {
    data: {
        lessonName: string;
        lessonNumber: number;
        video: File;
        QuestionsJson: TQuestion[];
    };
    subjectId: string;
};



const thunkAddNewTopic = createAsyncThunk('topics/thunkAddNewTopic', async ({ data, subjectId }: TPropsData, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
        const formData = new FormData();
        formData.append("Title", data.lessonName);
        formData.append("SubjectId", subjectId);
        formData.append("Video", data.video); // الملف نفسه
        formData.append("Duration", "1");
        formData.append("order", data.lessonNumber.toString());
        formData.append("QuestionsJson", JSON.stringify(data.QuestionsJson));


        const res = await axiosClient.post(`admin/Topic`, formData);
        return res.data.data;
    } catch (error) {
        return rejectWithValue(axiosErrorHandler(error));
    }
});

export default thunkAddNewTopic;