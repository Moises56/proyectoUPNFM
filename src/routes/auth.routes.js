import { Router } from "express";
import { isLoggedIn } from "../middlewares/protectedRoutes.js";

import {
  renderSignUp,
  signUp,
  renderSignIn,
  signIn,
  logout,

   //estudiantes
   renderEstudiantes,
   saveEstudiante,
   renderEst,
   eliminarEstudiante,

} from "../controllers/auth.controller.js";
import { validator } from "../middlewares/validator.middleware.js";
import { signinSchema, signupSchema } from "../schemas/auth.schema.js";

const router = Router();

// SIGNUP
router.get("/signup", renderSignUp);
router.post("/signup", validator(signupSchema), signUp);

// SINGIN
router.get("/signin", renderSignIn);
router.post("/signin", validator(signinSchema), signIn);

router.get("/logout", logout);



router.get('/cuentasestudiantes', renderEstudiantes);

// rutas para guardar un usuario con el rol de estudiante
router.get('/addEstudents', renderEst);
router.post('/addEstudents', saveEstudiante);
// rutas para mostrar un usuario con el rol de estudiante
// router.get('/estudiantes/:id', isLoggedIn, renderEstudiante);
router.get('/delete/:id', isLoggedIn, eliminarEstudiante);
// router.get('/estudiantes/edit/:id', isLoggedIn, renderEditEstudiante);
// router.post('/estudiantes/edit/:id', isLoggedIn, editEstudiante);




export default router;
