// Registrar usuario
export const signUp = async (email, password) => {
  const { user, error } = await supabase.auth.signUp({ email, password });
  if (error) console.error(error.message);
  else console.log('Usuario registrado:', user);
};

// Iniciar sesión
export const signIn = async (email, password) => {
  const { user, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) console.error(error.message);
  else console.log('Sesión iniciada:', user);
};

// Cerrar sesión
export const signOut = async () => {
  await supabase.auth.signOut();
};
