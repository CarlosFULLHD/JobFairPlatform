import { pool } from "../db.js";
//Carpeta 3
//Aqui es donde se ejecuta la funcionalidad, querys y funciones
//con el export mandamos estas funciones asincronas a la carpeta 2

export const getInstJOIN = async (req, res) => {
    try {
      const [rows] = await pool.query("SELECT instituciones_id, nombre, email, institucion, telefono, resena, telefonowp, ubicacion, GROUP_CONCAT(DISTINCT l.llave ORDER BY l.llave ASC) AS links_llaves, GROUP_CONCAT(DISTINCT l.url) AS links_redes, GROUP_CONCAT(DISTINCT m.url) AS links_img, GROUP_CONCAT(DISTINCT v.url) AS links_videos FROM instituciones a LEFT JOIN Institucion_tiene_links l ON a.INSTITUCIONES_ID = l.instituciones_instituciones_id LEFT JOIN instituciones_tiene_imagenes m ON m.instituciones_instituciones_id = a.INSTITUCIONES_ID LEFT JOIN instituciones_tiene_videos v ON v.instituciones_instituciones_id = a.INSTITUCIONES_ID GROUP BY a.INSTITUCIONES_ID ORDER BY links_llaves ASC");
      res.json(rows);
    } catch (error) {
      return res.status(500).json({ error, message: "Algo fue mal" });
    }
  };

  export const getImagenesInstv1 = async (req, res) => {
    try {
      const [rows] = await pool.query("SELECT i.instituciones_id,m.url FROM instituciones_tiene_imagenes m RIGHT JOIN instituciones i ON i.INSTITUCIONES_ID = m.instituciones_instituciones_id ORDER BY i.INSTITUCIONES_ID ASC, m.imagenin_id ASC");
      res.json(rows);
    } catch (error) {
      return res.status(500).json({ error, message: "Algo fue mal" });
    }
  };

  export const getImagenesInstv2 = async (req, res) => {
    try {
      const [rows] = await pool.query("SELECT i.INSTITUCIONES_ID, i.nombre, GROUP_CONCAT(m.imagenin_id) AS imagenin_id, GROUP_CONCAT(m.url) AS urls_imagenes FROM instituciones i LEFT JOIN instituciones_tiene_imagenes m ON i.INSTITUCIONES_ID = m.instituciones_instituciones_id GROUP BY i.INSTITUCIONES_ID");
      res.json(rows);
    } catch (error) {
      return res.status(500).json({ error, message: "Algo fue mal" });
    }
  };

//obtener imagenes por id
export const getInstitucionImagesbyId = async (req, res) => {
  try {
    //creamos una const para guardar el parametro 
    const { INSTITUCIONES_ID } = req.params;
 
    const [rows] = await pool.query("SELECT i.INSTITUCIONES_ID, GROUP_CONCAT(m.url SEPARATOR '||') AS urls_imagenes FROM instituciones i LEFT JOIN instituciones_tiene_imagenes m ON i.INSTITUCIONES_ID = m.instituciones_instituciones_id WHERE i.INSTITUCIONES_ID = ? GROUP BY i.INSTITUCIONES_ID",
      [INSTITUCIONES_ID]
    );

    if (rows.length <= 0) {
      return res.status(404).json({ message: "No existe el registro" });
    }

    res.json(rows[0]);
  } catch (error) {
    return res
      .status(500)
      .json({ error, message: "Algo fue mal al obtener la institucion" });
  }
};


// OBTENER LLAVE LINKS (INSITUCIONES LINKS)
export const getInstitucionLinks = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT a.instituciones_id, b.llave, b.url FROM Institucion_tiene_links b RIGHT JOIN instituciones a on a.INSTITUCIONES_ID = b.instituciones_instituciones_id ORDER BY a.INSTITUCIONES_ID asc");
    res.json(rows);
  } catch (error) {
    return res.status(500).json({ error, message: "Algo fue mal" });
  }
};



// //se necesita id para le delete
// export const deleteInstitucion = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const [rows] = await pool.query("DELETE FROM instituciones WHERE instituciones_id = ?", [
//       id,
//     ]);

//     if (rows.affectedRows <= 0) {
//       return res.status(404).json({ message: "institucion no encontrada" });
//     }

//     res.sendStatus(204);
//   } catch (error) {
//     return res
//       .status(500)
//       .json({ message: "Algo fue mal al momento de eliminar" });
//   }
// };

// //crear institucion
// export const createInstituciones = async (req, res) => {
//   try {
//     //aqui se obtienen esos datos
//     const {nombre,email,institucion,telefono,resena,telefonowp,ubicacion} = req.body;
//     const [rows] = await pool.query(
//       //FALTA AÑADIR subsector_subsector_id FK, logo (blob)
//       "INSERT INTO instituciones(instituciones_id, nombre, email, institucion, telefono, resena, telefonowp, ubicacion) VALUES (NULL,?, ?, ?, ?, ?, ?, ?)",
//       [nombre, email, institucion, telefono, resena, telefonowp, ubicacion]
//     );
//     res.status(201).json({
//       instituciones_id: rows.insertId,
//       nombre,
//       email,
//       institucion,
//       telefono,
//       resena,
//       telefonowp,
//       ubicacion
//     });
//   } catch (error) {
//     return res.status(500).json({error, message: "Algo fue mal en la creacion" });
//   }
// };

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


// //obtener institucion por nombre
// export const getInstitucionbyword = async (req, res) => {
//   try {
//     const { word } = req.params;
//     const [rows] = await pool.query(
//       "SELECT * FROM instituciones WHERE nombre LIKE '%'?'%'",
//       [word]
//     );

//     if (rows.length <= 0) {
//       return res.status(404).json({ error, message: " No existe el registro con esa letra" });
//     }

//     res.json(rows[0]);
//   } catch (error) {
//     return res
//       .status(500)
//       .json({error, message: "Algo fue mal al obtener la institucion por nombre" });
//   }
// };