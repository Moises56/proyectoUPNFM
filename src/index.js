import app from "./app.js"; // importando la aplicación
import { port } from './config.js' // importando el puerto

app.listen(port); // inicializando el servidor
console.log("Servidor en el puerto:", port); // mostrando un mensaje en la consola
