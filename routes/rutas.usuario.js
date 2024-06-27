import express from "express";
const routerUsu = express.Router();
import multer from "multer";
import { crearUsuariosPOST } from "../controllers/control.usuario.js";
 

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
//router.post("/api/productos", upload.single("imagen"), crearProductoPOST);
routerUsu.post("/api/usuarios", upload.single("imagen"), crearUsuariosPOST);

export default routerUsu;