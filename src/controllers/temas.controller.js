import passport from "passport";
import { encryptPassword } from "../lib/helpers.js";
import { pool } from "../database.js";

export const renderAddTema = (req, res) => res.render("temas/add");

export const addTema = async (req, res) => {
  const { nombre,  descripcion } = req.body;
  await pool.query("INSERT INTO temas set ?", [
    {
      nombre,
      descripcion,
      docente_id: req.user.id,
    },
  ]);
  await req.setFlash("success", "Tema creado con exito");
    res.redirect("/temas");
};

export const renderTema = async (req, res) => {
  const [rows] = await pool.query("SELECT * FROM temas WHERE docente_id = ?", [
    req.user.id,
  ]);
  res.render("temas/list", { temas: rows });
};

export const deleteTema = async (req, res) => {
  const { id } = req.params;
  await pool.query("DELETE FROM temas WHERE ID = ?", [id]);
  await req.setFlash("success", `Tema - ${id} - Eliminado Con Exito`);
  return res.redirect("/temas");
};

export const renderEditTema = async (req, res) => {
  const { id } = req.params;
  const [rows] = await pool.query("SELECT * FROM temas WHERE id = ?", [id]);
  res.render("temas/edit", { tema: rows[0] });
};

export const editTema = async (req, res) => {
  const { id } = req.params;
  const { nombre, descripcion, } = req.body;
  const newTema = {
    nombre,
    descripcion,
    
  };
  await pool.query("UPDATE temas set ? WHERE id = ?", [newTema, id]);
  await req.setFlash("success", "Tema Actualizdo con exito");
  res.redirect("/temas");
};

// rutas para mostrar todos los usuarios con el rol de estudiante
export const renderEstudiantes = async (req, res) => {
  const [rows] = await pool.query("SELECT * FROM usuarios WHERE role = 'estudiante'");
  // console.log(rows);
  res.render("temas/cuentasestudiante", { estudiantes: rows });
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
  res.redirect("/temas/cuentasestudiante");
}

// renderEst
export const renderEst = async (req, res) => {
  res.render("temas/addEstudents");
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
  return res.redirect("/temas/cuentasestudiante");
}
