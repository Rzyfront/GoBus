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

// Crear una acción asincrónica para obtener los boletos
export const fetchBoletos = createAsyncThunk('viajes/fetchBoletos', async (_, { rejectWithValue }) => {
  const token = localStorage.getItem("access_token");
  if (!token) return rejectWithValue("No se encontró un token de autenticación");
  try {
  const response = await api.get('/boletos',{
    headers: {
      Authorization: `Bearer ${token}`, // Agregar el token en el encabezado
    },
  });
  return response.data;
} catch (error) {
  return rejectWithValue(error.response?.data || "Error al cargar los boletos");
}
});

// Crear una acción asincrónica para obtener los boletos
export const deleteBoleto = createAsyncThunk('viajes/deleteBoleto', async (id,{ rejectWithValue }) => {
  const token = localStorage.getItem("access_token");
  if (!token) return rejectWithValue("No se encontró un token de autenticación");
  try {
  await api.delete(`/boletos/${id}/`,{
    headers: {
      Authorization: `Bearer ${token}`, // Agregar el token en el encabezado
    },
  });
  return id;
  } catch (error) {
    return rejectWithValue(error.response?.data || "Error al eliminar el boleto");
  }
});


const boletosSlice = createSlice({
  name: 'boletos',
  initialState: {
    boletos: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Crear boleto
      .addCase(crearBoleto.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(crearBoleto.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.boletos.push(action.payload); // Agrega el boleto al estado
      })
      .addCase(crearBoleto.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })

      // Obtener boletos
      .addCase(fetchBoletos.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchBoletos.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.boletos = action.payload; // Actualiza los boletos en el estado
      })
      .addCase(fetchBoletos.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })

      // Eliminar boleto
      .addCase(deleteBoleto.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(deleteBoleto.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.boletos = state.boletos.filter(
          (boleto) => boleto.id !== action.payload // Filtra el boleto eliminado
        );
      })
      .addCase(deleteBoleto.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default boletosSlice.reducer;
