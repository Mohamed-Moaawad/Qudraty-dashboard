import { createSlice } from "@reduxjs/toolkit";
import type { TLoading } from "../../types/types";
import thunkGetSubjectType from "./thunkGetSubjectType";
import { isString } from "../../utils/guards";

type TInitialState = {
    allSubjectType: {
        id: string;
        imageUrl: string;
        name: string;
    }[];
    loading: TLoading;
    error: string | null;
};

const initialState: TInitialState = {
    allSubjectType: [],
    loading: 'idle',
    error: null,
}

const subjectTypeSlice = createSlice({
    name: 'subjectType',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(thunkGetSubjectType.pending, (state) => {
                state.loading = 'pending';
                state.error = null;
            })
            .addCase(thunkGetSubjectType.fulfilled, (state, action) => {
                state.loading = 'succeeded';
                state.allSubjectType = action.payload;
            })
            .addCase(thunkGetSubjectType.rejected, (state, action) => {
                state.loading = 'failed';
                if (isString(action.payload)) {
                    state.error = action.payload;
                }
            })
    },
});

export default subjectTypeSlice.reducer;