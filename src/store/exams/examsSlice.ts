import { createSlice } from "@reduxjs/toolkit";
import type { TLoading } from "../../types/types";
import thunkGetFinalExam from "./thunk/FinalExam/thunkGetFinalExam";
import { isString } from "../../utils/guards";
import thunkAddNewFinalExam from "./thunk/FinalExam/thunkAddNewFinalExam";
import thunkGetSingleFinalExam from "./thunk/FinalExam/thunkGetSingleFinalExam";
import thunkGetRandomQuestions from "./thunk/FinalExam/thunkGetRandomQuestions";
import thunkAssignQuestions from "./thunk/FinalExam/thunkAssignQuestions";
import thunkDeleteQuestion from "./thunk/FinalExam/thunkDeleteQuestion";
import thunkGetPlacementExam from "./thunk/PlacementExam/thunkGetPlacementExam";
import thunkAddNewQuestionStandalone from "./thunk/FinalExam/thunkAddNewQuestionStandalone";



type TOption = {
    optionId: string;
    text: string;
};

type TQuestion = {
    questionId: string;
    videoQuestionId: string;
    questionText: string;
    imageUrl: string | null;
    topicId: number;
    timestamp: string;
    isStandalone: boolean;
    options: TOption[];
    correctOptionId: string;
};

type TRandomQuestion = {
    questionId: string;
    questionText: string;
    imageUrl: string | null;
    topicId: number;
    timestamp: string;
    options: TOption[];
}



type TInitialState = {
    data: {
        examId: string;
        subjectName: string;
        subjectTypeName: string;
        examQuestionCount: number;
        standaloneQuestionCount: number;
        isActive: boolean;
        created: string;
    }[];
    singleExam: {
        questions: TQuestion[];
        totalQuestions: number;
    } | null;
    randomQuestion: TRandomQuestion[];
    placementExam: {
        id: string;
        text: string;
        imageUrl: string | null;
        isActive: boolean;
        options: {
            id: string;
            text: string;
            isCorrect: boolean;
        }[];
    }[];
    pageNumber: number;
    pageSize: number;
    totalRecords: number;
    totalPages: number;

    loading: TLoading;
    error: string | null;
}

const initialState: TInitialState = {
    data: [],
    singleExam: null,
    randomQuestion: [],
    placementExam: [],
    pageNumber: 1,
    pageSize: 10,
    totalRecords: 0,
    totalPages: 0,

    loading: 'idle',
    error: null,
}

const examsSlice = createSlice({
    name: 'exams',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            // Get Final Exam
            .addCase(thunkGetFinalExam.pending, (state) => {
                state.loading = 'pending';
                state.error = null;
            })
            .addCase(thunkGetFinalExam.fulfilled, (state, action) => {
                state.loading = 'succeeded';
                state.data = action.payload.data;
                state.pageNumber = action.payload.pageNumber;
                state.pageSize = action.payload.pageSize;
                state.totalPages = action.payload.totalPages;
                state.totalRecords = action.payload.totalRecords;
            })
            .addCase(thunkGetFinalExam.rejected, (state, action) => {
                state.loading = 'failed';
                if (isString(action.payload)) {
                    state.error = action.payload;
                }
            })
            // Add Final Exam
            .addCase(thunkAddNewFinalExam.pending, (state) => {
                state.loading = 'pending';
                state.error = null;
            })
            .addCase(thunkAddNewFinalExam.fulfilled, (state) => {
                state.loading = 'succeeded';
            })
            .addCase(thunkAddNewFinalExam.rejected, (state, action) => {
                state.loading = 'failed';
                if (isString(action.payload)) {
                    state.error = action.payload;
                }
            })
            // Get Single Final Exam
            .addCase(thunkGetSingleFinalExam.pending, (state) => {
                state.loading = 'pending';
                state.error = null;
            })
            .addCase(thunkGetSingleFinalExam.fulfilled, (state, action) => {
                state.loading = 'succeeded';
                state.singleExam = action.payload;
            })
            .addCase(thunkGetSingleFinalExam.rejected, (state, action) => {
                state.loading = 'failed';
                if (isString(action.payload)) {
                    state.error = action.payload;
                }
            })
            // Get random questions
            .addCase(thunkGetRandomQuestions.pending, (state) => {
                state.loading = 'pending';
                state.error = null;
            })
            .addCase(thunkGetRandomQuestions.fulfilled, (state, action) => {
                state.loading = 'succeeded';
                state.randomQuestion = action.payload.data;
                state.pageNumber = action.payload.pageNumber;
                state.pageSize = action.payload.pageSize;
                state.totalPages = action.payload.totalPages;
                state.totalRecords = action.payload.totalRecords;
            })
            .addCase(thunkGetRandomQuestions.rejected, (state, action) => {
                state.loading = 'failed';
                if (isString(action.payload)) {
                    state.error = action.payload;
                }
            })
            // Assign Questions to final exam
            .addCase(thunkAssignQuestions.pending, (state) => {
                state.loading = 'pending';
                state.error = null;
            })
            .addCase(thunkAssignQuestions.fulfilled, (state) => {
                state.loading = 'succeeded';
            })
            .addCase(thunkAssignQuestions.rejected, (state, action) => {
                state.loading = 'failed';
                if (isString(action.payload)) {
                    state.error = action.payload;
                }
            })
            // Add New Question Standalone
            .addCase(thunkAddNewQuestionStandalone.pending, (state) => {
                state.loading = 'pending';
                state.error = null;
            })
            .addCase(thunkAddNewQuestionStandalone.fulfilled, (state) => {
                state.loading = 'succeeded';
            })
            .addCase(thunkAddNewQuestionStandalone.rejected, (state, action) => {
                state.loading = 'failed';
                if (isString(action.payload)) {
                    state.error = action.payload;
                }
            })
            // delete Questions to final exam
            .addCase(thunkDeleteQuestion.pending, (state) => {
                state.loading = 'pending';
                state.error = null;
            })
            .addCase(thunkDeleteQuestion.fulfilled, (state) => {
                state.loading = 'succeeded';
            })
            .addCase(thunkDeleteQuestion.rejected, (state, action) => {
                state.loading = 'failed';
                if (isString(action.payload)) {
                    state.error = action.payload;
                }
            })
            // Get Placement Exam
            .addCase(thunkGetPlacementExam.pending, (state) => {
                state.loading = 'pending';
                state.error = null;
            })
            .addCase(thunkGetPlacementExam.fulfilled, (state, action) => {
                state.loading = 'succeeded';
                state.placementExam = action.payload.data;
                state.pageNumber = action.payload.pageNumber;
                state.pageSize = action.payload.pageSize;
                state.totalPages = action.payload.totalPages;
                state.totalRecords = action.payload.totalRecords;
            })
            .addCase(thunkGetPlacementExam.rejected, (state, action) => {
                state.loading = 'failed';
                if (isString(action.payload)) {
                    state.error = action.payload;
                }
            })
    },
});

export default examsSlice.reducer;