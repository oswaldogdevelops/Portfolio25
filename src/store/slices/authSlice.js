import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  profile: null,
  isAuthenticated: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      // Este es el punto clave, donde se maneja el payload correctamente
      state.user = action.payload;
      state.isAuthenticated = true;
    },
       setProfile: (state, action) => {
      // Este es el punto clave, donde se maneja el payload correctamente
      state.profile = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.profile = null;
      state.isAuthenticated = false;
    },
  },
});

export const { setUser, setProfile,logout } = authSlice.actions;
export default authSlice.reducer;
