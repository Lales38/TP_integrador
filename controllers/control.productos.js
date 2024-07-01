import pool from "../config/db.js";
import { procesarFiltros } from "../helpers/filtrosProductos.js";

//get('/api/productos')
export const obtenerProductosGET = async (req, res) => {
  let { consulta, values } = procesarFiltros(req.query);

  try {
    const connection = await pool.getConnection();
    const [row] = await connection.query(consulta, values);
    connection.release();
    res.json(row);
  } catch (error) {
    console.error("Hubo un error al consultar la base de datos", error);
    res.status(500).send("Hubo un error al consultar la base de datos");
  }
};
/**
export const crearProductoPOST = async (req, res) => {
  const newProducto = req.body; // Toma la información del texto
  console.log("El contenido de req.body es:", req.body);
  console.log("El resultado del archivo es:", req.file);
  newProducto.imagen = req.file.filename; // Toma la información del archivo

 */

//post('/api/productos')
export const crearProductoPOST = async (req, res) => {
  //res.json({ body: req.body, file: req.file });

  const newProducto = req.body; //toma la info del texto
  console.log("el contenido de req.body es: ", req.body);
  console.log("el resultado del file es :", req.file);
  newProducto.imagen = req.file.filename; //toma la info archivo

  try {
    const connection = await pool.getConnection();
    const [result] = await connection.query("INSERT INTO productos SET ?", [
      newProducto,
    ]);
    console.log(" el resultado es :", result);
    connection.release();
    res.send("Productos insertados correctamente");
  } catch (error) {
    console.error("Hubo un error al consultar la base de datos, por cargar", error);
    res.status(500).send("Hubo un error al consultar la base de datos");
  }
};

//GET('/api/producto/:idproducto')
export const obtenerProductoIdGET = async (req, res) => {
  const id = req.params.id;
  const consulta = "SELECT * FROM productos WHERE idproductos = ?;";
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.query(consulta, id);
    connection.release();

    res.json(rows);
  } catch (error) {
    console.error(
      "Hubo un error al consultar la base de datos , soy yo!!!",
      error
    );
    res.status(500).send("Hubo un error al consultar la base de datos");
  }
};

//post('/api/producto/upDate/:id')
export const upDateProductoPOST = async (req, res) => {
  const id = req.params.id;
  const updateProducto = req.body;
  console.log("El id es: ", id);
  console.log("el req.body es : ", updateProducto);

  try {
    const connection = await pool.getConnection();

    // Consulta para seleccionar el producto por ID
    const consulta = "SELECT * FROM productos WHERE idproductos = ?;";
    const [result] = await connection.query(consulta, [id]);
    console.log("el resultado de la consulta es: ", result);
    if (result.length === 0) {
      res.status(404).json({ message: "Producto no encontrado" });
    } else {
      // Consulta para actualizar el producto
      const actualizar =
        "UPDATE productos SET nombreZapas = ?, descripcion = ?, precio = ?, stock = ?, imagen = ?, fk_categoria = ? WHERE idproductos = ?;";
      await connection.query(actualizar, [
        updateProducto.nombreZapas,
        updateProducto.descripcion,
        updateProducto.precio,
        updateProducto.stock,
        updateProducto.imagen,
        updateProducto.fk_categoria,
        id,
      ]);

      res.json({ message: "Producto actualizado correctamente" });
    }

    connection.release();
  } catch (err) {
    console.error("Error ejecutando la consulta: ", err);
    res.sendStatus(500);
  }
};

// Delete producto
//"/api/producto/borrar/:idproductos"
export const deleteProductoGET = async (req, res) => {
  const id = req.params.id;
  const consulta = "SELECT * FROM productos WHERE idproductos = ?;";
  console.log("el id es :", id);
  console.log("La consulta es :", consulta);
  try {
    const connection = await pool.getConnection();
    const [result] = await connection.query(consulta, id);
    connection.release();
    if (result.affectedRows === 0) {
      res.status(404).json({ message: "User not found" });
    } else {
      const eliminar = "DELETE FROM productos WHERE idproductos = ? ;";
      const connection = await pool.getConnection();
      const [result] = await connection.query(eliminar, id);
      connection.release();
      res.json({ message: "User deleted successfully" });
    }
  } catch (err) {
    console.error("Error executing query: ", err);
    res.sendStatus(500);
  }
};
