import React from 'react';
import { Box, Typography, Container, Paper } from '@mui/material';
import Masonry from '@mui/lab/Masonry';

const faqs = [
  {
    question: "¿Cuánto tiempo toma diseñar y lanzar un sitio web completo?",
    answer: "El tiempo de entrega varía según la complejidad del proyecto. Un sitio web informativo suele estar listo en 2 a 3 semanas, mientras que un sitio de comercio electrónico puede tomar entre 6 y 8 semanas, dependiendo de la rapidez con la que se proporcione el contenido y se aprueben los diseños."
  },
  {
    question: "¿El costo del proyecto incluye el hosting y el dominio?",
    answer: "No los servicios de hosting y dominio son servicios externos al desarrollo de la aplicación o sitio web Es fundamental que estos servicios estén a tu nombre. Esto te garantiza el control total y la propiedad de tu sitio web a largo plazo"
  },
    {
    question: "¿Como puedo saber cual es el hosting y dominio apropiado para mi proyecto?",
    answer: "Si no sabes cuál contratar, no te preocupes. Te asesoraré para elegir el proveedor que mejor se adapte a las necesidades técnicas y al presupuesto de tu proyecto, Una vez que hayas contratado el hosting y el dominio, yo me encargo de toda la configuración técnica y el despliegue (subida) del sitio. No tendrás que tocar ni una sola línea de código para que tu web esté al aire."
  },
  {
    question: "¿Qué necesito entregar para comenzar con el proyecto?",
    answer: "Para iniciar con el pie derecho, lo ideal es contar con el logo de tu marca, una paleta de colores o guía de estilo (si la tienes), los textos finales para cada sección y las imágenes o fotografías que desees incluir y almenos 2 paginas web de referencia. Si no tienes estos elementos, puedo asesorarte o integrarlos como servicios adicionales"
  },
  {
    question: "¿El sitio web será fácil de usar en dispositivos móviles?",
    answer: "Aplico un enfoque de diseño. Esto garantiza que tu página web se adapte automáticamente y luzca perfecta en cualquier tamaño de pantalla, ya sea un smartphone, una tablet o una computadora de escritorio, asegurando la mejor experiencia para tus usuarios."
  },
  {
    question: "¿Cual es el precio de una pagina web?",
    answer: "El precio varia de la complejidad y requerimientos del proyecto, por eso nos ajustamos a cada presupuesto"
  }
];

const s = '48px';
  const b = `calc(${s} / 2.67)`;
  const _s = `calc(1.5 * ${s} + ${b})`;
  const _r = `calc(1.28 * ${s} + ${b} / 2) at left 50%`;
  const c1 = '#571e4f'; const c2 = '#57ea88'; const c3 = '#ac2de6';
  const _f = `calc(100% - ${b}), ${c1} calc(101% - ${b}) 100%, #0000 101%`;
  const g0 = `calc(-.8 * ${s}), ${c2} ${_f}`;
  const g1 = `calc(-.8 * ${s}), ${c3} ${_f}`;

const FAQ = () => {
  return (
    <Box component="section" sx={{ 
         py: 12, px: { xs: 2, md: 4 }, position: 'relative', overflow: 'hidden',
        background: `radial-gradient(${_r} bottom ${g0}) calc(2 * ${s}) calc(-1 * ${_s}), radial-gradient(${_r} bottom ${g1}) calc(-1 * ${s}) calc(${_s} / -2), radial-gradient(${_r} top ${g1}) 0 ${_s}, radial-gradient(${_r} top ${g0}) ${s} calc(${_s} / 2), linear-gradient(${c2} 50%, ${c3} 0)`,
        backgroundSize: `calc(4 * ${s}) ${_s}`,
     }}>
      <Container maxWidth="lg">
        {/* Título Estilo Imagen */}
        <Typography 
          variant="h3" 
          textAlign="center" 
          sx={{ fontWeight: 800, mb: 8, color: '#000' }}
        >
         Preguntas Frecuentes FAQ
        </Typography>

        <Masonry 
          columns={{ xs: 1, sm: 2 }} 
          spacing={3}
          sx={{ alignContent: 'center' }}
        >
          {faqs.map((faq, index) => (
            <Paper
              key={index}
              elevation={0}
              sx={{
                p: 4,
           borderRadius: 6, bgcolor: 'rgba(255, 255, 255, 0.15)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255, 255, 255, 0.2)',
                transition: 'all 0.3s ease',
                '&:hover': {
                  bgcolor: '#ffffff',
                  boxShadow: '0 10px 40px rgba(0,0,0,0.06)',
                  transform: 'translateY(-5px)'
                }
              }}
            >
              <Typography 
                variant="h6" 
                sx={{ 
                  fontWeight: 700, 
                  mb: 2, 
                  color: '#000',
                  fontSize: '1.15rem',
                  fontFamily: "Belleza",
                  lineHeight: 1.3
                }}
              >
                {faq.question}
              </Typography>
              
              <Typography 
                variant="body1" 
                sx={{ 
                  color: '#111010ff', 
                  lineHeight: 1.6,
                  fontSize: '0.95rem',
                  fontFamily: "Outfit",
                }}
              >
                {faq.answer}
              </Typography>
            </Paper>
          ))}
        </Masonry>
      </Container>
    </Box>
  );
};

export default FAQ;