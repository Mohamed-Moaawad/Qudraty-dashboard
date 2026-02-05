import { createSlice } from "@reduxjs/toolkit";
import type { TLoading } from "../../types/types";
import thunkGetAllSubjects from "./thunk/thunkGetAllSubjects";
import { isString } from "../../utils/guards";
import thunkGetSingleSubject from "./thunk/thunkGetSingleSubject";

type TInitialState = {
    subjects: {
        id: string;
        name: string;
        description: string;
        imageUrl: string;
        type: string;
        isActive: boolean;
    }[];
    singleSubject: {
        id: string;
        name: string;
        description: string;
        imageUrl: string;
        type: string;
        isActive: boolean;
    } | null,
    pageNumber: number;
    pageSize: number;
    totalRecords: number;
    totalPages: number;

    loading: TLoading;
    error: string | null;
}

const initialState: TInitialState = {
    subjects: [],
    singleSubject: null,
    pageNumber: 1,
    pageSize: 10,
    totalRecords: 0,
    totalPages: 0,
    loading: 'idle',
    error: null,
}

const subjectsSlice = createSlice({
    name: 'subjects',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Get All Subjects
            .addCase(thunkGetAllSubjects.pending, (state) => {
                state.loading = 'pending';
                state.error = null;
            })
            .addCase(thunkGetAllSubjects.fulfilled, (state, action) => {
                state.loading = 'succeeded';
                state.subjects = action.payload.data;
                state.pageNumber = action.payload.pageNumber;
                state.pageSize = action.payload.pageSize;
                state.totalRecords = action.payload.totalRecords;
                state.totalPages = action.payload.totalPages;
            })
            .addCase(thunkGetAllSubjects.rejected, (state, action) => {
                state.loading = 'failed';
                if (isString(action.payload)) {
                    state.error = action.payload
                }
            })
            // Get Single Subjects
            .addCase(thunkGetSingleSubject.pending, (state) => {
                state.loading = 'pending';
                state.error = null;
            })
            .addCase(thunkGetSingleSubject.fulfilled, (state, action) => {
                state.loading = 'succeeded';
                state.singleSubject = action.payload;
            })
            .addCase(thunkGetSingleSubject.rejected, (state, action) => {
                state.loading = 'failed';
                if (isString(action.payload)) {
                    state.error = action.payload
                }
            })
    }
});

export default subjectsSlice.reducer;