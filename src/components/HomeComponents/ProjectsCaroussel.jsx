import React, { useState } from 'react';
import { Box, Typography, Paper, IconButton, Tooltip, Link } from '@mui/material';
import { ArrowBackIosNew, ArrowForwardIos, Launch, Block, ArrowBack } from '@mui/icons-material';
import { Link as RouterLink } from 'react-router'; // Importante para la navegación

const projects = [
  { id: 1, title: 'Luminapro', image: 'res/luminares.PNG', link: 'https://luminapro-ebon.vercel.app' },
  { id: 2, title: 'Xmart Crypto', image: 'res/photo_2025-08-18_14-39-04.jpg' },
  { id: 3, title: 'DentalCare', image: 'res/dentalres.PNG', link: 'https://dentalcaree.vercel.app' },
  { id: 4, title: 'FitApp', image: 'res/fitapp.PNG' },
  { id: 5, title: 'AI Chatbot', image: '/ornito-removebg-preview.png' },
];

const ProjectCarousel = () => {
  const [active, setActive] = useState(2);

  const handleNext = () => setActive((prev) => (prev + 1) % projects.length);
  const handlePrev = () => setActive((prev) => (prev - 1 + projects.length) % projects.length);

  const handleCardClick = (index, link) => {
    if (index === active && link) {
      window.open(link, '_blank');
    } else {
      setActive(index);
    }
  };

  return (
    <Box sx={{
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      width: '100%',
      bgcolor: '#000',
      overflow: 'hidden',
    }}>
      
      {/* BOTÓN REGRESAR A HOME */}
      <Box sx={{
        position: 'absolute',
        top: 30,
        left: 30,
        zIndex: 10,
      }}>
        <Tooltip title="Volver al Inicio" placement="right">
          <IconButton 
            component={RouterLink} 
            to="/" 
            sx={{ 
              color: 'white', 
              bgcolor: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              transition: 'all 0.3s ease',
              '&:hover': {
                bgcolor: 'rgba(255, 255, 255, 0.2)',
                transform: 'translateX(-5px)',
                boxShadow: '0 0 15px rgba(255,255,255,0.3)'
              }
            }}
          >
            <ArrowBack />
          </IconButton>
        </Tooltip>
      </Box>

      {/* BACKGROUND DINÁMICO */}
      <Box sx={{
        position: 'absolute',
        top: 0, left: 0, right: 0, bottom: 0,
        zIndex: 0,
        backgroundImage: `url(${projects[active].image})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        opacity: 0.3,
        filter: 'blur(60px)',
        transition: 'background-image 0.8s ease-in-out',
        '&::after': {
          content: '""',
          position: 'absolute',
          top: 0, left: 0, right: 0, bottom: 0,
          background: 'radial-gradient(circle, transparent 10%, #000 90%)'
        }
      }} />

      {/* CARROUSEL (El código se mantiene igual que la versión anterior) */}
      <Box sx={{
        position: 'relative',
        zIndex: 1,
        perspective: '1200px',
        width: '100%',
        height: '450px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        transformStyle: 'preserve-3d',
      }}>
        {projects.map((project, index) => {
          const offset = index - active;
          const absOffset = Math.abs(offset);
          const isActive = index === active;
          const hasLink = !!project.link;

          return (
            <Paper
              key={project.id}
              elevation={0}
              sx={{
                position: 'absolute',
                width: { xs: '260px', md: '320px' },
                height: '420px',
                transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
                cursor: isActive && hasLink ? 'pointer' : 'default',
                pointerEvents: isActive ? 'auto' : 'none', // ✅ FIX
                transform: `
                  rotateY(${offset * -40}deg) 
                  scale(${1 - absOffset * 0.15}) 
                  translateZ(${absOffset * -150}px)
                  translateX(${offset * 140}px)
                `,
                zIndex: projects.length - absOffset,
                opacity: absOffset > 2 ? 0 : 1,
                backgroundImage: `url(${project.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                borderRadius: '20px',
                border: isActive ? '1px solid rgba(255,255,255,0.4)' : '1px solid rgba(255,255,255,0.1)',
                WebkitBoxReflect: 'below 15px linear-gradient(transparent, transparent, rgba(0,0,0,0.3))',
                overflow: 'hidden'
              }}
              onClick={() => handleCardClick(index, project.link)}
            >
              {/* INDICADOR DE LINK */}
              <Box sx={{
                position: 'absolute',
                top: 15, right: 15,
                bgcolor: 'rgba(0,0,0,0.5)',
                backdropFilter: 'blur(4px)',
                borderRadius: '50%',
                p: 1,
                display: 'flex',
                opacity: isActive ? 1 : 0.5,
                border: '1px solid rgba(255,255,255,0.2)',
              }}>
                {hasLink ? <Launch sx={{ color: 'white', fontSize: 18 }} /> : <Block sx={{ color: 'rgba(255,255,255,0.4)', fontSize: 18 }} />}
              </Box>

              {isActive && (
                <Box sx={{
                  position: 'absolute',
                  bottom: 0, width: '100%', p: 3,
                  background: 'linear-gradient(to top, rgba(0,0,0,0.9), transparent)',
                  textAlign: 'center'
                }}>
                  <Typography variant="h5" color="white" fontWeight="bold">{project.title}</Typography>
                  {hasLink && (
                    <Typography variant="caption" sx={{ color: 'primary.light', display: 'block', mt: 1 }}>
                      HAZ CLIC PARA EXPLORAR
                    </Typography>
                  )}
                </Box>
              )}
            </Paper>
          );
        })}
      </Box>

      {/* CONTROLES */}
      <Box sx={{ position: 'relative', zIndex: 1, mt: 12, display: 'flex', gap: 3 }}>
        <IconButton onClick={handlePrev} sx={{ color: 'white', border: '1px solid rgba(255,255,255,0.3)' }}>
          <ArrowBackIosNew fontSize="small" />
        </IconButton>
        <IconButton onClick={handleNext} sx={{ color: 'white', border: '1px solid rgba(255,255,255,0.3)' }}>
          <ArrowForwardIos fontSize="small" />
        </IconButton>
      </Box>
    </Box>
  );
};

export default ProjectCarousel;