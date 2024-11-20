// src/store/store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/authSlice';
import viajesReducer from '../features/viajesSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    viajes: viajesReducer,
    // otros reducers aquí si los tienes
  },
});

export default store;
