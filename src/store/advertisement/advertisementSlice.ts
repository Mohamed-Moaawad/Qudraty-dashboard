import { createSlice } from "@reduxjs/toolkit";
import type { TLoading } from "../../types/types";
import thunkGetAllAdvertisement from "./thunk/thunkGetAllAdvertisement";
import { isString } from "../../utils/guards";
import thunkGetSingleAdvertisement from "./thunk/thunkGetSingleAdvertisement";
import thunkDeleteAdvertisement from "./thunk/thunkDeleteAdvertisement";
import thunkAddNewAdvertisement from "./thunk/thunkAddNewAdvertisement";


type TAdvertisement = {
    id: string;
    title: string;
    description: string;
    imageUrl: string;
    authorUrl: string;
    order: number;
    advertiseDate: string;
    isActive: boolean;
    created: string;
    updated: string;
}

type TInitialState = {
    advertisement: TAdvertisement[],
    singleAdvertisement: TAdvertisement | null,
    loading: TLoading;
    error: string | null;
}

const initialState: TInitialState = {
    advertisement: [],
    singleAdvertisement: null,
    loading: 'idle',
    error: null,
}

const advertisementSlice = createSlice({
    name: "advertisement",
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            // Get All Advertisement
            .addCase(thunkGetAllAdvertisement.pending, (state) => {
                state.loading = 'pending';
                state.error = null;
            })
            .addCase(thunkGetAllAdvertisement.fulfilled, (state, action) => {
                state.loading = 'succeeded';
                state.advertisement = action.payload;
            })
            .addCase(thunkGetAllAdvertisement.rejected, (state, action) => {
                state.loading = 'pending';
                if (isString(action.payload)) {
                    state.error = action.payload;
                }
            })
            // Get Single Advertisement
            .addCase(thunkGetSingleAdvertisement.pending, (state) => {
                state.loading = 'pending';
                state.error = null;
            })
            .addCase(thunkGetSingleAdvertisement.fulfilled, (state, action) => {
                state.loading = 'succeeded';
                state.singleAdvertisement = action.payload;
            })
            .addCase(thunkGetSingleAdvertisement.rejected, (state, action) => {
                state.loading = 'pending';
                if (isString(action.payload)) {
                    state.error = action.payload;
                }
            })
            // Get delete Advertisement
            .addCase(thunkDeleteAdvertisement.pending, (state) => {
                state.loading = 'pending';
                state.error = null;
            })
            .addCase(thunkDeleteAdvertisement.fulfilled, (state) => {
                state.loading = 'succeeded';
            })
            .addCase(thunkDeleteAdvertisement.rejected, (state, action) => {
                state.loading = 'pending';
                if (isString(action.payload)) {
                    state.error = action.payload;
                }
            })
            // add New Advertisement
            .addCase(thunkAddNewAdvertisement.pending, (state) => {
                state.loading = 'pending';
                state.error = null;
            })
            .addCase(thunkAddNewAdvertisement.fulfilled, (state) => {
                state.loading = 'succeeded';
            })
            .addCase(thunkAddNewAdvertisement.rejected, (state, action) => {
                state.loading = 'pending';
                if (isString(action.payload)) {
                    state.error = action.payload;
                }
            })
    },
});

export default advertisementSlice.reducer;