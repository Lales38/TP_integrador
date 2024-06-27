export const procesarFiltros = (query) => {
    let filtros = query; //objeto pasado por la ruta
  
    let consulta = "SELECT * FROM productos";
    let whereClause = "";
    let values = [];
  
    if (filtros.nombre) {
      whereClause += ` nombre LIKE '%${filtros.nombre}%'`;
    }
    if (filtros.descripcion) {
      whereClause += `AND descripcion LIKE '%${filtros.descripcion}%' `;
    }
    if (filtros.precioMin) {
      whereClause += `AND precio <= ? `;
      values.push(filtros.precioMin);
    }
    if (filtros.precioMax) {
      whereClause += `AND precio <= ? `;
      values.push(filtros.precioMax);
    }
    if (whereClause !== "") {
      consulta += " WHERE ";
      consulta += whereClause;
    }
    if (filtros.orden) {
      consulta += ` ORDER BY precio ${filtros.orden}`;
    }
   // console.log(consulta);
  
    return { consulta, values };
  };
  