import { Router } from "express";
import { isLoggedIn } from "../middlewares/protectedRoutes.js";
import { validator } from "../middlewares/validator.middleware.js";
import {
    Examenes,
    CuentasEstudiantes,
    RegistrarEstudiante,
} from "../controllers/docente.controller.js";
import { createTemaSchema } from "../schemas/task.schema.js";

const router = Router();

// rutas de docente
// router.get('/docentes/cuentasestudiantes',isLoggedIn, CuentasEstudiantes );
router.get('/Examenes', Examenes );
router.get('/cuentasestudiante', CuentasEstudiantes );
router.post('/cuentasestudiante', RegistrarEstudiante );


export default router;
