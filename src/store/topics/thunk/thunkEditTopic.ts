import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosClient from "../../../api/axiosClient";
import axiosErrorHandler from "../../../utils/axiosErrorHandler";




type TEditTopicQuestionsProps = {
    data: {
        Id: number;
        Title: string;
        SubjectId: string;
        Video: string;
        Duration?: number;
        order: number;
        IsActive: boolean;
    }
};

const thunkEditTopic = createAsyncThunk('topics/thunkEditTopic', async ({ data }: TEditTopicQuestionsProps, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
        const formData = new FormData();
        formData.append('Id', data.Id.toString());
        formData.append('Title', data.Title);
        formData.append('SubjectId', data.SubjectId);
        formData.append('Video', data.Video);
        formData.append('order', data.order.toString());
        formData.append('IsActive', data.IsActive.toString());  // boolean كـ string


        const res = await axiosClient.put(`admin/Topic`, formData);
        return res.data.data;
    } catch (error) {
        return rejectWithValue(axiosErrorHandler(error));
    }
});

export default thunkEditTopic;