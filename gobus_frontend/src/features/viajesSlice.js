import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../api';

// Crear una acción asincrónica para obtener los viajes
export const fetchViajes = createAsyncThunk('viajes/fetchViajes', async () => {
  const token = localStorage.getItem("access_token");
  const response = await api.get('/viajes',{
    headers: {
      Authorization: `Bearer ${token}`, // Agregar el token en el encabezado
    },
  });
  return response.data;
});

const viajesSlice = createSlice({
  name: 'viajes',
  initialState: {
    viajes: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchViajes.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchViajes.fulfilled, (state, action) => {
        state.loading = false;
        state.viajes = action.payload;
      })
      .addCase(fetchViajes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default viajesSlice.reducer;
