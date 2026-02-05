import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosClient from "../../../api/axiosClient";
import axiosErrorHandler from "../../../utils/axiosErrorHandler";

// Subject type
type TSubject = {
    id: string;
    name: string;
    description: string;
    imageUrl: string;
    type: string;
    isActive: boolean;
};
// Paginated Data
type TPagination<T> = {
    data: T[];
    pageNumber: number;
    pageSize: number;
    totalRecords: number;
    totalPages: number;
};
// Main API Response
type TResponse = {
    statusCode: number;
    meta: unknown | null;
    succeeded: boolean;
    message: string;
    errors: unknown[];
    data: TPagination<TSubject>;
};

type TPropsData = {
    pageNumber?: number;
    isActive?: boolean;
    subjectTypeId?: string | null;
}

const thunkGetAllSubjects = createAsyncThunk('subjects/thunkGetAllSubjects', async ({ pageNumber = 1, isActive = true, subjectTypeId = '' }: TPropsData, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
        const res = await axiosClient.get<TResponse>(`/admin/Subject?pageNumber=${pageNumber}&IsActive=${isActive}&subjectTypeId=${subjectTypeId}`);
        return res.data.data;
    } catch (error) {
        return rejectWithValue(axiosErrorHandler(error));
    }
});

export default thunkGetAllSubjects;