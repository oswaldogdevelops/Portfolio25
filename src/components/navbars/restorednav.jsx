import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material'
import { useSelector } from 'react-redux';
import { Link as RouterLink } from 'react-router'; // Alias para el Link de React Router
import React from 'react'

const NavbarNew = () => {
const user = useSelector((state) => state.auth.user);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  return (

    <div>
       <AppBar position="static" sx={{ background: 'transparent', boxShadow: 'none', px: 2,  background: 'radial-gradient(circle at top right, #0046d5, #0a0a23 70%)',
        color: '#fff', }}
       >
        <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
          <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
            XMART
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
            <Button color="inherit" component={RouterLink} to="/">Inicio</Button>
            <Button color="inherit" component={RouterLink} to="/register">Registrarse</Button>
     {isAuthenticated ? (
       <Button color="inherit" component={RouterLink} to="/register">{user?.full_name}</Button> 
       
      ) : (
        <p></p>
      )}


 {isAuthenticated ? (
           <Button
              variant="contained"
              sx={{
                backgroundColor: '#0066ff',
                textTransform: 'none',
                borderRadius: '8px',
                fontWeight: 'bold',
              }}
              component={RouterLink} to="/login"
            >
              Cerrar sesion
            </Button>
       
      ) : (
        <Button
              variant="contained"
              sx={{
                backgroundColor: '#0066ff',
                textTransform: 'none',
                borderRadius: '8px',
                fontWeight: 'bold',
              }}
              component={RouterLink} to="/login"
            >
              Iniciar sesion
            </Button>
      )}


            
        
          </Box>
        </Toolbar>
      </AppBar>
    </div>
  )
}

export default NavbarNew
