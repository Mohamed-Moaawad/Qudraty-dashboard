import { createSlice } from "@reduxjs/toolkit";
import type { TLoading } from "../../types/types";
import thunkGetUsersReports from "./thunk/thunkGetUsersReports";
import { isString } from "../../utils/guards";
import thunkGetEducationReports from "./thunk/thunkGetEducationReports";
import thunkGetLoyaltyReports from "./thunk/thunkGetLoyaltyReports";


type TUsersReports = {
    totalUsers: number;
    totalStudents: number;
    totalParents: number;
    totalActiveUsers: number;
}
type TEducationReports = {
    totalStudents: number;
    totalSubjects: number;
    totalSubscriptions: number;
    averageRatingStars: number;
}
type TLoyaltyReports = {
    totalGivenPoints: number;
    averagePointsPerStudent: number;
    totalRedeemedPoints: number;
}

type TInitialState = {
    usersReports: TUsersReports | null;
    educationReports: TEducationReports | null;
    loyaltyReports: TLoyaltyReports | null;
    loading: TLoading;
    error: string | null;
}


const initialState: TInitialState = {
    usersReports: null,
    educationReports: null,
    loyaltyReports: null,
    loading: 'idle',
    error: null,
}

const reportsSlice = createSlice({
    name: "reports",
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            // Get Users Reports
            .addCase(thunkGetUsersReports.pending, (state) => {
                state.loading = 'pending';
                state.error = null;
            })
            .addCase(thunkGetUsersReports.fulfilled, (state, action) => {
                state.loading = 'succeeded';
                state.usersReports = action.payload;
            })
            .addCase(thunkGetUsersReports.rejected, (state, action) => {
                state.loading = 'failed';
                if (isString(action.payload)) {
                    state.error = action.payload
                }
            })
            // Get Education Reports
            .addCase(thunkGetEducationReports.pending, (state) => {
                state.loading = 'pending';
                state.error = null;
            })
            .addCase(thunkGetEducationReports.fulfilled, (state, action) => {
                state.loading = 'succeeded';
                state.educationReports = action.payload;
            })
            .addCase(thunkGetEducationReports.rejected, (state, action) => {
                state.loading = 'failed';
                if (isString(action.payload)) {
                    state.error = action.payload
                }
            })
            // Get Loyalty Reports
            .addCase(thunkGetLoyaltyReports.pending, (state) => {
                state.loading = 'pending';
                state.error = null;
            })
            .addCase(thunkGetLoyaltyReports.fulfilled, (state, action) => {
                state.loading = 'succeeded';
                state.loyaltyReports = action.payload;
            })
            .addCase(thunkGetLoyaltyReports.rejected, (state, action) => {
                state.loading = 'failed';
                if (isString(action.payload)) {
                    state.error = action.payload
                }
            })
    },
});

export default reportsSlice.reducer;