import { Router } from "express";
import auth from "./auth.routes.js";
import index from "./index.routes.js";
import temas from "./temas.routes.js";
import user from "./user.routes.js";
import estudents from "./estudiantes.routes.js";
import test from "./test.routes.js";


const app = Router();

app.use(index);
app.use(auth);
app.use(user);
app.use("/temas", temas);
app.use("/academia", estudents);
app.use("/test", test);

export default app;
