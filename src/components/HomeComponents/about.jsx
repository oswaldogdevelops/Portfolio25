import React from 'react';
import { Box, Typography, Grid, Container, Paper } from '@mui/material';
import CodeIcon from '@mui/icons-material/Code';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import PersonIcon from '@mui/icons-material/Person';

const About = () => {
  const skills = [
    { icon: <CodeIcon />, title: "Desarollo", description: "Desarollo escalable con enfoque en la nescesidad del cliente." },
    { icon: <BusinessCenterIcon />, title: "Diseño", description: "Diseños elegantes, Visualmente atractivos" },
    { icon: <PersonIcon />, title: "Experiencia", description: "Interfaces intuitivas para el comfort del usuario" }
  ];

  const s = '67px';
  const c1 = '#c1a0c5';
  const c2 = '#ad77da';
  const c3 = '#71e5ab';

  // Fragmentos de gradiente reutilizables
  const _c = `75%, ${c3} 52.72deg, #0000 0`;
  const _g1 = `conic-gradient(from -116.36deg at 25% ${_c})`;
  const _g2 = `conic-gradient(from 63.43deg at 75% ${_c})`;

  const animations = {
    '@keyframes fadeInUp': {
      from: { opacity: 0, transform: 'translateY(30px)' },
      to: { opacity: 1, transform: 'translateY(0)' }
    },
    '@keyframes floating': {
      '0%, 100%': { transform: 'translateY(0px)' },
      '50%': { transform: 'translateY(-15px)' }
    }
  };

  return (
    <Box 
      component="section" 
      id="about" 
      sx={{ 
        py: 12, 
        px: { xs: 2, md: 4 }, 
        ...animations,
        position: 'relative',
        overflow: 'hidden',

        // --- CONFIGURACIÓN PATRÓN CUBOS ISOMÉTRICOS TRANSPARENTES ---
        background: `
          ${_g1}, 
          ${_g1} calc(3 * ${s}) calc(${s} / 2),
          ${_g2}, 
          ${_g2} calc(3 * ${s}) calc(${s} / 2),
          conic-gradient(
            ${c2} 63.43deg, 
            ${c1} 0 116.36deg,
            ${c2} 0 180deg, 
            ${c1} 0 243.43deg,
            ${c2} 0 296.15deg, 
            ${c1} 0
          )
        `,
        backgroundSize: `calc(2 * ${s}) ${s}`,
        // ------------------------------------------------------------
      }}
    >
      <Container maxWidth="lg">
        {/* TEXTO E IMAGEN */}
        <Grid container spacing={4} alignItems="center" sx={{ mb: 10 }}>
          <Grid item xs={12} md={6}>
            <Box sx={{ textAlign: { xs: 'center', md: 'left' } }}>
              <Typography variant="overline" sx={{ color: '#1a1a1a', fontWeight: 700, letterSpacing: 2, display: 'block' }}>
                Descubreme
              </Typography>
              <Typography variant="h3" sx={{ fontWeight: 900, color: '#252525ff', mb: 2, fontSize: { xs: '2.2rem', md: '3.2rem' } }}>
                Pasion por crear <br/> Experiencias Digitales
              </Typography>
              <Typography variant="body1" sx={{ color: '#252525ff', fontSize: '1.2rem',   fontFamily: "Outfit",}}>
                Soy un creador de soluciones digitales especializado en el diseño y desarrollo de páginas web
              </Typography>
                 <Typography variant="body1" sx={{ color: '#252525ff', fontSize: '1.2rem',   fontFamily: "Outfit", }}>
                mi enfoque no se limita a escribir codigo y elegir colores
              </Typography>
              <Typography variant="body1" sx={{ color: '#252525ff', fontSize: '1.2rem',   fontFamily: "Outfit", }}>
                Creo fielmente que una gran web nace de una buena conversación: por eso, mi empeño es
              </Typography>
              <Typography variant="body1" sx={{ color: '#252525ff', fontSize: '1.2rem',   fontFamily: "Outfit", }}>
               en escuchar y entender profundamente lo que cada cliente busca y necesita.
              </Typography>
              <Typography variant="body1" sx={{ color: '#252525ff', fontSize: '1.2rem',   fontFamily: "Outfit",}}>
               Transformo tus ideas en experiencias digitales  que conectan con tu audiencia
              </Typography>
              <Typography variant="body1" sx={{ color: '#252525ff', fontSize: '1.2rem',   fontFamily: "Outfit", }}>
               cumplen tus objetivos de negocio.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={6} sx={{ display: 'flex', justifyContent: 'center' }}>
            <Box component="img" src="/ornito-removebg2.png" sx={{ width: '100%', maxWidth: 300, animation: 'floating 4.5s infinite', filter: 'drop-shadow(0 20px 30px rgba(0,0,0,0.3))' }} />
          </Grid>
        </Grid>

        {/* CARDS ALINEADAS (FLEXBOX) */}
        <Box 
          sx={{ 
            display: 'flex', 
            flexDirection: { xs: 'column', md: 'row' }, 
            gap: 3, 
            justifyContent: 'center',
            alignItems: 'stretch' 
          }}
        >
          {skills.map((skill, index) => (
            <Paper 
              key={index}
              elevation={0} 
              sx={{
                flex: 1, 
                p: 5,
                borderRadius: 6, 
                bgcolor: 'rgba(255, 255, 255, 0.15)', 
                backdropFilter: 'blur(12px)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center', 
                textAlign: 'center',
                transition: 'all 0.3s ease',
                animation: `fadeInUp 0.6s ease-out ${index * 0.2}s forwards`,
                opacity: 0,
                '&:hover': { transform: 'translateY(-10px)', bgcolor: 'rgba(255, 255, 255, 0.25)', borderColor: 'white' }
              }}
            >
              <Box sx={{ 
                width: 55, height: 55, borderRadius: 3, bgcolor: 'white', 
                display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 3 
              }}>
                {React.cloneElement(skill.icon, { sx: { color: '#3ac976', fontSize: 28 } })}
              </Box>
              <Typography variant="h5" sx={{ color: 'black', fontWeight: 800, mb: 1.5, fontFamily: "Belleza" }}>
                {skill.title}
              </Typography>
              <Typography variant="body1" sx={{ color: 'black', lineHeight: 1.6, fontFamily: "Outfit", }}>
                {skill.description}
              </Typography>
            </Paper>
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default About;