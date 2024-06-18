import { pool } from "../db.js";
//crear institucion
export const createVideos = async (req, res) => {
  try {
    const {url, instituciones_instituciones_id} = req.body;
    const [rows] = await pool.query(
      "INSERT INTO instituciones_tiene_videos(videoin_id, url, instituciones_instituciones_id) VALUES (NULL,?, ?)",
      [url, instituciones_instituciones_id]
    );
    res.status(201).json({
        videoin_id: rows.insertId,
        url, 
        instituciones_instituciones_id
    });
  } catch (error) {
    return res.status(500).json({error, message: "Algo fue mal en la creacion de la imagen" });
  }
};

export const getVideosById = async (req, res) => {
  try {
    //creamos una const para guardar el parametro 
    const { instituciones_instituciones_id} = req.params;
    const [rows] = await pool.query(
      "SELECT url FROM instituciones_tiene_videos WHERE instituciones_instituciones_id = ?",
      [instituciones_instituciones_id]
    );

    if (rows.length <= 0) {
      return res.status(404).json({ message: "No existen videos" });
    }

    res.json(rows);
  } catch (error) {
    return res
      .status(500)
      .json({error, message: "Algo fue mal al buscar imagenes" });
  }
};


