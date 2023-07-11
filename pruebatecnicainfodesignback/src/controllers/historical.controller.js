const db = require("../database-MySQL");

module.exports = class historical {

  static getHistTramos(data, callback) {

    var consultaTramos = `SELECT c.Linea, SUM(c.Residencial + c.Comercial + c.Industrial) AS consumo, SUM(p.Residencial + p.Comercial + p.Industrial) AS perdidas, SUM(co.Residencial + co.Comercial + co.Industrial) AS costo FROM consumo_tramo c JOIN costos_tramo co ON c.Fecha = co.Fecha AND c.Linea = co.Linea JOIN perdidas_tramo p ON c.Fecha = p.Fecha AND c.Linea = p.Linea WHERE c.Fecha BETWEEN '${data.fechainicial}' AND '${data.fechafinal}' GROUP BY c.Linea ORDER BY c.Linea;`;

    db.query(consultaTramos, (err, resp) => {
      if (err) {
        callback(err);
      }
      callback(resp);
    });
  }

  static getHistCliente(data, callback) {

    var consultaCliente = `SELECT c.Linea, SUM(c.Residencial) AS consumo_residencial, SUM(c.Comercial) AS consumo_comercial, SUM(c.Industrial) AS consumo_industrial, SUM(p.Residencial) AS perdidas_residencial, SUM(p.Comercial) AS perdidas_comercial, SUM(p.Industrial) AS perdidas_industrial, SUM(co.Residencial) AS costo_residencial, SUM(co.Comercial) AS costo_comercial, SUM(co.Industrial) AS costo_industrial FROM consumo_tramo c JOIN costos_tramo co ON c.Fecha = co.Fecha AND c.Linea = co.Linea JOIN perdidas_tramo p ON c.Fecha = p.Fecha AND c.Linea = p.Linea WHERE c.Fecha BETWEEN '${data.fechainicial}' AND '${data.fechafinal}' GROUP BY c.Linea ORDER BY c.Linea`;

    db.query(consultaCliente, (err, resp) => {
      if (err) {
        callback(err);
      }
      callback(resp);
    });
  }

  static getTramosCliente(data, callback) {

    var consultaTramosCliente = `
      SELECT Linea,
       SUM(CASE WHEN TipoConsumo = 'Comercial' THEN Perdidas ELSE 0 END) AS Comercial,
       SUM(CASE WHEN TipoConsumo = 'Industrial' THEN Perdidas ELSE 0 END) AS Industrial,
       SUM(CASE WHEN TipoConsumo = 'Residencial' THEN Perdidas ELSE 0 END) AS Residencial
      FROM (
          SELECT Linea, 'Comercial' AS TipoConsumo, Comercial AS Perdidas
          FROM perdidas_tramo
          WHERE Fecha BETWEEN '${data.fechainicial}' AND '${data.fechafinal}'
          UNION ALL
          SELECT Linea, 'Industrial' AS TipoConsumo, Industrial AS Perdidas
          FROM perdidas_tramo
          WHERE Fecha BETWEEN '${data.fechainicial}' AND '${data.fechafinal}'
          UNION ALL
          SELECT Linea, 'Residencial' AS TipoConsumo, Residencial AS Perdidas
          FROM perdidas_tramo
          WHERE Fecha BETWEEN '${data.fechainicial}' AND '${data.fechafinal}'
      ) AS combined_data
      GROUP BY Linea
      ORDER BY Linea
    `;

    db.query(consultaTramosCliente, (err, resp) => {
      if (err) {
        callback(err);
      }
      callback(resp);
    });
  }

};