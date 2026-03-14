import { configureStore } from '@reduxjs/toolkit';
import { counterSlice } from './slices/counterSlice';
import { userSlice } from './slices/userSlice';
import { authSlice } from './slices/authSlice';



export const store = configureStore({
  reducer: {
    counter: counterSlice.reducer, // Asigna tus reducers a una clave
    user: userSlice.reducer,
    auth: authSlice.reducer,
    // Otros reducers irían aquí:
    // user: userReducer,
    // products: productsReducer,
  },
});