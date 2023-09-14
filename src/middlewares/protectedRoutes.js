
export const isLoggedIn = (req, res, next) => {
  console.log('Role: ' + req.user.role);
  if (!req.isAuthenticated()) return res.redirect("/signin");
  return next();
};

export const isNotLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) return res.redirect("/temas");
  return next();
}

// protger rutas para que solo el docente pueda acceder a ellas y mostrar un mensaje de error si el usuario no es docente
export const isDocente = (req, res, next) => {
  if (req.user.role === 'docente') {
    return next();
  }
  req.flash("error", "No tienes permiso para acceder a esta ruta");
  return res.redirect("/temas");
};


