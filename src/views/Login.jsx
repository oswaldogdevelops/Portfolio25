import React, { useState } from 'react';
import { Button, TextField, Typography, Container, Box, Link, CssBaseline, Avatar } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link as RouterLink } from 'react-router';
import { useDispatch } from 'react-redux';
import { supabase } from '../utils/supabaseclient';
import { setUser, setProfile } from '../store/slices/authSlice'; // Asegúrate de tener setProfile en tu authSlice
import { useNavigate } from 'react-router';

// Tema por defecto de Material-UI
const defaultTheme = createTheme();

const Login = () => {
  // Estados para el correo electrónico y la contraseña
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // Hook de Redux para despachar acciones
  const dispatch = useDispatch();
  // Hook de React Router para la navegación programática
  const navigate = useNavigate();

  /**
   * Maneja el envío del formulario de inicio de sesión.
   * @param {Event} event El evento de envío del formulario.
   */
  const handleSubmit = async (event) => {
    event.preventDefault(); // Previene el comportamiento por defecto del formulario

    console.log('Iniciando sesión con email:', email);

    // Intenta iniciar sesión con Supabase
    const { data, error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    console.log('Respuesta de Supabase:', data.user?.user_metadata);

    // Manejo de errores de autenticación
    if (authError) {
      console.error('Error de autenticación:', authError.message);
      // TODO: Reemplazar alert() con un componente de mensaje personalizado para el usuario
      console.error('Error de inicio de sesión: ' + authError.message);
      // alert('Error de inicio de sesión: ' + authError.message); // Evitar alert() en producción
    } else if (data.user) {
      // Si el inicio de sesión es exitoso, despacha los datos del usuario
      dispatch(setUser(data.user.user_metadata));
      console.log('Usuario autenticado:', data.user);

      // Ahora, busca el perfil del usuario en la tabla 'profiles' usando el ID del usuario
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('*') // Selecciona todas las columnas del perfil
        .eq('id', data.user.id) // Busca el perfil donde el 'id' coincida con el ID del usuario
        .single(); // Espera un único resultado

      // Manejo de errores al obtener el perfil
      if (profileError) {
        console.error('Error al obtener el perfil:', profileError.message);
        // TODO: Reemplazar alert() con un componente de mensaje personalizado para el usuario
        console.error('No se pudo cargar el perfil del usuario: ' + profileError.message);
        // alert('No se pudo cargar el perfil del usuario: ' + profileError.message); // Evitar alert() en producción
      } else if (profileData) {
        // Si el perfil se encuentra, despacha los datos del perfil
        dispatch(setProfile(profileData));
        console.log('Perfil cargado:', profileData);
      } else {
        console.warn('No se encontró un perfil para el usuario con ID:', data.user.id);
        // Puedes manejar este caso, por ejemplo, creando un perfil por defecto o redirigiendo a una página de configuración de perfil.
      }

      // Redirige al usuario al dashboard después de un inicio de sesión exitoso y carga del perfil
      navigate('/dash');
    }
  };

  /**
   * Maneja el envío del email de recuperación de contraseña.
   */
  const handleRecuperarContrasena = async () => {
    if (!email) {
      // TODO: Reemplazar alert() con un componente de mensaje personalizado para el usuario
      console.error('Por favor ingresa tu correo electrónico para recuperar la contraseña.');
      // alert('Por favor ingresa tu correo electrónico para recuperar la contraseña.'); // Evitar alert() en producción
      return;
    }

    // Intenta enviar el email de recuperación de contraseña con Supabase
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: 'https://tu-app.com/nueva-contrasena' // **IMPORTANTE**: Cambia esta URL a la ruta real de tu aplicación
    });

    // Manejo de errores al enviar el email de recuperación
    if (error) {
      console.error('Error enviando el email de recuperación:', error.message);
      // TODO: Reemplazar alert() con un componente de mensaje personalizado para el usuario
      console.error('Error enviando el email de recuperación: ' + error.message);
      // alert('Error enviando el email de recuperación: ' + error.message); // Evitar alert() en producción
    } else {
      // TODO: Reemplazar alert() con un componente de mensaje personalizado para el usuario
      console.log('Email de recuperación enviado. Revisa tu correo.');
      // alert('Email de recuperación enviado. Revisa tu correo.'); // Evitar alert() en producción
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline /> {/* Resetea el CSS para una base consistente */}
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          {/* Avatar con icono de candado */}
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          {/* Título del formulario */}
          <Typography component="h1" variant="h5">
            Iniciar Sesión
          </Typography>
          {/* Formulario de inicio de sesión */}
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            {/* Campo de texto para el correo electrónico */}
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Correo Electrónico"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {/* Campo de texto para la contraseña */}
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Contraseña"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {/* Botón para iniciar sesión */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Iniciar Sesión
            </Button>

            {/* Botón para recuperar contraseña */}
            <Button
              fullWidth
              variant="outlined"
              sx={{ mb: 2 }}
              onClick={() => navigate('/email-val')} // Redirige a la página de validación de email para recuperación
            >
              ¿Olvidaste tu contraseña?
            </Button>

            {/* Link para registro */}
            <Link  component={RouterLink}
                      to="/register" variant="body2">
              ¿No tienes una cuenta? Regístrate
            </Link>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default Login;
