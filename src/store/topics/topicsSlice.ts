import { createSlice } from "@reduxjs/toolkit";
import type { TLoading } from "../../types/types";
import thunkGetTopics from "./thunk/thunkGetTopics";
import { isString } from "../../utils/guards";
import thunkAddNewTopic from "./thunk/thunkAddNewTopic";
import thunkGetTopicDetails from "./thunk/thunkGetTopicDetails";


export type TTopicOption = {
    id: string;
    text: string;
    isCorrect: boolean;
};

export type TTopicQuestion = {
    id: string;
    text: string;
    imageUrl: string | null;
    timestamp: string;
    options: TTopicOption[];
};

export type TTopic = {
    id: number;
    title: string;
    videoUrl: string;
    videoStreamUrl: string;
    subjectId: string;
    subjectName: string;
    isActive: boolean;
    questions: TTopicQuestion[];
};





type TInitialState = {
    topics: {
        subjectId: string;
        examId: string | null;
        topics: {
            id: number,
            title: string,
            order: number,
            isActive: boolean;
        }[]
    } | null;
    topicDetails: TTopic | null;
    loading: TLoading;
    error: string | null;
};

const initialState: TInitialState = {
    topics: null,
    topicDetails: null,
    loading: 'idle',
    error: null,
}

const topicsSlice = createSlice({
    name: 'topics',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            // get all topics
            .addCase(thunkGetTopics.pending, (state) => {
                state.loading = 'pending';
                state.error = null;
            })
            .addCase(thunkGetTopics.fulfilled, (state, action) => {
                state.loading = 'succeeded';
                state.topics = action.payload;
            })
            .addCase(thunkGetTopics.rejected, (state, action) => {
                state.loading = 'failed';
                if (isString(action.payload)) {
                    state.error = action.payload;
                }
            })
            // add new topic
            .addCase(thunkAddNewTopic.pending, (state) => {
                state.loading = 'pending';
                state.error = null;
            })
            .addCase(thunkAddNewTopic.fulfilled, (state) => {
                state.loading = 'succeeded';
            })
            .addCase(thunkAddNewTopic.rejected, (state, action) => {
                state.loading = 'failed';
                if (isString(action.payload)) {
                    state.error = action.payload;
                }
            })
            // get single topic
            .addCase(thunkGetTopicDetails.pending, (state) => {
                state.loading = 'pending';
                state.error = null;
            })
            .addCase(thunkGetTopicDetails.fulfilled, (state, action) => {
                state.loading = 'succeeded';
                state.topicDetails = action.payload;
            })
            .addCase(thunkGetTopicDetails.rejected, (state, action) => {
                state.loading = 'failed';
                if (isString(action.payload)) {
                    state.error = action.payload;
                }
            })
    },
});

export default topicsSlice.reducer;