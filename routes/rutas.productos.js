import express from 'express';
const router = express.Router();
import multer from 'multer';
import {
  obtenerProductosGET,
  crearProductoPOST,
  obtenerProductoIdGET,
  upDateProductoPOST,
  deleteProductoPOST,
} from "../controllers/control.productos.js";
// Middleware para cargar archivos
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
      console.log('file', file)
      cb(null, 'public/uploads')
  },
  fieldname: (req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`)
  }
})
const upload = multer({ storage: storage });
//reemplazo app por router
router.get("/api/productos", obtenerProductosGET);
//reemplazo app por router
router.post("/api/productos", upload.single("imagen"), crearProductoPOST);
router.get("/api/producto/:id", obtenerProductoIdGET);
router.post("/api/producto/update/:id", upDateProductoPOST);
router.post("/api/producto/borrar/:id", deleteProductoPOST);
export default router;
