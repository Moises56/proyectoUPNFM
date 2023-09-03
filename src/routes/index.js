import { Router } from "express";
import auth from "./auth.routes.js";
import index from "./index.routes.js";
import temas from "./temas.routes.js";
import user from "./user.routes.js";
import estudents from "./estudiantes.routes.js";
import test from "./test.routes.js";


const router = Router();

router.use(index);
router.use(auth);
router.use(user);
router.use("/temas", temas);
router.use("/academia", estudents);
router.use("/test", test);

export default router;
