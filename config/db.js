import { createPool } from "mysql2/promise";

const pool = createPool({
  host: "localhost",
  user: "root",
  password: "root",
  database: "pt_integrador",
  connectionLimit: 5, //Ajustar la cantidad de conexiones simultaneas
  waitForConnections: true,
  queueLimit: 0,
});

pool.getConnection()
.then((connection) => {
  pool.releaseConnection(connection);
  console.log("Conectado con la BD!!!! Para el integrador, exitos");
})
    .catch(err => {
      console.error("No se pudo conectar con la BD: ", err)
    });

export default pool;
