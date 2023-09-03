import { Router } from "express";
import { isLoggedIn, isDocente } from "../middlewares/protectedRoutes.js";

import {

   //estudiantes
   renderEstudiantes,
   saveEstudiante,
   renderEst,
   eliminarEstudiante,
   renderEditEstudiante,
   editEstudiante,

} from "../controllers/estudiantes.controller.js";
import { validator } from "../middlewares/validator.middleware.js";
import { signinSchema, signupSchema } from "../schemas/auth.schema.js";

const router = Router();

router.get('/cuentasestudiantes', isLoggedIn, isDocente, renderEstudiantes);

// rutas para guardar un usuario con el rol de estudiante
router.get('/addEstudents', isLoggedIn, isDocente, renderEst);
router.post('/addEstudents', isLoggedIn, isDocente, saveEstudiante);
router.get('/delete/:id', isLoggedIn, isDocente, eliminarEstudiante);
//editar un estudiante
router.get('/edit/:id', isLoggedIn, isDocente, renderEditEstudiante);
router.post('/edit/:id', isLoggedIn, isDocente, editEstudiante);



export default router;
