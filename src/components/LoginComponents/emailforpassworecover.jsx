import React, { useState } from 'react';
import { Container, Box, TextField, Button, Typography, CssBaseline, Avatar } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { supabase } from '../../utils/supabaseclient';
import { useNavigate } from 'react-router';  // <-- Importa useNavigate

const theme = createTheme();

const EmailForRecovery = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();  // <-- Hook para navegar

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    if (!email) {
      setError('Por favor ingresa tu correo electrónico.');
      return;
    }

    setLoading(true);

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      // Pon aquí la URL base de tu app o una url "falsa" porque la redirección real la haces con navigate
      redirectTo: window.location.origin + '/recuperar-password' 
    });

    setLoading(false);

    if (error) {
      setError('Error enviando el email: ' + error.message);
    } else {
      setMessage('Correo enviado! Revisa tu bandeja de entrada.');
      // Redirige después de 2 segundos, por ejemplo
      setTimeout(() => {
        navigate('/login'); // Cambia a la ruta que quieras
      }, 3000);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <EmailIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Recuperar Contraseña
          </Typography>
          {error && (
            <Typography color="error" sx={{ mt: 2 }}>
              {error}
            </Typography>
          )}
          {message && (
            <Typography color="primary" sx={{ mt: 2 }}>
              {message}
            </Typography>
          )}
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
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
              disabled={loading}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={loading}
              sx={{ mt: 3, mb: 2 }}
            >
              {loading ? 'Enviando...' : 'Enviar link de recuperación'}
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default EmailForRecovery;

