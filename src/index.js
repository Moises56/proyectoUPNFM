import app from "./app.js"; // importando la aplicación
import { port } from './config.js' // importando el puerto

app.listen(port); // inicializando el servidor
console.log("Server is in port", port); // mostrando un mensaje en la consola
