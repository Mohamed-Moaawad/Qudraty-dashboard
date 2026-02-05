import { createSlice } from "@reduxjs/toolkit";
import type { TLoading } from "../../types/types";
import thunkGetBook from "./thunk/thunkGetBook";
import { isString } from "../../utils/guards";
import thunkUploadNewBook from "./thunk/thunkUploadNewBook";
import thunkDeleteBook from "./thunk/thunkDeleteBook";



type Book = {
    id: string;
    title: string;
    description: string;
    fileUrl: string;
    subjectId: string;
    subjectName: string;
    created: string; // ISO Date
    updated: string; // ISO Date
    isActive: boolean;
};

type TInitialState = {
    book: Book[];
    loading: TLoading;
    error: string | null;
};

const initialState: TInitialState = {
    book: [],
    loading: 'idle',
    error: null,
}

const booksSlice = createSlice({
    name: 'books',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            // Get Book
            .addCase(thunkGetBook.pending, (state) => {
                state.loading = 'pending';
                state.error = null
            })
            .addCase(thunkGetBook.fulfilled, (state, action) => {
                state.loading = 'succeeded';
                state.book = action.payload
            })
            .addCase(thunkGetBook.rejected, (state, action) => {
                state.loading = 'failed';
                if (isString(action.payload)) {
                    state.error = action.payload;
                }
            })
            // upload Book
            .addCase(thunkUploadNewBook.pending, (state) => {
                state.loading = 'pending';
                state.error = null
            })
            .addCase(thunkUploadNewBook.fulfilled, (state) => {
                state.loading = 'succeeded';
            })
            .addCase(thunkUploadNewBook.rejected, (state, action) => {
                state.loading = 'failed';
                if (isString(action.payload)) {
                    state.error = action.payload;
                }
            })
            // delete Book
            .addCase(thunkDeleteBook.pending, (state) => {
                state.loading = 'pending';
                state.error = null
            })
            .addCase(thunkDeleteBook.fulfilled, (state) => {
                state.loading = 'succeeded';
            })
            .addCase(thunkDeleteBook.rejected, (state, action) => {
                state.loading = 'failed';
                if (isString(action.payload)) {
                    state.error = action.payload;
                }
            })
    },
});

export default booksSlice.reducer;