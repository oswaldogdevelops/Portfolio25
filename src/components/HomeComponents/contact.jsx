import React, { useRef, useState } from 'react'; // Añadimos useRef y useState
import { Box, Typography, Container, Grid, TextField, Button, Link, Paper, Stack, CircularProgress } from '@mui/material';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import EmailIcon from '@mui/icons-material/Email';
import emailjs from '@emailjs/browser'; // Importamos la librería

const Contact = () => {
  const form = useRef(); // Referencia para el formulario
  const [loading, setLoading] = useState(false); // Estado para el botón de carga

  const sendEmail = (e) => {
  e.preventDefault();
  setLoading(true);

  // 1. REEMPLAZA ESTOS VALORES
  const SERVICE_ID = "service_36qzeh8"; 
  const TEMPLATE_ID = "template_knqv2fo";
  const PUBLIC_KEY = "wJ_ZJjqqbbYKuei7A"; // ← Asegúrate de que no tenga espacios extras

  // Usamos el método directo pasando la clave como cuarto parámetro
  emailjs.sendForm(
    SERVICE_ID, 
    TEMPLATE_ID, 
    form.current, 
    PUBLIC_KEY // ← Aquí va la clave
  )
  .then((result) => {
      alert("¡Mensaje enviado con éxito! ✨");
      form.current.reset();
  }, (error) => {
      // Si sigue fallando, este log te dirá exactamente qué dice el servidor
      console.error("Error detallado:", error);
      alert(`Error: ${error.text || 'La Public Key es inválida'}`);
  })
  .finally(() => {
      setLoading(false);
  });
};

  const phoneNumber = "584142870918";
  const message = "Hola, me gustaría recibir más información.";
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
  const tiktokurl = `https://www.tiktok.com/@tuwebpagecatchy?is_from_webapp=1&sender_device=pc`;

  const socialLinks = [
    { icon: <WhatsAppIcon />, label: "WhatsApp", href: whatsappUrl, target: "_blank", color: "linear-gradient(to bottom right, #33ea3cff, #a855f7)" },
{ 
  icon: <i className="fa-brands fa-tiktok" style={{ fontSize: '20px' }}></i>, 
  label: "TikTok", 
  href: tiktokurl, 
  target: "_blank",
  // Colores oficiales de TikTok: Negro, Cyan y Rosa
  color: "linear-gradient(45deg, #000000 30%, #ff0050 70%, #00f2ea 90%)" 
},
    { icon: <EmailIcon />, label: "Email", href: "mailto:hello@example.com", color: "linear-gradient(to bottom right, #db2777, #f472b6)" }
  ];

  // Variables de fondo (tus estilos originales)
  const s = '48px';
  const b = `calc(${s} / 2.67)`;
  const _s = `calc(1.5 * ${s} + ${b})`;
  const _r = `calc(1.28 * ${s} + ${b} / 2) at left 50%`;
  const c1 = '#571e4f'; const c2 = '#57ea88'; const c3 = '#ac2de6';
  const _f = `calc(100% - ${b}), ${c1} calc(101% - ${b}) 100%, #0000 101%`;
  const g0 = `calc(-.8 * ${s}), ${c2} ${_f}`;
  const g1 = `calc(-.8 * ${s}), ${c3} ${_f}`;

  return (
    <Box 
      component="section" id="contact" 
      sx={{ 
        py: 12, px: { xs: 2, md: 4 }, position: 'relative', overflow: 'hidden',
        background: `radial-gradient(${_r} bottom ${g0}) calc(2 * ${s}) calc(-1 * ${_s}), radial-gradient(${_r} bottom ${g1}) calc(-1 * ${s}) calc(${_s} / -2), radial-gradient(${_r} top ${g1}) 0 ${_s}, radial-gradient(${_r} top ${g0}) ${s} calc(${_s} / 2), linear-gradient(${c2} 50%, ${c3} 0)`,
        backgroundSize: `calc(4 * ${s}) ${_s}`,
      }}
    >
      <Container maxWidth="xl"> 
        <Box sx={{ textAlign: 'center', mb: 10 }}>
          <Typography variant="h2" sx={{ fontWeight: 900, fontFamily: "'Playfair Display', serif", color: 'white', mb: 2, fontSize: { xs: '2.5rem', md: '4rem' } }}>
            Conectemos!
          </Typography>
          <Box sx={{ width: 100, height: 5, bgcolor: 'white', mx: 'auto', borderRadius: 2 }} />
        </Box>

        <Grid container spacing={6} alignItems="stretch" justifyContent="center">
          <Grid item xs={12} md={6} lg={5.5}>
            {/* AGREGAMOS EL COMPONENTE FORM Y LA REF */}
            <Paper 
              component="form"
              ref={form}
              onSubmit={sendEmail}
              elevation={0} 
              sx={{ p: { xs: 4, md: 7 }, borderRadius: 6, bgcolor: 'rgba(255, 255, 255, 0.9)', backdropFilter: 'blur(10px)', height: '100%' }}
            >
              <Typography variant="h5" sx={{ fontWeight: 800, mb: 5, color: '#1a1a1a' }}>Escríbeme</Typography>
              <Stack spacing={4}>
                {/* IMPORTANTE: El atributo 'name' debe coincidir con el de tu template de EmailJS */}
                <TextField name="user_name" fullWidth label="Full Name" required variant="outlined" sx={{ '& .MuiOutlinedInput-root': { borderRadius: 4, height: 60 } }} />
                <TextField name="user_email" type="email" fullWidth label="Email Address" required variant="outlined" sx={{ '& .MuiOutlinedInput-root': { borderRadius: 4, height: 60 } }} />
                <TextField name="message" fullWidth label="Message" multiline rows={4} required variant="outlined" sx={{ '& .MuiOutlinedInput-root': { borderRadius: 4 } }} />
                
                <Button 
                  type="submit" 
                  disabled={loading}
                  variant="contained" 
                  size="large" 
                  sx={{ py: 2, borderRadius: 4, fontWeight: 800, background: 'linear-gradient(to right, #1a1a1a, #444)', '&:hover': { background: '#000' } }}
                >
                  {loading ? <CircularProgress size={24} color="inherit" /> : "Enviame un mensaje"}
                </Button>
              </Stack>
            </Paper>
          </Grid>

          {/* Columna de Redes Sociales (sin cambios) */}
          <Grid item xs={12} md={6} lg={5.5}>
            <Stack spacing={4} sx={{ height: '100%' }}>
              <Paper elevation={0} sx={{ p: { xs: 4, md: 7 }, borderRadius: 6, bgcolor: 'rgba(255, 255, 255, 0.15)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255, 255, 255, 0.2)', flexGrow: 1 }}>
                <Typography variant="h5" sx={{ fontWeight: 800, mb: 4, color: 'white' }}>Redes Sociales</Typography>
                <Stack spacing={2}>
                  {socialLinks.map((link) => (
                    <Link key={link.label} href={link.href} target={link.target} rel="noopener" underline="none" sx={{ display: 'flex', alignItems: 'center', gap: 3, p: 2.5, borderRadius: 4, bgcolor: 'rgba(255, 255, 255, 0.1)', border: '1px solid rgba(255, 255, 255, 0.1)', transition: '0.3s', '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.2)', transform: 'translateX(10px)', borderColor: 'white' } }}>
                      <Box sx={{ width: 50, height: 50, background: link.color, borderRadius: 2, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
                        {React.cloneElement(link.icon, { sx: { fontSize: 24 } })}
                      </Box>
                      <Box>
                        <Typography variant="subtitle1" sx={{ fontWeight: 800, color: 'white' }}>{link.label}</Typography>
                        <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>Connect now</Typography>
                      </Box>
                    </Link>
                  ))}
                </Stack>
              </Paper>
              <Paper elevation={0} sx={{ p: 4, borderRadius: 6, background: 'rgba(255, 255, 255, 0.95)', textAlign: 'center' }}>
                <Typography variant="h6" sx={{ fontWeight: 900 }}>Available for New Projects ✨</Typography>
              </Paper>
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Contact;