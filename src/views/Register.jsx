import React, { useState, useEffect, useCallback } from 'react';
import { supabase } from '../utils/supabaseclient';
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Container,
  TextField,
  Typography,
  Paper
} from '@mui/material';
import { useSearchParams } from 'react-router';

const SignUpForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    fullName: '',
    username: '',
    phone: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [debugLogs, setDebugLogs] = useState([]);
  const [searchParams] = useSearchParams();

  const ref = searchParams.get('ref');

  const addDebugLog = useCallback((message, type = 'info') => {
    const timestamp = new Date().toLocaleTimeString();
    const formattedMessage = `[${timestamp}] [${type.toUpperCase()}]: ${message}`;
    console.log(formattedMessage);
    setDebugLogs(prev => [...prev, formattedMessage]);
  }, []);

  useEffect(() => {
    addDebugLog('Componente de registro montado.');
    if (ref) {
      addDebugLog(`Parámetro de referencia (ref) encontrado en la URL: ${ref}`, 'info');
    }
    return () => addDebugLog('Componente de registro desmontado.', 'warn');
  }, [addDebugLog, ref]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);
    addDebugLog('--- Iniciando proceso de registro ---', 'start');

    const { email, password, fullName, username, phone } = formData;

    try {
      if (!supabase) {
        throw new Error('El cliente de Supabase no está inicializado. Verifica tu configuración.');
      }
      addDebugLog('Cliente de Supabase verificado.', 'success');

      // 1. Registrar al usuario en la autenticación de Supabase
      addDebugLog(`Intentando registrar usuario: ${email}...`);
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
        phone,
        options: {
          data: {
            full_name: fullName,
            phone: phone,
          }
        }
      });

      if (authError) {
        addDebugLog(`Error de autenticación: ${authError.message}`, 'error');
        throw new Error(`Fallo en la autenticación: ${authError.message}`);
      }

      const newUser = authData.user;

      if (!newUser) {
        addDebugLog('No se recibieron datos de usuario después del registro. Es posible que se requiera verificación por email.', 'warn');
        setSuccess(true);
        return;
      }

      addDebugLog(`Usuario autenticado con éxito: ${newUser.id}`, 'success');

      // 2. Insertar los datos del perfil en la tabla 'profiles'
      addDebugLog('Preparando datos del perfil para inserción...');
      const profileToInsert = {
        id: newUser.id,
        email: email,
        full_name: fullName,
        username: username,
        phone: phone,
        referral_count: 0, // Asegúrate de inicializarlo para el nuevo perfil
        current_balance: 0,
        matrix_level: 1
      };

      const { error: profileError } = await supabase
        .from('profiles')
        .upsert([profileToInsert], { onConflict: 'id' });

      if (profileError) {
        addDebugLog(`Error al crear el perfil: ${profileError.message}`, 'error');
        throw new Error(`Fallo al crear el perfil: ${profileError.message}`);
      }

      addDebugLog('Perfil creado exitosamente.', 'success');

      // ... (código anterior) ...

      // --- Lógica para registrar la referencia e incrementar el contador ---
      if (ref && newUser.id) {
        addDebugLog(`Parámetro 'ref' encontrado: ${ref}. Intentando registrar la referencia...`);
        try {
          const { error: referralError } = await supabase
            .from('referrals')
            .insert([
              {
                referrer_id: ref,
                referred_id: newUser.id,
              }
            ]);

          if (referralError) {
            addDebugLog(`Error al insertar la referencia: ${referralError.message}`, 'error');
          } else {
            addDebugLog('Referencia registrada exitosamente.', 'success');

            // --- Incrementa el contador del referente ---
            addDebugLog(`Incrementando el contador de referidos para el usuario: ${ref}...`);
            // ¡CORRECCIÓN AQUÍ! Llama a .rpc directamente desde supabase
            const { error: countError } = await supabase
              .rpc('increment_referral_count', { referrer_profile_id: ref }); // <-- ESTE ES EL CAMBIO CLAVE

            if (countError) {
              addDebugLog(`Error al incrementar el contador: ${countError.message}`, 'error');
            } else {
              addDebugLog('Contador de referidos actualizado exitosamente.', 'success');
            }

            // Insertar notificación para el referrer
            addDebugLog(`Enviando notificación al usuario que refirió (ID: ${ref})...`);
            const notificationMessage = `Tu referido ${fullName} ha completado su registro con éxito.`;

            const { error: notificationError } = await supabase.from('notifications').insert({
              user_id: ref,
              title: 'Nuevo referido registrado',
              message: notificationMessage,
              read: false
            });

            if (notificationError) {
              addDebugLog(`Error al insertar notificación: ${notificationError.message}`, 'error');
            } else {
              addDebugLog('Notificación insertada exitosamente para el referrer.', 'success');
            }


          }
        } catch (referralCatchError) {
          addDebugLog(`Error inesperado al intentar registrar la referencia o incrementar el contador: ${referralCatchError.message}`, 'error');
        }
      } else if (!ref) {
        addDebugLog('No se encontró el parámetro "ref" en la URL. No se registrará referencia ni se incrementará contador.', 'info');
      }
      // --- Fin de la lógica de referencia e incremento ---

      // ... (resto del código) ...

      setSuccess(true);
      setFormData({
        email: '',
        password: '',
        fullName: '',
        username: '',
        phone: ''
      });

    } catch (err) {
      addDebugLog(`Error general del proceso: ${err.message}`, 'critical');
      setError(err.message);
    } finally {
      setLoading(false);
      addDebugLog('--- Proceso de registro finalizado ---', 'end');
    }
  };

  return (
    <Container maxWidth="sm">
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          mt: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          p: 4,
          boxShadow: 3,
          borderRadius: 2,
          bgcolor: 'background.paper'
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          Crea tu Cuenta
        </Typography>

        {error && (
          <Alert severity="error" sx={{ width: '100%', mb: 2 }}>
            {error}
          </Alert>
        )}

        {success && (
          <Alert severity="success" sx={{ width: '100%', mb: 2 }}>
            ¡Cuenta creada exitosamente! Por favor, revisa tu correo electrónico para verificar tu cuenta.
          </Alert>
        )}

        <TextField
          label="Correo Electrónico"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          margin="normal"
          required
          fullWidth
          autoComplete="email"
        />

        <TextField
          label="Contraseña"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          margin="normal"
          required
          fullWidth
          inputProps={{ minLength: 6 }}
          autoComplete="new-password"
        />

        <TextField
          label="Nombre Completo"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          margin="normal"
          required
          fullWidth
        />

        <TextField
          label="Nombre de Usuario"
          name="username"
          value={formData.username}
          onChange={handleChange}
          margin="normal"
          required
          fullWidth
        />

        <TextField
          label="Número de Teléfono"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          margin="normal"
          fullWidth
        />

        <Button
          type="submit"
          variant="contained"
          disabled={loading}
          sx={{ mt: 3, mb: 2, width: '100%' }}
        >
          {loading ? <CircularProgress size={24} color="inherit" /> : 'Registrarse'}
        </Button>

        {/* Consola de Depuración */}
        <Paper
          elevation={1}
          sx={{
            mt: 3,
            p: 2,
            backgroundColor: '#f5f5f5',
            borderRadius: 1,
            width: '100%',
            maxHeight: '250px',
            overflowY: 'auto'
          }}
        >
          <Typography variant="h6" gutterBottom>Consola de Depuración</Typography>
          <Box sx={{ fontFamily: 'monospace', fontSize: '0.8rem', whiteSpace: 'pre-wrap' }}>
            {debugLogs.map((log, index) => (
              <div key={index} style={{ color: log.includes('ERROR') || log.includes('CRITICAL') ? 'red' : log.includes('SUCCESS') ? 'green' : log.includes('WARN') ? 'orange' : 'inherit' }}>
                {log}
              </div>
            ))}
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default SignUpForm;