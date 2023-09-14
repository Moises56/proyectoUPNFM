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


// rutas para mostrar todos los usuarios con el rol de estudiante
export const renderEstudiantes = async (req, res) => {
  const [rows] = await pool.query("SELECT * FROM usuarios WHERE role = 'estudiante'");
  // console.log(rows);
  res.render("auth/cuentasestudiantes", { estudiantes: rows });
};

// rutas para guardar un usuario con el rol de estudiante
export const saveEstudiante = async (req, res) => {
  const { nombre, email, password1, role } = req.body; // obteniendo los datos del formulario
  const password = await encryptPassword(password1); 
  const newEstudiante = {
    nombre,
    email,
    password,
    role,
  };
  // res.render("temas/cuentasestudiante", { estudiantes: rows });
  await pool.query("INSERT INTO usuarios set ?", [newEstudiante]);
  await req.setFlash("success", "Estudiante creado con exito");
  res.redirect("auth/cuentasestudiante");
}

// renderEst
export const renderEst = async (req, res) => {
  res.render("auth/addEstudents");
}

// deleteEstudiante
// export const deleteEstudiante = async (req, res) => {
//   const { id } = req.params;
//   await pool.query("DELETE FROM usuarios WHERE ID = ?", [id]);
//   await req.setFlash("success", `Estudiante - ${id} - Eliminado Con Exito`);
//   return res.redirect("/temas/cuentasestudiante");
// }


export const eliminarEstudiante = async (req, res) => {
  const { id } = req.params;

  try {
    // Ejecuta la consulta SQL para eliminar el estudiante
    const [result] = await pool.query("DELETE FROM usuarios WHERE ID = ?", [id]);

    if (result.affectedRows === 0) {
      // Si no se encontró ningún estudiante con ese ID
      req.flash("error", `Estudiante - ${id} - no encontrado`);
    } else {
      // Si se eliminó con éxito
      req.flash("success", `Estudiante - ${id} - Eliminado Con Éxito`);
    }
  } catch (error) {
    console.error('Error al eliminar el estudiante:', error);
    req.flash("error", "Error al eliminar el estudiante");
  }

  // Redirige a la página de cuentas de estudiantes
  return res.redirect("auth/cuentasestudiante");
}
