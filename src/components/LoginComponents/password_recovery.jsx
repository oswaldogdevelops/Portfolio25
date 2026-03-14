import React, { useState, useEffect } from 'react';
import { Container, Box, TextField, Button, Typography, CssBaseline, Avatar } from '@mui/material';
import LockResetIcon from '@mui/icons-material/LockReset';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router'; // Asegúrate de usar 'react-router-dom'
import { supabase } from '../../utils/supabaseclient';

const theme = createTheme();

const RecuperarPassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [sessionChecked, setSessionChecked] = useState(false);
  const [sessionExists, setSessionExists] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session) {
        setSessionExists(true);
      } else {
        setErrorMsg('Sesión inválida. Abre el enlace directamente desde tu correo.');
      }
      setSessionChecked(true);
    };

    checkSession();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (!password || !confirmPassword) {
      setErrorMsg('Por favor completa todos los campos.');
      return;
    }

    if (password !== confirmPassword) {
      setErrorMsg('Las contraseñas no coinciden.');
      return;
    }

    setLoading(true);

    const { error } = await supabase.auth.updateUser({ password });

    setLoading(false);

    if (error) {
      setErrorMsg('Error al cambiar la contraseña: ' + error.message);
    } else {
      setSuccessMsg('Contraseña actualizada correctamente. Redirigiendo al login...');
      setTimeout(() => {
        navigate('/login');
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
            <LockResetIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Cambiar Contraseña
          </Typography>

          {!sessionChecked ? (
            <Typography sx={{ mt: 3 }}>Verificando sesión...</Typography>
          ) : !sessionExists ? (
            <Typography color="error" sx={{ mt: 2 }}>
              {errorMsg}
            </Typography>
          ) : (
            <>
              {errorMsg && (
                <Typography color="error" sx={{ mt: 2 }}>
                  {errorMsg}
                </Typography>
              )}
              {successMsg && (
                <Typography color="primary" sx={{ mt: 2 }}>
                  {successMsg}
                </Typography>
              )}
              <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Nueva Contraseña"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={loading}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="confirmPassword"
                  label="Confirmar Nueva Contraseña"
                  type="password"
                  id="confirmPassword"
                  autoComplete="new-password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  disabled={loading}
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  disabled={loading}
                  sx={{ mt: 3, mb: 2 }}
                >
                  {loading ? 'Actualizando...' : 'Actualizar Contraseña'}
                </Button>
              </Box>
            </>
          )}
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default RecuperarPassword;
