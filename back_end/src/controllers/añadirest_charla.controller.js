import { pool } from "../db.js";
//Carpeta 3
//Aqui es donde se ejecuta la funcionalidad, querys y funciones
//con el export mandamos estas funciones asincronas a la carpeta 2

//El valor de la flag por defecto sera 1 en cada creacion
export const addStudentToCharla = async (req, res) => {
    try {
      const { cuenta_cuenta_id, charlas_charlas_id } = req.body;
      const [rows] = await pool.query(
        "INSERT INTO Charla_tiene_estudiantes(estudcha_id, flag, cuenta_cuenta_id, charlas_charlas_id) VALUES (NULL, ?, ?, ?)",
        [1, cuenta_cuenta_id, charlas_charlas_id]
      );
      res.status(201).json({
        estudcha_id: rows.insertId,
        flag: 1,
        cuenta_cuenta_id,
        charlas_charlas_id
      });
    } catch (error) {
      return res.status(500).json({ error, message: "Algo fue mal en la creacion" });
    }
  };

  export const getMensajebyIDInstitucion = async (req, res) => {
    try {
      //creamos una const para guardar el parametro 
      const { id } = req.params;
      const [rows] = await pool.query("SELECT u.cuenta, c.nombrecharla, i.nombre, c.fechaInicio FROM instituciones i, charlas c, cuenta u WHERE instituciones_id = ?",
        [id]
      );
  
      if (rows.length <= 0) {
        return res.status(404).json({ message: "No existe la cuenta" });
      }
  
      res.json(rows[0]);
    } catch (error) {
      return res
        .status(500)
        .json({ error, message: "Algo fue mal al obtener el id de la cuenta" });
    }
  };




// GET una cuenta por ID, la que estamos usando actualmente
export const getcuentabyID = async (req, res) => {
    try {
      //creamos una const para guardar el parametro 
      const { id } = req.params;
      const [rows] = await pool.query("SELECT cuenta_id FROM cuenta WHERE cuenta_id = ? ",
        [id]
      );
  
      if (rows.length <= 0) {
        return res.status(404).json({ message: "No existe la cuenta" });
      }
  
      res.json(rows[0]);
    } catch (error) {
      return res
        .status(500)
        .json({ error, message: "Algo fue mal al obtener el id de la cuenta" });
    }
  };

// GET una charla por ID de institucion,
// la que se esta inscribiendo(haciendo click de la institicuion id)
export const getcharlabyID = async (req, res) => {
    try {
      //creamos una const para guardar el parametro 
      const { id } = req.params;
      const [rows] = await pool.query("select c.nombrecharla, i.nombre, c.fechaInicio FROM instituciones i, charlas c WHERE instituciones_id=?",
        [id]
      );
  
      if (rows.length <= 0) {
        return res.status(404).json({error, message: "No existe la charla" });
      }
  
      res.json(rows[0]);
    } catch (error) {
      return res
        .status(500)
        .json({ error, message: "Algo fue mal al obtener la charla por id de institucion" });
    }
  };