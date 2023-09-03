import passport from "passport";
import { encryptPassword } from "../lib/helpers.js";
import { pool } from "../database.js";

//listar todos los temas de un docente y renderizar el formulario para crear un nuevo test
export const renderAddTest = async (req, res) => {
  const [rows] = await pool.query("SELECT * FROM temas WHERE docente_id = ?", [
    req.user.id,
  ]);
  //mostrar por consola los temas
  console.log(rows);

  res.render("test/addTest", { temas: rows });
};


// Ruta para crear un nuevo test
export const addTest = async (req, res) => {
    const { nombre,  tema_id } = req.body;
    await pool.query("INSERT INTO tests set ?", [
      {
        nombre,
        tema_id,
        docente_id: req.user.id,
      },
    ]);
    await req.setFlash("success", "Tema creado con exito");
      res.redirect("/temas");
  };
  
  // listar los test
    export const renderTest = async (req, res) => {
        const [rows] = await pool.query("SELECT * FROM tests WHERE docente_id = ?", [
        req.user.id,
        ]);
        res.render("test/listTest", { tests: rows });
    };

    //eliminar un test
    export const deleteTest = async (req, res) => {
      const { id } = req.params;
      await pool.query("DELETE FROM tests WHERE ID = ?", [id]);
      await req.setFlash("success", `Test - ${id} - Eliminado Con Exito`);
      res.redirect("/test/listTest");
    };

    // renderizar el formulario para editar un test
    export const renderEditTest = async (req, res) => {
      const { id } = req.params;
      const [rows] = await pool.query("SELECT * FROM tests WHERE id = ?", [id]);
      
      console.log(rows);
      //comparar el id del tema con tema_id del test
      const [temas] = await pool.query("SELECT * FROM temas WHERE id = ?", [
        rows[0].tema_id,
      ]);

      //mostrar por consola los temas
      console.log(temas);


      res.render("test/edit", { test: rows[0] , temas: temas[0] });
    };

    //editar un test
    export const editTest = async (req, res) => {
      const { id } = req.params;
      const { nombre, tema_id } = req.body;
      await pool.query("UPDATE tests set ? WHERE id = ?", [
        {
          nombre,
          tema_id,
        },
        id,
      ]);
      await req.setFlash("success", `Test - ${id} - Editado Con Exito`);
      res.redirect("/test/listTest");
    };


