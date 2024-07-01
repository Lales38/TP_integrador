import express from "express";
import "dotenv/config";
import rutasProductos from "./routes/rutas.productos.js";
import rutasUsuarios from "./routes/rutas.usuario.js";
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('__dirname:', __dirname);


const app = express();
const port = process.env.PORT || 3000;

//Middleware
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Rutas
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/showProductos.html');
});
app.use("/", rutasProductos);
app.use("/", rutasUsuarios);

app.listen(port, () => {
  console.log(`El servidor está corriendo en el puerto: ${port}, un lujo!!`);
});
