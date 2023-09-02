import passport from "passport";
import { encryptPassword } from "../lib/helpers.js";
import { pool } from "../database.js";

export const renderSignUp = (req, res) => res.render("auth/signup"); // renderizando la vista signup.hbs

export const signUp = async (req, res, next) => { // para registrar un usuario
  const { nombre, email, password1, role } = req.body; // obteniendo los datos del formulario

  const password = await encryptPassword(password1); // encriptando la contraseña

  // Saving in the Database
  const [result] = await pool.query("INSERT INTO usuarios SET ? ", { // guardando el usuario en la base de datos
    nombre,
    email,
    password,
    role,
  });

  req.login( // iniciando sesión
    {
      id: result.insertId,
      nombre,
      email,
    },
    (err) => {
      if (err) {
        return next(err);
      }
      return res.redirect("/temas"); // redireccionando a la página links
    }
  );
};

export const renderSignIn = (req, res) => { // renderizando la vista signin.hbs
  res.render("auth/signin"); 
};

export const signIn = passport.authenticate("local.signin", { // para iniciar sesión
  successRedirect: "/temas", 
  failureRedirect: "/signin",
  passReqToCallback: true,
  failureFlash: true,
});

export const logout = (req, res, next) => { // para cerrar sesión
  req.logout(function (err) {
    if (err) return next(err);
    res.redirect("/");
  });
};
