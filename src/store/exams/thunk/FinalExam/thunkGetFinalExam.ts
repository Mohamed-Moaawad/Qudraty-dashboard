import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosClient from "../../../../api/axiosClient";
import axiosErrorHandler from "../../../../utils/axiosErrorHandler";

type TPropsData = {
    pageNumber?: number;
    pageSize?: number;
    IsActive?: boolean;
}

const thunkGetFinalExam = createAsyncThunk('exams/thunkGetFinalExam', async ({ pageNumber, pageSize, IsActive = true }: TPropsData, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
        const res = await axiosClient.get(`FinalExam`,
            {
                params: {
                    pageNumber,
                    pageSize,
                    IsActive,
                }
            }
        )
        return res.data.data;
    } catch (error) {
        return rejectWithValue(axiosErrorHandler(error));
    }
});

export default thunkGetFinalExam;