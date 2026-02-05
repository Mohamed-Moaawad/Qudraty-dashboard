import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosClient from "../../../api/axiosClient";
import axiosErrorHandler from "../../../utils/axiosErrorHandler";

const thunkDeleteBook = createAsyncThunk('books/thunkDeleteBook', async ({ bookId }: { bookId: string }, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
        const res = await axiosClient.delete(`admin/Book/${bookId}`);
        return res.data.data;
    } catch (error) {
        return rejectWithValue(axiosErrorHandler(error));
    }
});

export default thunkDeleteBook;