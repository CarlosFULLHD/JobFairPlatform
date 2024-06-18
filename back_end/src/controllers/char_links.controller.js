import { pool } from "../db.js";
//Carpeta 3
export const getCharlaslink = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM Charla_tiene_links");
    res.json(rows);
  } catch (error) {
    return res.status(500).json({ message: "Algo fue mal" });
  }
};
//obtener charla por id
export const getCharlaIDlink = async (req, res) => {
  try {
    //creamos una const para guardar el parametro 
    const { id } = req.params;
    const [rows] = await pool.query(
      "SELECT * FROM Charla_tiene_links WHERE linkcha_id = ?",
      [id]
    );

    if (rows.length <= 0) {
      return res.status(404).json({ message: "No existe la charla" });
    }

    res.json(rows[0]);
  } catch (error) {
    return res
      .status(500)
      .json({error, message: "Algo fue mal al obtener la charla, revise el ID por favor" });
  }
};
//se necesita id para le delete
export const deleteCharlalink = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await pool.query("DELETE FROM Charla_tiene_links WHERE linkcha_id = ?", [
      id,
    ]);

    if (rows.affectedRows <= 0) {
      return res.status(404).json({ message: "link de la charla no encontrada" });
    }

    res.sendStatus(204);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Algo fue mal al momento de eliminar" });
  }
};

//crear charla
export const createCharlalink = async (req, res) => {
  try {
    //aqui se obtienen esos datos
    const {url, charlas_charlas_id} = req.body;
    const [rows] = await pool.query(
      //FALTA AÑADIR subsector_subsector_id FK, logo (blob)
      "INSERT INTO Charla_tiene_links(linkcha_id, url, charlas_charlas_id) VALUES (NULL,?, ?)",
      [url, charlas_charlas_id]
    );
    res.status(201).json({
        linkcha_id: rows.insertId,
        url, 
        charlas_charlas_id
    });
  } catch (error) {
    return res.status(500).json({error, message: "Algo fue mal en la creacion del link para la charla" });
  }
};

//actualizar charla por id
export const updateCharlalink = async (req, res) => {
  try {
    const { id } = req.params;
    const {
        url, charlas_charlas_id
    } = req.body;

    const [result] = await pool.query(
      //query largo xd
      //mucho ojo con cada campo, el update en tabla correcta
      //sintaxis sql, etc

      "UPDATE Charla_tiene_links SET url = IFNULL(?, url), charlas_charlas_id = IFNULL(?, charlas_charlas_id) WHERE linkcha_id = ?",
      [url, charlas_charlas_id, id]
    );

    if (result.affectedRows === 0)
      return res.status(404).json({ message: "CHarla no encontrada" });

    const [rows] = await pool.query(
      "SELECT * FROM Charla_tiene_links WHERE linkcha_id = ?",
      [id]
    );

    res.json(rows[0]);
  } catch (error) {
    return res
      .status(500)
      .json({error,  message: "Algo fue mal el link de la charla" });
  }
};