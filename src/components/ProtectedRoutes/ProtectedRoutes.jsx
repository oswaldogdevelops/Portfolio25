// Importa las dependencias necesarias de React y react-router-dom
import React, { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router';
// Importa useSelector y useDispatch de react-redux
import { useSelector, useDispatch } from 'react-redux';

// **IMPORTANTE**: Reemplaza esto con la importación real de tu cliente Supabase
// Por ejemplo: import { supabase } from '../supabaseClient';
// También, asegúrate de que tu cliente Supabase esté correctamente inicializado.
const supabase = {
    auth: {
        // Simula la función onAuthStateChanged de Supabase
        onAuthStateChanged: (callback) => {
            // En una aplicación real, esto se conectaría al cliente Supabase
            // y el callback se ejecutaría cuando el estado de autenticación cambie.
            // Para este ejemplo, simulamos un usuario después de un pequeño retraso.
            // En tu código real, usarías: supabase.auth.onAuthStateChanged(callback);
            const user = JSON.parse(localStorage.getItem('user')); // Simula un usuario guardado
            callback({ data: { user } }); // Pasa el usuario al callback

            // Devuelve una función de limpieza para desuscribirse (importante para evitar fugas de memoria)
            return {
                data: {
                    subscription: {
                        unsubscribe: () => console.log("Desuscrito de onAuthStateChanged (simulado)")
                    }
                }
            };
        },
        // Simula la obtención del usuario actual
        getUser: async () => {
            // En una aplicación real, usarías: supabase.auth.getUser();
            const user = JSON.parse(localStorage.getItem('user'));
            return { data: { user } };
        }
    }
};

// **IMPORTANTE**: Define tus acciones de Redux aquí o impórtalas desde tu archivo de acciones
// Ejemplo de acciones (ajusta según tu estructura real de Redux)
const authActions = {
    login: (userId) => ({ type: 'AUTH_LOGIN', payload: userId }),
    logout: () => ({ type: 'AUTH_LOGOUT' }),
    // Puedes añadir una acción para indicar que la autenticación ha sido verificada
    // Esto es útil si tu store de Redux tiene un estado 'isAuthChecked'
    authChecked: () => ({ type: 'AUTH_CHECKED' }),
};


// Componente de Ruta Protegida
const ProtectedRoute = ({ children, redirectTo = "/" }) => { // Cambiado el valor por defecto a "/"
    const dispatch = useDispatch();

    // Usa tu selector de Redux para obtener el estado de autenticación
    // Asegúrate de que 'state.auth.isAuthenticated' y 'state.auth.userId'
    // coincidan con la estructura de tu store de Redux.
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    const userId = useSelector(state => state.auth.userId); // Puedes usar userId para depuración o lógica adicional

    // Estado local para saber si la autenticación está cargando
    // Esto es crucial para evitar redirecciones prematuras antes de que Supabase inicialice
    const [loading, setLoading] = useState(true);

    // useEffect para manejar la suscripción al estado de autenticación de Supabase
    useEffect(() => {
        let authListener = null; // Variable para almacenar el listener de Supabase

        const checkAuthStatus = async () => {
            try {
                // Primero, intenta obtener el usuario actual directamente
                const { data: { user } } = await supabase.auth.getUser();
                if (user) {
                    dispatch(authActions.login(user.id)); // Despacha la acción de login con el ID del usuario
                } else {
                    dispatch(authActions.logout()); // Despacha la acción de logout
                }
            } catch (error) {
                console.error("Error al obtener el usuario de Supabase:", error);
                dispatch(authActions.logout()); // En caso de error, asume que no está autenticado
            } finally {
                setLoading(false); // La carga inicial ha terminado
                dispatch(authActions.authChecked()); // Opcional: despacha una acción para indicar que la autenticación ha sido verificada
            }

            // Luego, suscríbete a los cambios en el estado de autenticación
            // Esto es crucial para reaccionar a logins/logouts en tiempo real
            authListener = supabase.auth.onAuthStateChanged((event, session) => {
                if (session?.user) {
                    dispatch(authActions.login(session.user.id)); // Actualiza Redux
                } else {
                    dispatch(authActions.logout()); // Actualiza Redux
                }
                // No es necesario setLoading(false) aquí de nuevo, ya lo hicimos en el bloque try/finally inicial
            });
        };

        checkAuthStatus();

        // Función de limpieza para desuscribirse del listener cuando el componente se desmonte
        return () => {
            if (authListener && authListener.data && authListener.data.subscription) {
                authListener.data.subscription.unsubscribe();
            }
        };
    }, [dispatch]); // Asegúrate de incluir dispatch en las dependencias del useEffect

    // Si aún estamos cargando el estado de autenticación, muestra un indicador de carga
    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-gray-100">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500"></div>
                <p className="ml-4 text-lg text-gray-700">Cargando autenticación...</p>
            </div>
        );
    }

    // Si no está autenticado (según Redux), redirige a la página de inicio
    if (!isAuthenticated) {
        return <Navigate to={redirectTo} replace />;
    }

    // Si está autenticado, renderiza los componentes hijos
    return children ? children : <Outlet />;
};

export default ProtectedRoute;

// --- Cómo usarlo en tu aplicación React con react-router-dom ---
/*
// En tu archivo App.js (o donde definas tus rutas)
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux'; // ¡Importante para Redux!
import store from './store'; // Asegúrate de que esta ruta sea correcta a tu store de Redux

import Home from './pages/Home';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
// Asegúrate de importar tu cliente Supabase real
// import { supabase } from './supabaseClient'; // Si lo tienes en un archivo separado

function App() {
    return (
        <Provider store={store}> {/* Envuelve tu app con el Provider de Redux * /}
            <Router>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />

                    {/* Rutas protegidas * /}
                    <Route
                        path="/dashboard"
                        element={
                            <ProtectedRoute redirectTo="/" > {/* Redirige a / si no está autenticado * /}
                                <Dashboard />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/profile"
                        element={
                            <ProtectedRoute redirectTo="/" > {/* Redirige a / si no está autenticado * /}
                                <Profile />
                            </ProtectedRoute>
                        }
                    />
                    {/* También puedes usar rutas anidadas con Outlet * /}
                    {/*
                    <Route element={<ProtectedRoute redirectTo="/" />}>
                        <Route path="/settings" element={<Settings />} />
                        <Route path="/admin" element={<AdminPanel />} />
                    </Route>
                    * /}
                </Routes>
            </Router>
        </Provider>
    );
}

export default App;
*/

// --- Ejemplo de estructura básica para tu store de Redux ---
/*
// En tu archivo store.js
import { createStore, combineReducers } from 'redux';

// Reducer de autenticación
const initialAuthState = {
    isAuthenticated: false,
    userId: null,
    isAuthChecked: false, // Nuevo estado para indicar si la autenticación ya fue verificada
};

const authReducer = (state = initialAuthState, action) => {
    switch (action.type) {
        case 'AUTH_LOGIN':
            return {
                ...state,
                isAuthenticated: true,
                userId: action.payload,
                isAuthChecked: true,
            };
        case 'AUTH_LOGOUT':
            return {
                ...state,
                isAuthenticated: false,
                userId: null,
                isAuthChecked: true,
            };
        case 'AUTH_CHECKED':
            return {
                ...state,
                isAuthChecked: true,
            };
        default:
            return state;
    }
};

// Combina tus reducers (si tienes más)
const rootReducer = combineReducers({
    auth: authReducer,
    // ...otros reducers
});

const store = createStore(rootReducer);

export default store;
*/
