import { configureStore } from "@reduxjs/toolkit";
import sidebarReducer from './sidebar/sidebarSlice';
import authSlice from './auth/authSlice';
import usersSlice from './users/usersSlice';
import subjectsSlice from './subjects/subjectsSlice';
import subjectTypeSlice from './subjectType/subjectTypeSlice';
import topicsSlice from "./topics/topicsSlice";
import examsSlice from './exams/examsSlice';
import reviewsSlice from './reviews/reviewsSlice';
import supportContactsSlice from './supportContacts/supportContactsSlice';
import subscriptionsSlice from './subscriptions/subscriptionsSlice';
import notificationSlice from './notification/notificationSlice';
import calmTimeSlice from './calmTime/calmTimeSlice';
import advertisementSlice from './advertisement/advertisementSlice';
import booksSlice from './books/booksSlice';
import reportsSlice from './reports/reportsSlice';
import loyaltyPointSlice from './loyalityPoint/loyaltyPointSlice';


export const store = configureStore({
    reducer: {
        auth: authSlice,
        users: usersSlice,
        sidebar: sidebarReducer,
        subjects: subjectsSlice,
        subjectType: subjectTypeSlice,
        topics: topicsSlice,
        exams: examsSlice,
        reviews: reviewsSlice,
        supportContacts: supportContactsSlice,
        subscriptions: subscriptionsSlice,
        notifications: notificationSlice,
        calmTime: calmTimeSlice,
        advertisement: advertisementSlice,
        books: booksSlice,
        reports: reportsSlice,
        loyaltyPoint: loyaltyPointSlice,
    },

});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;