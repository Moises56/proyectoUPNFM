import passport from "passport";
import { encryptPassword } from "../lib/helpers.js";
import { pool } from "../database.js";


// rutas para mostrar todos los usuarios con el rol de estudiante
export const renderEstudiantes = async (req, res) => {
  const [rows] = await pool.query("SELECT * FROM usuarios WHERE role = 'estudiante'");
  // console.log(rows);
  res.render("academia/cuentasestudiantes", { estudiantes: rows });
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
  res.redirect("/academia/cuentasestudiantes");
}

// renderEst
export const renderEst = async (req, res) => {
  res.render("academia/addEstudents");
}



// deleteEstudiante
export const eliminarEstudiante = async (req, res) => {
  const { id } = req.params;
  await pool.query("DELETE FROM usuarios WHERE ID = ?", [id]);
  await req.setFlash("success", `Estudiante - ${id} - Eliminado Con Exito`);
  return res.redirect("/academia/cuentasestudiantes");
}

// renderEditEstudiante
export const renderEditEstudiante = async (req, res) => {
  const { id } = req.params;
  const [rows] = await pool.query("SELECT * FROM usuarios WHERE id = ?", [id]);
  res.render("academia/edit", { estudiante: rows[0] });
}

// editEstudiante
export const editEstudiante = async (req, res) => {
  const { id } = req.params;
  const { nombre, email, password1, role } = req.body;
  const password = await encryptPassword(password1);
  const newEstudiante = {
    nombre,
    email,
    password,
    role,
  };
  await pool.query("UPDATE usuarios set ? WHERE id = ?", [newEstudiante, id]);
  await req.setFlash("success", `Estudiante - ${id} - Actualizado Con Exito`);
  res.redirect("/academia/cuentasestudiantes");
}


