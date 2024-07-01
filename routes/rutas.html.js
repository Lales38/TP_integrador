import express from "express";
const router = express.Router();


// Ruta para mostrar showProductos.html
router.get('/api/showProductos', (req, res) => {
  res.render('showProductos'); // Renderiza la vista showProductos.html
});

export default router;