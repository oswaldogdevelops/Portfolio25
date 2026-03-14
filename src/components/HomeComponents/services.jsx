import React from 'react';
import { Box, Typography, Container, Paper } from '@mui/material';
import CodeIcon from '@mui/icons-material/Code';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import PersonIcon from '@mui/icons-material/Person';

const Services = () => {
  const skills = [
    { icon: <CodeIcon />, title: "Landing Pages", description: "Ideal para emprendedores que nescesitan visibilidad digital" },
    { icon: <BusinessCenterIcon />, title: "Sitio Web Corporativo", description: "Ideal para empresas con identidad de marca ya establecidas" },
    { icon: <PersonIcon />, title: "Web E-commerce", description: "Para mejorar la eficiencia y responder a la demanda digital" }
  ];

  const s = '67px';
  const c1 = '#c1a0c5';
  const c2 = '#ad77da';
  const c3 = '#71e5ab';

  const _c = `75%, ${c3} 52.72deg, #0000 0`;
  const _g1 = `conic-gradient(from -116.36deg at 25% ${_c})`;
  const _g2 = `conic-gradient(from 63.43deg at 75% ${_c})`;

  const animations = {
    '@keyframes fadeInUp': {
      from: { opacity: 0, transform: 'translateY(30px)' },
      to: { opacity: 1, transform: 'translateY(0)' }
    }
  };

  return (
    <Box 
      component="section" 
      id="services" 
      sx={{ 
        py: 12, 
        px: { xs: 2, md: 4 }, 
        ...animations,
        position: 'relative',
        overflow: 'hidden',
        background: `${_g1}, ${_g1} calc(3 * ${s}) calc(${s} / 2), ${_g2}, ${_g2} calc(3 * ${s}) calc(${s} / 2),
          conic-gradient(${c2} 63.43deg, ${c1} 0 116.36deg, ${c2} 0 180deg, ${c1} 0 243.43deg, ${c2} 0 296.15deg, ${c1} 0)`,
        backgroundSize: `calc(2 * ${s}) ${s}`,
      }}
    >
      <Container maxWidth="lg">
        {/* --- TÍTULO SECCIÓN --- */}
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Typography 
            variant="h3" 
            sx={{ 
              fontWeight: 900, 
              color: 'black', 
              textTransform: 'uppercase',
              letterSpacing: 2,
              position: 'relative',
              display: 'inline-block',
              '&::after': {
                content: '""',
                position: 'absolute',
                width: '60%',
                height: '4px',
                backgroundColor: '#3ac976',
                bottom: -10,
                left: '20%',
                borderRadius: 2
              }
            }}
          >
            Servicios
          </Typography>
        </Box>

        {/* CARDS ALINEADAS */}
        <Box 
          sx={{ 
            display: 'flex', 
            flexDirection: { xs: 'column', md: 'row' }, 
            gap: 4, 
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
                borderRadius: 8, 
                bgcolor: 'rgba(255, 255, 255, 0.2)', 
                backdropFilter: 'blur(15px)',
                border: '2px solid rgba(0, 0, 0, 0.72)',
                boxShadow: '0 15px 30px rgba(0, 0, 0, 0.81)', // <--- BOX SHADOW
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center', 
                textAlign: 'center',
                transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                animation: `fadeInUp 0.6s ease-out ${index * 0.2}s forwards`,
                opacity: 0,
                '&:hover': { 
                  transform: 'translateY(-15px)', 
                  bgcolor: 'rgba(255, 255, 255, 0.35)', 
                  boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15)', // Sombra más fuerte al hover
                  borderColor: 'white' 
                }
              }}
            >
              <Box sx={{ 
                width: 65, height: 65, borderRadius: 4, bgcolor: 'white', 
                display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 3,
                boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
              }}>
                {React.cloneElement(skill.icon, { sx: { color: '#3ac976', fontSize: 32 } })}
              </Box>

              <Typography variant="h5" sx={{ color: 'black', fontWeight: 800, mb: 2, fontFamily: "Belleza" }}>
                {skill.title}
              </Typography>

              <Typography 
                variant="body1" 
                sx={{ 
                  color: 'rgba(0, 0, 0, 0.81)', 
                  lineHeight: 1.6,
                  fontFamily: "Outfit",
                  // --- MULTILINE CLAMP (Límite de 2 líneas) ---
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis'
                }}
              >
                {skill.description}
              </Typography>
            </Paper>
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default Services;