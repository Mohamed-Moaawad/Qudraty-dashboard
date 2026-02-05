import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosClient from "../../../api/axiosClient";
import axiosErrorHandler from "../../../utils/axiosErrorHandler";

type TResponse = {
    statusCode: number;
    meta: unknown;
    succeeded: boolean;
    message: string | null;
    errors: string[];
    data: {
        data: {
            id: string,
            phoneNumber: string;
            fullName: string;
            userType: string;
            isActive: boolean;
            createdAt: string;
        }[],
        pageNumber: number,
        pageSize: number,
        totalRecords: number,
        totalPages: number,
    }
}

const thunkGetUsers = createAsyncThunk('users/thunkGetUsers', async (
    params: { PageNumber: number, UserType?: string | null, IsActive?: boolean | null },
    thunkAPI
) => {
    const { rejectWithValue } = thunkAPI;
    try {
        const query = new URLSearchParams({
            pageNumber: params.PageNumber.toString(),
            pageSize: "10",
            ...(params.UserType && params.UserType !== "الكل" ? { UserType: params.UserType } : {}),
            ...(params.IsActive !== null && params.IsActive !== undefined
                ? { IsActive: params.IsActive.toString() }
                : {}),
        });


        const res = await axiosClient.get<TResponse>(`Account?${query}`);
        return res.data.data;
    } catch (error) {
        return rejectWithValue(axiosErrorHandler(error))
    }
})

export default thunkGetUsers;