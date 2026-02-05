import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosClient from "../../../api/axiosClient";
import axiosErrorHandler from "../../../utils/axiosErrorHandler";

type TData = {
    subjectName: string;
    image: File;
    subjectDescription: string;
    curriculum: string;
}

const thunkAddNewSubject = createAsyncThunk('subjects/thunkAddNewSubject', async (data: TData, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
        const subjectData = new FormData();
        subjectData.append("Name", data.subjectName);
        subjectData.append("Image", data.image);
        subjectData.append("Description", data.subjectDescription);
        subjectData.append("SubjectTypeId", data.curriculum);

        const res = await axiosClient.post(`admin/Subject`, subjectData);
        return res.data.data;
    } catch (error) {
        return rejectWithValue(axiosErrorHandler(error));
    }
});

export default thunkAddNewSubject;