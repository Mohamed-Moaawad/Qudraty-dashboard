import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosClient from "../../../api/axiosClient";
import axiosErrorHandler from "../../../utils/axiosErrorHandler";

type TPropsData = {
    title: string;
    description: string;
    file: File;
    subjectId: string;
}

const thunkUploadNewBook = createAsyncThunk('books/thunkUploadNewBook', async ({ title, description, file, subjectId }: TPropsData, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
        const formData = new FormData();
        formData.append('Title', title);
        formData.append('Description', description);
        formData.append('File', file);
        formData.append('SubjectId', subjectId);
        const res = await axiosClient.post(`admin/Book`, formData);
        return res.data.data;
    } catch (error) {
        return rejectWithValue(axiosErrorHandler(error));
    }
});

export default thunkUploadNewBook;