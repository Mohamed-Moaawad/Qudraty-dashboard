import { createSlice } from "@reduxjs/toolkit";

type initialStateType = {
    isOpen: boolean;
}

const initialState: initialStateType = {
    isOpen: false,
}
const sidebarSlice = createSlice({
    name: 'sidebar',
    initialState,
    reducers: {
        toggleSidebar: (state) => {
            state.isOpen = !state.isOpen;
        },
        resetSidebar: (state) => {
            state.isOpen = false;
        }
    }
});

export const { toggleSidebar, resetSidebar } = sidebarSlice.actions;
export default sidebarSlice.reducer;