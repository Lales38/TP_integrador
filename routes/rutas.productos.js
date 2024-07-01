import express from "express";
const router = express.Router();
import multer from "multer";
import {
  obtenerProductosGET,
  crearProductoPOST,
  obtenerProductoIdGET,
  upDateProductoPOST,
  deleteProductoGET,
} from "../controllers/control.productos.js";

//Middleware para cargar archivos(multer)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/uploads");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage: storage });
//reemplazo app por router
router.get("/api/productos", obtenerProductosGET);
//reemplazo app por router
router.post("/api/productos", upload.single("imagen"), crearProductoPOST);

router.get("/api/producto/:id", obtenerProductoIdGET);

router.post("/api/producto/update/:id",upload.single("imagen"), upDateProductoPOST);

router.post("/api/producto/borrar/:id", deleteProductoGET);

router.get('/api/public/', (req, res) => {
  res.sendFile(__dirname + '/public/showProductos.html');
});

export default router;
