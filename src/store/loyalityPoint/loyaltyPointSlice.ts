import { createSlice } from "@reduxjs/toolkit";
import type { TLoading } from "../../types/types";
import thunkGetLoyaltyPoint from "./thunkGetLoyaltyPoint";
import { isString } from "../../utils/guards";


type LoyaltyPointRule = {
    id: number;                 // رقم معرف القاعدة
    eventType: number;          // نوع الحدث (مثلاً 0 = TopicFinished)
    eventTypeName: string;      // اسم الحدث كنص
    points: number;             // عدد النقاط المكتسبة عند الحدث
    isActive: boolean;          // هل القاعدة فعالة
    created: string;            // تاريخ الإنشاء بصيغة ISO
};

type TInitialState = {
    loyaltyPoint: LoyaltyPointRule[];
    loading: TLoading;
    error: string | null
}

const initialState: TInitialState = {
    loyaltyPoint: [],
    loading: 'idle',
    error: null,
}

const loyaltyPointSlice = createSlice({
    name: 'loyaltyPoint',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            // Get Loyalty Point
            .addCase(thunkGetLoyaltyPoint.pending, (state) => {
                state.loading = 'pending';
                state.error = null;
            })
            .addCase(thunkGetLoyaltyPoint.fulfilled, (state, action) => {
                state.loading = 'succeeded';
                state.loyaltyPoint = action.payload;
            })
            .addCase(thunkGetLoyaltyPoint.rejected, (state, action) => {
                state.loading = 'failed';
                if (isString(action.payload)) {
                    state.error = action.payload;
                }
            })
    },
});

export default loyaltyPointSlice.reducer