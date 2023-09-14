import express from "express";
import morgan from "morgan";
import path from "path";
import { create } from "express-handlebars";
import passport from "passport";
import cookieParser from "cookie-parser";
// import flash from "connect-flash";
import flash from "express-flash";
import session from "express-session";
import expressMySQLSession from "express-mysql-session";
import { promiseConnectFlash } from "async-connect-flash";

import { fileURLToPath } from "url"; // para usar __dirname en ES6

import routes from "./routes/index.js"; // importando las rutas
import "./lib/passport.js"; // importando la configuración de passport
import * as helpers from "./lib/handlebars.js"; // importando los helpers de handlebars
import { SECRET, database } from "./config.js"; // importando la configuración
import { pool } from "./database.js"; // importando la base de datos

const app = express(); // inicializando express
const __dirname = path.dirname(fileURLToPath(import.meta.url)); // para usar __dirname en ES6
const MySQLStore = expressMySQLSession(session); // para guardar la cookie en la base de datos

app.set("views", path.join(__dirname, "views")); // configurando la carpeta views
app.engine( // configurando handlebars
  ".hbs",
  create({
    defaultLayout: "main", // configurando el layout por defecto
    layoutsDir: path.join(app.get("views"), "layouts"), // configurando la carpeta layouts
    partialsDir: path.join(app.get("views"), "partials"), // configurando la carpeta partials
    extname: ".hbs", // configurando la extensión de los archivos
    helpers, // configurando los helpers
  }).engine 
);
app.set("view engine", ".hbs"); // configurando el motor de plantillas

app.use(morgan("dev")); // muestra por consola las peticiones que llegan al servidor
app.use(express.urlencoded({ extended: false })); // para entender los datos que llegan desde un formulario
app.use(express.json()); // para entender los datos que llegan desde un formulario
app.use(cookieParser("moumysqlnodemysql")); // para entender las cookies que llegan desde el navegador
console.log(database); // para entender las cookies que llegan desde el navegador
app.use( 
  session({
    secret: SECRET, // para firmar la cookie
    resave: false, // para evitar que se vuelva a firmar la cookie
    saveUninitialized: false,  
    store: new MySQLStore({}, pool), // para guardar la cookie en la base de datos
  })
);

app.use(flash()); // para usar los mensajes flash

app.use(promiseConnectFlash()); // para usar los mensajes flash
app.use(passport.initialize()); // para inicializar passport
app.use(passport.session()); // para usar persistent login sessions

app.use(express.static(path.join(__dirname, "public"))); // para usar archivos estáticos

app.use(async (req, res, next) => { // para usar variables globales en las vistas
  app.locals.success = await req.getFlash("success");
  app.locals.error = await req.getFlash("error");
  app.locals.user = req.user; // para usar el usuario en las vistas
  //mostrar el role del usuario en la consola
  // console.log(req.user);
  next();
});

// usando las rutas
app.use(routes); 

// 404 handler
app.use((req, res, next) => {
  const err = new Error("Not Found");
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res, next) => {
  console.log("Error", err);
  res.status(err.status || 500);
  res.render("error", {
    message: err.message,
    status: err.status,
  });
});

export default app;
