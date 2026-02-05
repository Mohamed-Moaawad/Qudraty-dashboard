import { createSlice } from "@reduxjs/toolkit";
import type { TLoading } from "../../types/types";
import thunkGetAllSupportContacts from "./thunk/thunkGetAllSupportContacts";
import { isString } from "../../utils/guards";
import thunGetSingleSupportContact from "./thunk/thunGetSingleSupportContact";

type TInitialState = {
    supportContacts: {
        id: string;
        contactMethod: string;
        title: string;
    }[];
    singleSupportContacts: {
        contactMethod: string;
        title: string;
        tickets: null;
        id: string;
        created: string;
        createdBy: string;
        updated: string;
        updatedBy: string;
        isActive: boolean;
        rowVersion: string;
    } | null;
    loading: TLoading;
    error: string | null;
}

const initialState: TInitialState = {
    supportContacts: [],
    singleSupportContacts: null,
    loading: 'idle',
    error: null,
}

const supportContactsSlice = createSlice({
    name: 'supportContacts',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            // get All Support Contacts
            .addCase(thunkGetAllSupportContacts.pending, (state) => {
                state.loading = 'pending';
                state.error = null;
            })
            .addCase(thunkGetAllSupportContacts.fulfilled, (state, action) => {
                state.loading = 'succeeded';
                state.supportContacts = action.payload;
            })
            .addCase(thunkGetAllSupportContacts.rejected, (state, action) => {
                state.loading = 'failed';
                if (isString(action.payload)) {
                    state.error = action.payload;
                }
            })
            // get single Support Contacts
            .addCase(thunGetSingleSupportContact.pending, (state) => {
                state.loading = 'pending';
                state.error = null;
            })
            .addCase(thunGetSingleSupportContact.fulfilled, (state, action) => {
                state.loading = 'succeeded';
                state.singleSupportContacts = action.payload;
            })
            .addCase(thunGetSingleSupportContact.rejected, (state, action) => {
                state.loading = 'failed';
                if (isString(action.payload)) {
                    state.error = action.payload;
                }
            })
    },
});

export default supportContactsSlice.reducer;