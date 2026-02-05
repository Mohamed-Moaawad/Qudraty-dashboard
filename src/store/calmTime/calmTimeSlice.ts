import { createSlice } from "@reduxjs/toolkit";
import type { TLoading } from "../../types/types";
import thunkGetAllCalmTime from "./thunk/thunkGetAllCalmTime";
import { isString } from "../../utils/guards";
import thunkAddNewCalmTime from "./thunk/thunkAddNewCalmTime";


type TCalmTimeItem = {
    id: string;
    title: string;
    description: string;
    mediaUrl: string;
    order: number;
    isActive: boolean;
    created: string;
    updated: string;
};

type TInitialState = {
    calmTime: TCalmTimeItem[];
    loading: TLoading;
    error: string | null;
}

const initialState: TInitialState = {
    calmTime: [],
    loading: 'idle',
    error: null,
}

const calmTimeSlice = createSlice({
    name: 'calmTime',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            // Get All CalmTime
            .addCase(thunkGetAllCalmTime.pending, (state) => {
                state.loading = 'pending';
                state.error = null;
            })
            .addCase(thunkGetAllCalmTime.fulfilled, (state, action) => {
                state.loading = 'succeeded';
                state.calmTime = action.payload;
            })
            .addCase(thunkGetAllCalmTime.rejected, (state, action) => {
                state.loading = 'failed';
                if (isString(action.payload)) {
                    state.error = action.payload;
                }
            })
            // Get All CalmTime
            .addCase(thunkAddNewCalmTime.pending, (state) => {
                state.loading = 'pending';
                state.error = null;
            })
            .addCase(thunkAddNewCalmTime.fulfilled, (state) => {
                state.loading = 'succeeded';
            })
            .addCase(thunkAddNewCalmTime.rejected, (state, action) => {
                state.loading = 'failed';
                if (isString(action.payload)) {
                    state.error = action.payload;
                }
            })
    },
});

export default calmTimeSlice.reducer;