import { createSlice } from "@reduxjs/toolkit";
import type { TLoading } from "../../types/types";
import { isString } from "../../utils/guards";
import thunkGetAllReviews from "./thunk/thunkGetAllReviews";
import thunkEditReview from "./thunk/thunkEditReview";



type TInitialState = {
    rating: {
        id: string;
        studentId: string;
        studentName: string;
        subjectId: string;
        subjectName: string;
        stars: number;
        comment: string;
        created: string;
        isActive: boolean;
    }[];
    pageNumber: number;
    pageSize: number;
    totalRecords: number;
    totalPages: number;


    loading: TLoading;
    error: string | null;
}

const initialState: TInitialState = {
    rating: [],
    pageNumber: 1,
    pageSize: 10,
    totalRecords: 0,
    totalPages: 0,
    loading: 'idle',
    error: null,
}

const reviewsSlice = createSlice({
    name: 'reviews',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            // Get All Reviews
            .addCase(thunkGetAllReviews.pending, (state) => {
                state.loading = 'pending';
                state.error = null;
            })
            .addCase(thunkGetAllReviews.fulfilled, (state, action) => {
                state.loading = 'succeeded';
                state.rating = action.payload.data;
                state.pageNumber = action.payload.pageNumber;
                state.pageSize = action.payload.pageSize;
                state.totalPages = action.payload.totalPages;
                state.totalRecords = action.payload.totalRecords;
            })
            .addCase(thunkGetAllReviews.rejected, (state, action) => {
                state.loading = 'failed';
                if (isString(action.payload)) {
                    state.error = action.payload;
                }
            })
            // Edit Reviews
            .addCase(thunkEditReview.pending, (state) => {
                state.loading = 'pending';
                state.error = null;
            })
            .addCase(thunkEditReview.fulfilled, (state) => {
                state.loading = 'succeeded';
            })
            .addCase(thunkEditReview.rejected, (state, action) => {
                state.loading = 'failed';
                if (isString(action.payload)) {
                    state.error = action.payload;
                }
            })
    },
});

export default reviewsSlice.reducer;