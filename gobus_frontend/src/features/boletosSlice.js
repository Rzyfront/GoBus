// src/features/boletosSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../api';

// Acción asíncrona para crear el boleto
export const crearBoleto = createAsyncThunk(
  'boletos/crearBoleto',
  async ({viaje, pasajero}, { rejectWithValue }) => {
    const token = localStorage.getItem("access_token");
    try {
      const response = await api.post(
        '/boletos/',
        {
            "viaje": viaje.id,
            "asiento": pasajero?.asiento,
            "precio": viaje.precio,
            "estado": pasajero?.estado,
            "pasajero": {
                "nombre": pasajero?.nombre,
                "documento_identidad": pasajero?.documento
            }
        },
        {
            headers: {
             Authorization: `Bearer ${token}`, // Agregar el token en el encabezado
            },
        }
      );
      return response.data; // Retornar el boleto creado
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const boletosSlice = createSlice({
  name: 'boletos',
  initialState: {
    boletos: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(crearBoleto.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(crearBoleto.fulfilled, (state, action) => {
        state.loading = false;
        state.boletos.push(action.payload); // Agregar el boleto creado al estado
      })
      .addCase(crearBoleto.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default boletosSlice.reducer;
