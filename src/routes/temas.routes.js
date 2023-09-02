import { Router } from "express";
import { isLoggedIn } from "../middlewares/protectedRoutes.js";
import { validator } from "../middlewares/validator.middleware.js";
import {
  renderAddTema,
  addTema,
  renderTema,
  deleteTema,
  editTema,
  renderEditTema,

  //estudiantes
  renderEstudiantes,
  saveEstudiante,
  renderEst,
  eliminarEstudiante,

} from "../controllers/temas.controller.js";
import { createTemaSchema } from "../schemas/task.schema.js";

const router = Router();

router.get("/", isLoggedIn, renderTema);
router.get("/add", isLoggedIn, renderAddTema);
// router.post("/add", isLoggedIn, validator(createTemaSchema), addTema);
router.post("/add", isLoggedIn, addTema);
router.get("/delete/:id", isLoggedIn, deleteTema);
router.get("/edit/:id", isLoggedIn, renderEditTema);
router.post("/edit/:id", isLoggedIn, editTema);

// rutas para mostrar todos los usuarios con el rol de estudiante
router.get('/cuentasestudiante', renderEstudiantes);

// rutas para guardar un usuario con el rol de estudiante
router.get('/addEstudents', renderEst);
router.post('/addEstudents', saveEstudiante);
// rutas para mostrar un usuario con el rol de estudiante
// router.get('/estudiantes/:id', isLoggedIn, renderEstudiante);
router.get('/eliminar/:id', eliminarEstudiante);
// router.get('/estudiantes/edit/:id', isLoggedIn, renderEditEstudiante);
// router.post('/estudiantes/edit/:id', isLoggedIn, editEstudiante);



export default router;
