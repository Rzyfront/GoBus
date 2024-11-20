// src/store/store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/authSlice';
import viajesReducer from '../features/viajesSlice';
import boletosReducer from '../features/boletosSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    viajes: viajesReducer,
    boletos: boletosReducer
    // otros reducers aquí si los tienes
  },
});

export default store;
