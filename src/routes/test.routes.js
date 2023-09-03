// ruta para renderizar el formulario del test que esta en la carpeta views/test/test.hbs

import { Router } from "express";
import { isLoggedIn, isDocente } from "../middlewares/protectedRoutes.js";
import { validator } from "../middlewares/validator.middleware.js";

import {
  renderAddTest,
  addTest,
  renderTest,
  deleteTest,
  renderEditTest,
  editTest,
} from "../controllers/test.controller.js";
import { createTemaSchema } from "../schemas/task.schema.js";

const router = Router();


router.get("/addTest",isLoggedIn, isDocente, renderAddTest);
router.post("/addTest",isLoggedIn, isDocente, addTest);

router.get("/listTest",isLoggedIn, isDocente, renderTest);
router.get("/delete/:id",isLoggedIn, isDocente, deleteTest);

//editar un test
router.get('/edit/:id', isLoggedIn, isDocente, renderEditTest);
router.post('/edit/:id', isLoggedIn, isDocente, editTest);



export default router;


