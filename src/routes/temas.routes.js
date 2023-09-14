import { Router } from "express";
import { isLoggedIn, isDocente } from "../middlewares/protectedRoutes.js";
import { validator } from "../middlewares/validator.middleware.js";
import {
  renderAddTema,
  addTema,
  renderTema,
  deleteTema,
  editTema,
  renderEditTema,

} from "../controllers/temas.controller.js";
import { createTemaSchema } from "../schemas/task.schema.js";

const router = Router();

router.get("/", isLoggedIn, renderTema);
router.get("/add", isLoggedIn, isDocente, renderAddTema);
// router.post("/add", isLoggedIn, validator(createTemaSchema), addTema);
router.post("/add", isLoggedIn, isDocente, addTema);
router.get("/delete/:id", isLoggedIn, isDocente, deleteTema);
router.get("/edit/:id", isLoggedIn, isDocente, renderEditTema);
router.post("/edit/:id", isLoggedIn, isDocente, editTema);




export default router;
