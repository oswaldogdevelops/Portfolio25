import { AppBar, Box, Button, Toolbar, Typography, Snackbar, IconButton, Drawer, List, ListItem, ListItemText } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink } from 'react-router'; // Importa useNavigate de 'react-router-dom'
import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { supabase } from '../../utils/supabaseclient';
import { logout } from '../../store/slices/authSlice';
import MenuIcon from '@mui/icons-material/Menu';  // Icono de menú hamburguesa

const NavbarNew = () => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth.user);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [drawerOpen, setDrawerOpen] = useState(false); // Estado para abrir/cerrar el Drawer
  const navigate = useNavigate(); // <-- Hook para navegar

  // Función para manejar el logout
  const handleLogout = async () => {
    const response = await supabase.auth.signOut(); // Llamamos a Supabase para cerrar la sesión
    console.log(response);

    if (response.error) {
      console.error('Error al cerrar sesión:', response.error);
      setSnackbarMessage(`Error: ${response.error}`); // Mostrar el mensaje de error de Supabase
    } else {
      navigate('/');
      dispatch(logout()); // Actualizamos el estado de Redux

      setSnackbarMessage('Sesión cerrada exitosamente'); // Mensaje de éxito
    }

    setOpenSnackbar(true); // Abrimos el Snackbar
  };

  return (
    <div>
      <AppBar
        position="static"
        sx={{
          background: 'transparent',
          boxShadow: 'none',
          px: 2,
          background: 'radial-gradient(circle at top right, #0047d5e3, #0a0a23 70%)',
          color: '#fff',
        }}
      >
        <Toolbar disableGutters sx={{ justifyContent: 'space-between', width: '100%' }}>
          <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
            XMART
          </Typography>

          {/* Icono de hamburguesa que abre el Drawer */}
          <IconButton
            sx={{ display: { xs: 'block', sm: 'none' } }}
            onClick={() => setDrawerOpen(true)}
          >
            <MenuIcon sx={{ color: '#fff' }} />
          </IconButton>

          {/* Botones visibles solo en pantallas grandes */}
          <Box
            sx={{
              display: { xs: 'none', sm: 'flex' }, // Ocultar en dispositivos pequeños
              alignItems: 'center',
              gap: 3,
              flexWrap: 'wrap',
              justifyContent: 'flex-end',
              width: '100%',
            }}
          >
            <Button color="inherit" component={RouterLink} to="/">
              Inicio
            </Button>
            <Button color="inherit" component={RouterLink} to="/register">
              Registrarse
            </Button>

            {isAuthenticated ? (
              <>
                <Button color="inherit" component={RouterLink} to="/profile">
                  {user?.full_name}
                </Button>
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: '#0066ff',
                    textTransform: 'none',
                    borderRadius: '8px',
                    fontWeight: 'bold',
                  }}
                  onClick={handleLogout}
                >
                  Cerrar sesión
                </Button>
              </>
            ) : (
              <Button
                variant="contained"
                sx={{
                  backgroundColor: '#0066ff',
                  textTransform: 'none',
                  borderRadius: '8px',
                  fontWeight: 'bold',
                }}
                component={RouterLink}
                to="/login"
              >
                Iniciar sesión
              </Button>
            )}
          </Box>
        </Toolbar>
      </AppBar>

      {/* Drawer que se abre con el icono de menú */}
      <Drawer anchor="right" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <List sx={{ width: 250 }}>
          <ListItem button component={RouterLink} to="/">
            <ListItemText primary="Inicio" />
          </ListItem>
          <ListItem button component={RouterLink} to="/register">
            <ListItemText primary="Registrarse" />
          </ListItem>
          {isAuthenticated && (
            <>
              <ListItem button component={RouterLink} to="/profile">
                <ListItemText primary={user?.full_name} />
              </ListItem>
              <ListItem button onClick={handleLogout}>
                <ListItemText primary="Cerrar sesión" />
              </ListItem>
            </>
          )}
          {!isAuthenticated && (
            <ListItem button component={RouterLink} to="/login">
              <ListItemText primary="Iniciar sesión" />
            </ListItem>
          )}
        </List>
      </Drawer>

      {/* Snackbar para mostrar mensajes de éxito o error */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenSnackbar(false)}
        message={snackbarMessage}
      />
    </div>
  );
};

export default NavbarNew;
