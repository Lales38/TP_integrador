import pool from "../config/db.js";


//post('/api/usuario')
export const crearUsuariosPOST = async (req, res) => {
    //res.json({ body: req.body, file: req.file });
  
    const newUsuario = req.body; //toma la info del texto
    newUsuario.imagen = req.file.filename; //toma la info archivo
  
    try {
      const connection = await pool.getConnection();
      const [result] = await connection.query(
        "INSERT INTO usuarios SET ?",
        newUsuario
      );
      connection.release();
      res.send("Usuario insertado satisfactoriamente");
    } catch (error) {
      console.error("Hubo un error al consultar la base de datos", error);
      res.status(500).send("Hubo un error al consultar la base de datos");
    }
  };