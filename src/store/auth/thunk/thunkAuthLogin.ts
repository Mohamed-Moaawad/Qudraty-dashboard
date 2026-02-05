import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosClient from "../../../api/axiosClient";
import axiosErrorHandler from "../../../utils/axiosErrorHandler";

type TFormData = {
    email: string;
    password: string;
}

type TResponse = {
    statusCode: number;
    meta: unknown;
    succeeded: boolean;
    message: string | null;
    errors: string[];
    data: {
        accessToken: string;
        refreshToken: string;
        userId: string;
        fullName: string;
        email: string;
        phoneNumber: string;
        roles: string[];
    }
}

const thunkAuthLogin = createAsyncThunk('auth/thunkAuthLogin', async (formData: TFormData, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
        const res = await axiosClient.post<TResponse>('/admin/auth/login', formData);
        return res.data.data;
    } catch (error) {
        return rejectWithValue(axiosErrorHandler(error));
    }
});

export default thunkAuthLogin;