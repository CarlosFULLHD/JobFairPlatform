import { pool } from "../db.js";
//Datos de la empresa, cupos, url reu
export const getDatosCompletos = async (req, res) => {
  try {
    //creamos una const para guardar el parametro 
    const { id } = req.params;
    const [rows] = await pool.query(
      "SELECT a.nombre, b.url, c.nombrecharla, c.fechaInicio, c.fechaFina,c.Cupos_charla FROM instituciones a,Charla_tiene_links b,charlas c WHERE a.instituciones_id=? AND c.instituciones_instituciones_id=a.instituciones_id AND c.charlas_id=b.charlas_charlas_id ",
      [id]
    );

    if (rows.length <= 0) {
      return res.status(404).json({ message: "No existe el registro" });
    }
    res.json(rows[0]);
  } catch (error) {
    return res
      .status(500)
      .json({error, message: "Algo fue mal al obtener los datos de la empresa, cupos, url reu. GETDATOSCOMPLETOS ERROR" });
  }
};
export const getNombreDeEmpresa = async (req, res) => {
  try {
    //creamos una const para guardar el parametro 
    const { id } = req.params;
    const [rows] = await pool.query(
      "SELECT instituciones_id,nombre, resena FROM instituciones WHERE instituciones_id = ?",
      [id]
    );

    if (rows.length <= 0) {
      return res.status(404).json({ message: "No existe el registro" });
    }

    res.json(rows[0]);
  } catch (error) {
    return res
      .status(500)
      .json({error, message: "Algo fue mal al obtener la institucion" });
  }
};
//Cupos de la reu
export const getCupos = async (req, res) => {
  try {
    //creamos una const para guardar el parametro 
    const { id } = req.params;
    const [rows] = await pool.query(
      "SELECT a.nombre, c.fechaInicio, c.fechaFina,c.Cupos_charla FROM instituciones a,charlas c WHERE a.instituciones_id = ? AND c.instituciones_instituciones_id = a.instituciones_id",
      [id]
    );

    if (rows.length <= 0) {
      return res.status(404).json({ message: "No existe el registro" });
    }

    res.json(rows[0]);
  } catch (error) {
    return res
      .status(500)
      .json({error, message: "Algo fue mal al obtener los cupos de la reu" });
  }
};
//Todas las empresas
export const getInstituciones = async (req, res) => {
    try {
      const [rows] = await pool.query("SELECT instituciones_id,nombre FROM instituciones");
      res.json(rows);
    } catch (error) {
      return res.status(500).json({ message: "Algo fue mal" });
    }
  };