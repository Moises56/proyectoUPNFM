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
  //mostrar por consola los temas
  // console.log(rows);

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



// renderAddTest
export const renderAddTest = async (req, res) => {
  res.render("temas/Examenes");
}
