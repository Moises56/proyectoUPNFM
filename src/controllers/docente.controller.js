import { pool } from "../database.js";

export const Examenes = async(req, res) => {
  // crear examen y guardar en la base de datos con los campos de la tabla tests 
  console.log("estudiantes: " + req.session.usuario)
    if (req.session.usuario && req.session.usuario.role === 'docente') {
  pool.query('SELECT * FROM tests', function(error, results) {
    if (error) throw error;
    console.log("estudiantes: " + results)
    res.render('/academia/examenes', { tests: results });
  });
  } else {
  res.redirect('/');
  
  };
};


export const CuentasEstudiantes = async(req, res) => {
  res.render('/academia/cuentasestudiante');
};


// resgistrar estudiante en la base de datos
export const RegistrarEstudiante = async(req, res) => {
  const { nombre, apellido, correo, password } = req.body;
  const newLink = {
    nombre,
    apellido,
    correo,
    password,
  };
  await pool.query("INSERT INTO usuarios set ?", [newLink]);
  await req.setFlash("success", "Estudiante Registrado");
  res.redirect("/cuentasestudiante");
}
