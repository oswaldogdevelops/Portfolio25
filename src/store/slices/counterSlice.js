import { createSlice } from '@reduxjs/toolkit';

export const counterSlice = createSlice({
  name: 'counter', // Nombre único para tu slice
  initialState: {
    value: 0,
  },
  reducers: {
    increment: (state) => {
      // Redux Toolkit usa Immer para permitir "mutar" el estado
      // directamente, aunque en realidad crea un nuevo estado.
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
  },
});

// Exporta las acciones generadas automáticamente
export const { increment, decrement, incrementByAmount } = counterSlice.actions;

// Exporta el reducer para el store
export default counterSlice.reducer;