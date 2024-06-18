import { pool } from "../db.js";


//crear IMAGEN
export const createInstimages = async (req, res) => {
  try {
    const {url, instituciones_instituciones_id} = req.body;
    const [rows] = await pool.query(
      "INSERT INTO instituciones_tiene_imagenes(imagenin_id, url, instituciones_instituciones_id) VALUES (NULL,?, ?)",
      [url, instituciones_instituciones_id]
    );
    res.status(201).json({
        imagenin_id: rows.insertId,
        url, 
        instituciones_instituciones_id
    });
  } catch (error) {
    return res.status(500).json({error, message: "Algo fue mal en la creacion de la imagen" });
  }
};


// OBTENER IMAGENES POR ID
export const getImagenesById = async (req, res) => {
  try {
    //creamos una const para guardar el parametro 
    const { instituciones_instituciones_id} = req.params;
    const [rows] = await pool.query(
      "SELECT url FROM instituciones_tiene_imagenes WHERE instituciones_instituciones_id = ?",
      [instituciones_instituciones_id]
    );

    if (rows.length <= 0) {
      return res.status(404).json({ message: "No existen imagenes" });
    }

    res.json(rows);
  } catch (error) {
    return res
      .status(500)
      .json({error, message: "Algo fue mal al buscar imagenes" });
  }
};

// //actualizar institucion por id
// export const updateInstitucion = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const {
//       nombre,
//       email,
//       institucion,
//       telefono,
//       resena,
//       telefonowp,
//       ubicacion,
//     } = req.body;

//     const [result] = await pool.query(
//       //query largo xd
//       //mucho ojo con cada campo, el update en tabla correcta
//       //sintaxis sql, etc

//       "UPDATE instituciones SET nombre = IFNULL(?, nombre), email = IFNULL(?, email), institucion = IFNULL(?, institucion), telefono = IFNULL(?, telefono),resena = IFNULL(?, resena),telefonowp = IFNULL(?, telefonowp),ubicacion = IFNULL(?, ubicacion) WHERE instituciones_id = ?",
//       [nombre, email, institucion, telefono, resena, telefonowp, ubicacion, id]
//     );

//     if (result.affectedRows === 0)
//       return res.status(404).json({ message: "Institucion no encontrada" });

//     const [rows] = await pool.query(
//       "SELECT * FROM instituciones WHERE instituciones_id = ?",
//       [id]
//     );

//     res.json(rows[0]);
//   } catch (error) {
//     return res
//       .status(500)
//       .json({error,  message: "Algo fue mal al actualizar la institucion" });
//   }
// };

