export const procesarFiltros = (query) => {
    let filtros = query; //objeto pasado por la ruta
  
    let consulta = "SELECT * FROM productos";
    let whereClause = "";
    let values = [];
  
    if (filtros.nombre) {
      whereClause += ` nombreZapas LIKE '%${filtros.nombre}%' AND`;
    }
    if (filtros.descripcion) {
      whereClause += ` descripcion LIKE '%${filtros.descripcion}%' AND`;
    }
    if (filtros.precioMin) {
      whereClause += ` precio <= ? AND`;
      values.push(filtros.precioMin);
    }
    if (filtros.precioMax) {
      whereClause += ` precio <= ? AND`;
      values.push(filtros.precioMax);
    }
    if (whereClause !== "") {
      consulta += " WHERE ";
      consulta += whereClause.slice(0,-3);
    }
    if (filtros.orden) {
      consulta += ` ORDER BY precio ${filtros.orden}`;
    }
   console.log(consulta);
  
    return { consulta, values };
  };
  