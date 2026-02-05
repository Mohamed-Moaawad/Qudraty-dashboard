import { createSlice } from "@reduxjs/toolkit";
import type { TLoading } from "../../types/types";
import thunkGetAllSubscriptionPlans from "./thunk/thunkGetAllSubscriptionPlans";
import { isString } from "../../utils/guards";
import thunkGetSingleSubscriptionPlan from "./thunk/thunkGetSingleSubscriptionPlan";
import thunkEditSubscriptionPlan from "./thunk/thunkEditSubscriptionPlan";
import thunkAddSubscriptionPlan from "./thunk/thunkAddSubscriptionPlan";

type TInitialState = {
    subscriptionPlans: {
        id: string;
        name: string;
        price: number;
        description: string;
        durationInDays: number;
        isActive: boolean;
        created: string;
        updated: string;
    }[];
    singleSubscriptionPlan: {
        id: string;
        name: string;
        price: number;
        description: string;
        durationInDays: number;
        isActive: boolean;
        created: string;
        updated: string;
    } | null;
    loading: TLoading;
    error: string | null;
}


const initialState: TInitialState = {
    subscriptionPlans: [],
    singleSubscriptionPlan: null,
    loading: 'idle',
    error: null
}

const subscriptionsSlice = createSlice({
    name: 'subscriptions',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            // Get All Subscription Plans
            .addCase(thunkGetAllSubscriptionPlans.pending, (state) => {
                state.loading = 'pending';
                state.error = null;
            })
            .addCase(thunkGetAllSubscriptionPlans.fulfilled, (state, action) => {
                state.loading = 'succeeded';
                state.subscriptionPlans = action.payload;
            })
            .addCase(thunkGetAllSubscriptionPlans.rejected, (state, action) => {
                state.loading = 'failed';
                if (isString(action.payload)) {
                    state.error = action.payload;
                }
            })
            // Get Single Subscription Plan
            .addCase(thunkGetSingleSubscriptionPlan.pending, (state) => {
                state.loading = 'pending';
                state.error = null;
            })
            .addCase(thunkGetSingleSubscriptionPlan.fulfilled, (state, action) => {
                state.loading = 'succeeded';
                state.singleSubscriptionPlan = action.payload;
            })
            .addCase(thunkGetSingleSubscriptionPlan.rejected, (state, action) => {
                state.loading = 'failed';
                if (isString(action.payload)) {
                    state.error = action.payload;
                }
            })
            // Edit Subscription Plan
            .addCase(thunkEditSubscriptionPlan.pending, (state) => {
                state.loading = 'pending';
                state.error = null;
            })
            .addCase(thunkEditSubscriptionPlan.fulfilled, (state) => {
                state.loading = 'succeeded';
            })
            .addCase(thunkEditSubscriptionPlan.rejected, (state, action) => {
                state.loading = 'failed';
                if (isString(action.payload)) {
                    state.error = action.payload;
                }
            })
            // Add Subscription Plan
            .addCase(thunkAddSubscriptionPlan.pending, (state) => {
                state.loading = 'pending';
                state.error = null;
            })
            .addCase(thunkAddSubscriptionPlan.fulfilled, (state) => {
                state.loading = 'succeeded';
            })
            .addCase(thunkAddSubscriptionPlan.rejected, (state, action) => {
                state.loading = 'failed';
                if (isString(action.payload)) {
                    state.error = action.payload;
                }
            })
    },
});

export default subscriptionsSlice.reducer;