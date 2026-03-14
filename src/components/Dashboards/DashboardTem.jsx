import React from 'react';
import { Container, Grid, Card, IconButton, CardContent, Typography, Button, Box, createTheme, ThemeProvider, CssBaseline } from '@mui/material';
import { Line } from 'react-chartjs-2';
import { Link as RouterLink } from 'react-router';
import { Navigate } from 'react-router';
import { useSelector } from 'react-redux';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import GroupIcon from '@mui/icons-material/Group';
import SettingsIcon from '@mui/icons-material/Settings';
import NotificationsIcon from '@mui/icons-material/Notifications';

// Register chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

// Define dark theme with gradient background
const darkTheme = createTheme({
    palette: {
        mode: 'dark', // Dark mode theme
        primary: {
            main: '#00e676', // Green color for primary actions
        },
        secondary: {
            main: '#ff4081', // Pink color for secondary actions
        },
        background: {
            default: 'transparent', // Set to transparent so the gradient can be applied directly
            paper: '#1e1e1e',   // Slightly lighter background for cards
        },
        text: {
            primary: '#ffffff', // White text for easy reading
            secondary: '#bbbbbb', // Lighter secondary text
        },
    },
    typography: {
        fontFamily: 'Roboto, sans-serif',
    },
    components: {
        MuiCssBaseline: {
            styleOverrides: {
                body: {
                    background: 'linear-gradient(135deg, #0a1418ff, #2c5f2cff, #37642cff)', // Gradient from black to green
                    color: '#ffffff', // White text color for the entire body
                    margin: 0,
                    fontFamily: 'Roboto, sans-serif',
                    minHeight: '100vh', // Ensure the body fills the entire viewport height
                },
            },
        },
    },
});

const DashboardSec = () => {
    // Example data for the line charts
    const data = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
        datasets: [
            {
                label: 'Growth',
                data: [65, 59, 80, 81, 56, 55, 40],
                fill: false,
                borderColor: 'rgba(75, 192, 192, 1)',
                tension: 0.1,
            },
        ],
    };

    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    const full_name = useSelector(state => state.auth.user?.full_name);
    const current_balance = useSelector(state => state.auth.profile?.current_balance);

    if (!isAuthenticated) {
        // Si no está autenticado, redirige al login
        return <Navigate to="/login" replace />;
    }


    return (
        <ThemeProvider theme={darkTheme}>
            <CssBaseline /> {/* This ensures global styles are applied */}
            <Container maxWidth="lg" style={{ paddingTop: '20px' }}>
                <Grid container spacing={3}>
                    {/* Dashboard Header */}
                    <Grid item xs={12} sm={6} md={4}>
                        <Card>
                            <CardContent>
                                <Typography variant="h6" color="textPrimary">Bienvenido!</Typography>
                                <Typography variant="h5" color="primary">{full_name}</Typography>

                            </CardContent>
                        </Card>
                    </Grid>

                    <Grid item xs={12} sm={6} md={4}>
                        <Card>
                            <CardContent>
                                <Typography variant="h6" color="textPrimary">Balance Actual</Typography>
                                <Typography variant="h5" color="primary">${current_balance}</Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <Card>
                            <CardContent>
                                <Typography variant="h6" color="textPrimary">Ingresos Total Por Nivel</Typography>
                                <Typography variant="h5" color="primary">$0.00</Typography>
                            </CardContent>
                        </Card>
                    </Grid>

                    <Grid item xs={12} sm={6} md={4}  component={RouterLink}
                            to="/teampanel">
                        <Card >
                            <CardContent>
                                <Typography variant="h6" gutterBottom >
                                    Equipo
                                </Typography>
                                <Box display="flex" justifyContent="center">
                                    <IconButton color="primary" size="medium" aria-label="equipo">
                                        <GroupIcon fontSize="large" />
                                    </IconButton>
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>



                    {/* Action Buttons */}
                    <Grid item xs={12} sm={6} md={4}>
                        <Box display="flex" justifyContent="space-between">
                            <Button variant="contained" color="primary"component={RouterLink}
                                to="/deposit" >Depositar</Button>
                            <Button variant="contained" color="secondary" component={RouterLink}
                                to="/withdrawal">Retirar</Button>
                            <Button variant="outlined" color="info" component={RouterLink}
                                to="/detail">Detalles</Button>
                        </Box>
                    </Grid>

                    {/* Real-time Quotes */}
                    <Grid item xs={12}>
                        <Card>
                            <CardContent>
                                <Typography variant="h6" color="textPrimary">Cotizacion Real-time</Typography>
                                <Box display="flex" justifyContent="space-between" flexWrap="wrap">
                                    {['BTC', 'ETH', 'BNB', 'XRP'].map((coin, index) => (
                                        <Box key={index} p={2} style={{ width: '20%' }}>
                                            <Typography variant="subtitle1" color="textPrimary">{coin}</Typography>
                                            <Typography variant="body1" color="textSecondary">{`$${(Math.random() * 100000).toFixed(2)}`}</Typography>
                                        </Box>
                                    ))}
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>

                    {/* Line chart */}
                    <Grid item xs={12}>
                        <Card>
                            <CardContent>
                                <Typography variant="h6" color="textPrimary">Growth over Time</Typography>
                                <Line data={data} />
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Container>

            <Container maxWidth="lg" style={{ paddingTop: '20px' }}>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6} md={4}>
                        <Card>
                            <CardContent>
                                <Typography variant="h6" component="div" gutterBottom>
                                    Configuracion
                                </Typography>
                                <Box display="flex" justifyContent="center" component={RouterLink}
                            to="/config">
                                    <IconButton color="primary" size="medium" aria-label="Configuracion">
                                        <SettingsIcon fontSize="large" />
                                    </IconButton>
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>

                    <Grid item xs={12} sm={6} md={4}>
                        <Card>
                            <CardContent>
                                <Typography variant="h6" component="div" gutterBottom>
                                    Notificaciones
                                </Typography>
                                <Box display="flex" justifyContent="center" component={RouterLink}
                            to="/notify">
                                    <IconButton color="primary" size="medium" aria-label="notificaciones">
                                        <NotificationsIcon fontSize="large" />
                                    </IconButton>
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Container>
        </ThemeProvider>

    );
};

export default DashboardSec;
