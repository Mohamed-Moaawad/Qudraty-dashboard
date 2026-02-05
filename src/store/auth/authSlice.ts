import { createSlice } from "@reduxjs/toolkit";
// import thunkAuthRegister from "./thunk/thunkAuthRegister";
import thunkAuthLogin from "./thunk/thunkAuthLogin";
import type { TLoading, TUser } from "../../types/types";
import { isString } from "../../utils/guards";



// type TAuthState = {
//     data: {
//         address: object,
//         id: number,
//         username: string,
//         email: string,
//         password: string,
//         name: { firstname: string, lastname: string },
//         phone: string
//         __v: number,
//     }[],
//     loading: boolean,
//     error: string | null
// }

type TAuthState = {
    user: TUser | null;
    accessToken: string | null;
    refreshToken: string | null;
    loading: TLoading;
    error: string | null;
};

const savedUser = localStorage.getItem('user');
const savedToken = localStorage.getItem('accessToken');

const initialState: TAuthState = {
    user: savedUser ? JSON.parse(savedUser) : null,
    accessToken: savedToken || null,
    refreshToken: null,
    loading: 'idle',
    error: null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        resetUI: (state) => {
            state.loading = 'idle';
            state.error = null;
        },
        logOut: (state) => {
            state.user = null;
            state.accessToken = null;
            state.loading = "idle";
            state.error = null;

            localStorage.removeItem('user');
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
        }
    },
    extraReducers: (builder) => {
        // Register
        // builder
        //     .addCase(thunkAuthRegister.pending, (state) => {
        //         state.loading = 'pending';
        //         state.error = null;
        //     })
        //     .addCase(thunkAuthRegister.fulfilled, (state) => {
        //         state.loading = 'succeeded';
        //     })
        //     .addCase(thunkAuthRegister.rejected, (state, action) => {
        //         state.loading = 'failed';
        //         if (isString(action.payload)) {
        //             state.error = action.payload;
        //         }
        //     })
        /**/
        // Login
        builder
            .addCase(thunkAuthLogin.pending, (state) => {
                state.loading = 'pending';
                state.error = null;
            })
            .addCase(thunkAuthLogin.fulfilled, (state, action) => {
                state.loading = 'succeeded';
                state.accessToken = action.payload.accessToken;
                state.refreshToken = action.payload.refreshToken;
                state.user = {
                    userId: action.payload.userId,
                    fullName: action.payload.fullName,
                    email: action.payload.email,
                    phoneNumber: action.payload.phoneNumber,
                    roles: action.payload.roles,
                };
                localStorage.setItem('user', JSON.stringify(state.user));
                localStorage.setItem('accessToken', action.payload.accessToken)
                localStorage.setItem('refreshToken', action.payload.refreshToken)
            })
            .addCase(thunkAuthLogin.rejected, (state, action) => {
                state.loading = 'failed';
                if (isString(action.payload)) {
                    state.error = action.payload;
                }
                // if (typeof action.payload === 'string') {
                //     state.error = action.payload;
                // }else{
                //     state.error = 'Login failed';
                // }
            })
    }
});

export const { resetUI, logOut } = authSlice.actions;

export default authSlice.reducer;


// export const { login, logout } = authSlice.actions;

// export const selectIsAuthenticated = (state: { auth: TAuthState }) => !!state.auth.token;

// export const selectUser = (state: { auth: TAuthState }) => state.auth.user;

// export default authSlice.reducer;
