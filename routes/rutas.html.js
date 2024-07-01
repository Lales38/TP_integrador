import express from "express";
const router = express.Router();


// Ruta para mostrar showProductos.html
router.get('/showProductos', (req, res) => {
  res.render('showProductos.html'); // Renderiza la vista showProductos.html
});

export default router;