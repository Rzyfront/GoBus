// src/store/store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/authSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    // otros reducers aquí si los tienes
  },
});

export default store;
