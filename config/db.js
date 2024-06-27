import { createPool } from "mysql2/promise";

const pool = createPool({
  host: process.env.MYSQL_ADDON_HOST,
  user: process.env.MYSQL_ADDON_USER,
    password: process.env.MYSQL_ADDON_PASSWORD,
  database: process.env.MYSQL_ADDON_DB,
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
