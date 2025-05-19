import { configureStore } from "@reduxjs/toolkit";
import authSlice from './authSlice.js'
import blogSlice from './blogSlice.js'
const store = configureStore({
    reducer: {
        auth: authSlice,
        blog: blogSlice
    }
});
export default store;