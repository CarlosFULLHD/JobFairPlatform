import { pool } from "../db.js";
//Carpeta 3
//Aqui es donde se ejecuta la funcionalidad, querys y funciones
//con el export mandamos estas funciones asincronas a la carpeta 2

//crear institucion
export const createCuenta = async (req, res) => {
    try {
      //aqui se obtienen esos datos
      const {cuenta,pwd,superusuario,email} = req.body;
      const [rows] = await pool.query(
        
        "INSERT INTO cuenta(cuenta_id, cuenta,pwd,superusuario,email) VALUES (NULL, ?, ?, ?, ?)",
        [cuenta,pwd,superusuario,email]
      );
      res.status(201).json({
          cuenta_id: rows.insertId,
          cuenta,
          pwd,
          superusuario,
          email,
      });
    } catch (error) {
      return res.status(500).json({error, message: "Algo fue mal en la creacion" });
    }
  };
//obtener institucion por id
export const getCuenta = async (req, res) => {
    try {
      //creamos una const para guardar el parametro 
      const { cuenta,pwd } = req.params;
      const [rows] = await pool.query(
        "SELECT * FROM cuenta WHERE BINARY cuenta = ? and BINARY pwd = ?",
        [cuenta,pwd]
      );
  
      if (rows.length <= 0) {
        return res.status(404).json({ message: "No existe la cuenta" });
      }
  
      res.json(rows[0]);
    } catch (error) {
      return res
        .status(500)
        .json({error, message: "Algo fue mal al verificar la cuenta" });
    }
  };


  //OTROS================================================================

// export const getCuentas = async (req, res) => {
//   try {
//     const [rows] = await pool.query("SELECT * FROM cuenta");
//     res.json(rows);
//   } catch (error) {
//     return res.status(500).json({ message: "Algo fue mal" });
//   }
// };

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



// //actualizar cuenta por id
// export const updateCuenta = async (req, res) => {
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