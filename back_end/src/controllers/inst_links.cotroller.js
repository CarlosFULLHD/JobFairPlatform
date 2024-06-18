import { pool } from "../db.js";
//crear institucion
export const createInstlinks = async (req, res) => {
  try {
    //aqui se obtienen esos datos
    const {llave, url, instituciones_instituciones_id} = req.body;
    const [rows] = await pool.query(
      //FALTA AÑADIR subsector_subsector_id FK, logo (blob)
      "INSERT INTO institucion_tiene_links(linkin,llave, url, instituciones_instituciones_id) VALUES (NULL,?,?,?)",
      [llave,url, instituciones_instituciones_id]
    );
    res.status(201).json({
        linkin: rows.insertId,
        llave,
        url, 
        instituciones_instituciones_id
    });
  } catch (error) {
    return res.status(500).json({error, message: "Algo fue mal en la creacion del link" });
  }
};

export const getLinksById = async (req, res) => {
  try {
    //creamos una const para guardar el parametro 
    const { instituciones_instituciones_id} = req.params;
    const [rows] = await pool.query(
      "SELECT llave, url FROM Institucion_tiene_links WHERE instituciones_instituciones_id = ?",
      [instituciones_instituciones_id]
    );

    if (rows.length <= 0) {
      return res.status(404).json({ message: "No existen links" });
    }

    res.json(rows);
  } catch (error) {
    return res
      .status(500)
      .json({error, message: "Algo fue mal al buscar links" });
  }
};

