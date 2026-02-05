import { createSlice } from "@reduxjs/toolkit";
import type { TLoading } from "../../types/types";
import thunkGetUsers from "./thunk/thunkGetUsers";
import { isString } from "../../utils/guards";
import getParentById from "./thunk/getParentById";
import getStudentById from "./thunk/getStudentById";

type TParentDashboardStudentInfo = {
    studentId: string;
    name: string;
    subscriptionType: string;
    subscriptionStatus: string;
};

type TInitialState = {
    users: {
        id: string,
        phoneNumber: string;
        fullName: string;
        userType: string;
        isActive: boolean;
        createdAt: string;
    }[],
    pageNumber: number,
    pageSize: number,
    totalRecords: number,
    totalPages: number,

    singleStudent: {
        name: string,
        parentName: string;
        phoneNumber: string;
        subscribtionType: string;
        subscriptionStatus: string;
        subscriptionStartDate: string;
        subscriptionEndDate: string;
    } | null;
    singleParent: {
        parentName: string;
        phoneNumber: string;
        totalStudent: string;
        parentDashboardStudentInfos: TParentDashboardStudentInfo[];
    } | null;

    loading: TLoading,
    error: string | null;
};

const initialState: TInitialState = {
    users: [],
    pageNumber: 1,
    pageSize: 10,
    totalRecords: 0,
    totalPages: 0,
    singleStudent: null,
    singleParent: null,
    loading: 'idle',
    error: null,
}

const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(thunkGetUsers.pending, (state) => {
                state.loading = 'pending';
                state.error = null;
            })
            .addCase(thunkGetUsers.fulfilled, (state, action) => {
                state.loading = 'succeeded';
                state.users = action.payload.data;
                state.pageNumber = action.payload.pageNumber;
                state.pageSize = action.payload.pageSize;
                state.totalPages = action.payload.totalPages;
                state.totalRecords = action.payload.totalRecords;
            })
            .addCase(thunkGetUsers.rejected, (state, action) => {
                state.loading = 'failed';
                if (isString(action.payload)) {
                    state.error = action.payload;
                }
            })
            // Get Parent By Id
            .addCase(getParentById.pending, (state) => {
                state.loading = 'pending';
                state.error = null;
            })
            .addCase(getParentById.fulfilled, (state, action) => {
                state.loading = 'succeeded';
                state.singleParent = action.payload;
            })
            .addCase(getParentById.rejected, (state, action) => {
                state.loading = 'failed';
                if (isString(action.payload)) {
                    state.error = action.payload;
                }
            })
            // Get student By Id
            .addCase(getStudentById.pending, (state) => {
                state.loading = 'pending';
                state.error = null;
            })
            .addCase(getStudentById.fulfilled, (state, action) => {
                state.loading = 'succeeded';
                state.singleStudent = action.payload;
            })
            .addCase(getStudentById.rejected, (state, action) => {
                state.loading = 'failed';
                if (isString(action.payload)) {
                    state.error = action.payload;
                }
            })
    }
});

export default usersSlice.reducer;