import React from 'react';
import { Box, Typography, Grid, Container, Button } from '@mui/material';
import { Link as RouterLink } from 'react-router'; // Importa useNavigate de 'react-router-dom'

const HomePagept = () => {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        width: '100vw',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflowX: 'hidden',
        color: 'white',
        margin: 0,
        padding: 0,
        // --- CONFIGURACIÓN DEL FONDO ---
        "--s": "125px", // El tamaño que definiste
        background: '#3ac976', // Color de respaldo
        backgroundImage: `
          linear-gradient(atan(-.5), rgba(255,255,255,0.07) 33%, rgba(0,0,0,0.05) 33.5% 66.5%, rgba(255,255,255,0.07) 67%), 
          linear-gradient(132deg, rgba(58, 201, 118, 0.9) 17%, rgba(154, 88, 252, 0.9) 81%)
        `,
        backgroundSize: 'var(--s) var(--s), auto',
        // ------------------------------
      }}
    >
      <Container maxWidth="lg">
        <Grid
          container
          spacing={2}
          alignItems="center"
          justifyContent="center"
        >
          {/* LADO IZQUIERDO: Mensaje de bienvenida */}
          <Grid item xs={12} md={7}>
            <Box sx={{ textAlign: { xs: 'center', md: 'left' }, pr: { md: 5 } }}>
              <Typography
                variant="h2"
                component="h1"
                sx={{
                  fontWeight: 800,
                  color: '#f7f7f7ff',
                  fontFamily: "Merge Black W00 Regular",
                  WebkitTextStroke: '2px #130b47ff',
                  textShadow: `
      -4px -4px 0 #b6fff9ff, 
       4px -4px 0 #b6fff9ff,
      -4px  4px 0 #b6fff9ff,
       4px  4px 0 #ffffffff
    `,
                  lineHeight: 1.1,
                  mb: 2,
                  fontSize: { xs: '2.8rem', md: '4.5rem' }
                }}
              >
                Bienvenido a <br /> tuwebpagecatchy
              </Typography>

              <Typography
                variant="h5"
                sx={{
                  mb: 4,
                  color: '#202020ff',
                  fontFamily: "Outfit",
                  fontWeight: 400,
                  letterSpacing: '0.5px',
                  maxWidth: '550px',
                  mx: { xs: 'auto', md: 0 }
                }}
              >
                Hola, soy un diseñador de webs apasionado por crear experiencias únicas.
                Descubre cómo transformo ideas en soluciones digitales.
              </Typography>

              <Button
                variant="contained"
                size="large"
                sx={{
                  backgroundColor: '#1a1a1a',
                  color: 'white',
                  px: 4,
                  py: 1.5,
                  borderRadius: '30px',
                  textTransform: 'none',
                  fontSize: '1.1rem',
                  fontWeight: 'bold',
                  '&:hover': {
                    backgroundColor: '#333',
                    transform: 'translateY(-3px)',
                    boxShadow: '0px 10px 20px rgba(0,0,0,0.2)'
                  },
                  transition: 'all 0.3s ease'
                }}
                component={RouterLink} to="/projects"
              >
                Empezar tour
              </Button>
            </Box>
          </Grid>

          {/* LADO DERECHO: Imagen del icono */}
          <Grid item xs={12} md={5}>
            <Box
              component="img"
              src="/ornito-removebg-preview.png"
              alt="Mascota programadora"
              sx={{
                width: '100%',
                maxWidth: { xs: 250, md: 450 },
                height: 'auto',
                filter: 'drop-shadow(0px 15px 20px rgba(0,0,0,0.3))',
                animation: 'float 3s ease-in-out infinite',
                '@keyframes float': {
                  '0%, 100%': { transform: 'translateY(0)' },
                  '50%': { transform: 'translateY(-20px)' },
                },
              }}
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default HomePagept;