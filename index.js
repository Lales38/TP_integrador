import express from "express";
import "dotenv/config";
import rutasProductos from "./routes/rutas.productos.js";
import rutasUsuarios from "./routes/rutas.usuario.js";
import rutaHtml from "./routes/rutas.html.js"


const app = express();
const port = process.env.PORT || 3000;

//Middleware
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Rutas
app.use("/", rutasProductos);
app.use("/", rutasUsuarios);
app.get('/', (req, res) => {
  res.render('showProductos'); // Renderiza la vista showProductos.html
});
app.listen(port, () => {
  console.log(`El servidor está corriendo en el puerto: ${port}, un lujo!!`);
});
