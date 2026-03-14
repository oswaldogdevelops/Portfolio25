// src/features/user/userSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  // Un usuario puede estar nulo si no hay sesión iniciada
  // o tener un objeto con sus datos
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

export const userSlice = createSlice({
  name: 'user', // Nombre único para este slice
  initialState,
  reducers: {
    // Cuando se intenta iniciar sesión o cargar el usuario
    loginPending: (state) => {
      state.isLoading = true;
      state.error = null; // Limpiar errores previos
    },
    // Cuando el inicio de sesión o la carga del usuario es exitosa
    loginSuccess: (state, action) => {
      state.isLoading = false;
      state.isAuthenticated = true;
      state.user = action.payload; // Los datos del usuario vienen en el payload
      state.error = null;
    },
    // Cuando el inicio de sesión o la carga del usuario falla
    loginFailed: (state, action) => {
      state.isLoading = false;
      state.isAuthenticated = false;
      state.user = null;
      state.error = action.payload; // El mensaje de error viene en el payload
    },
    // Cuando el usuario cierra sesión
    logout: (state) => {
      state.isLoading = false;
      state.isAuthenticated = false;
      state.user = null;
      state.error = null;
    },
    // Puedes añadir más reducers según tus necesidades, por ejemplo:
    // updateUserProfile: (state, action) => {
    //   state.user = { ...state.user, ...action.payload };
    // },
    // clearUserError: (state) => {
    //   state.error = null;
    // },
  },
});

// Exporta las acciones para que puedas usarlas en tus componentes
export const { loginPending, loginSuccess, loginFailed, logout } = userSlice.actions;

// Exporta el reducer para que lo añadas a tu store
export default userSlice.reducer;