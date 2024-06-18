import { pool } from "../db.js";

import nodeMailer from 'nodemailer';
//Carpeta 3
export const getCharlas = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM charlas");
    res.json(rows);
  } catch (error) {
    return res.status(500).json({ message: "Algo fue mal" });
  }
};
//obtener charla por id
export const getCharlaID = async (req, res) => {
  try {
    //creamos una const para guardar el parametro 
    const { id } = req.params;
    const [rows] = await pool.query(
      "SELECT * FROM charlas WHERE charlas_id = ?",
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
export const deleteCharla = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await pool.query("DELETE FROM charlas WHERE charlas_id = ?", [
      id,
    ]);

    if (rows.affectedRows <= 0) {
      return res.status(404).json({ message: "charla no encontrada" });
    }

    res.sendStatus(204);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Algo fue mal al momento de eliminar" });
  }
};

//crear charla
export const createCharla = async (req, res) => {
  try {
    //aqui se obtienen esos datos
    const {nombrecharla, link, fechaInicio, fechaFina, Cupos_charla, Color, instituciones_instituciones_id} = req.body;
    const [rows] = await pool.query(
      //FALTA AÑADIR subsector_subsector_id FK, logo (blob)
      "INSERT INTO charlas(charlas_id, nombrecharla, link, fechaInicio, fechaFina, Cupos_charla, Color, instituciones_instituciones_id) VALUES (NULL,?, ?, ?, ?, ?, ?, ?)",
      [nombrecharla, link, fechaInicio, fechaFina, Cupos_charla, Color, instituciones_instituciones_id]
    );
    res.status(201).json({
        charlas_id: rows.insertId,
        nombrecharla, 
        link, 
        fechaInicio, 
        fechaFina, 
        Cupos_charla,
        Color, 
        instituciones_instituciones_id
    });
  } catch (error) {
    return res.status(500).json({error, message: "Algo fue mal en la creacion" });
  }
};

//actualizar charla por id
export const updateCharla = async (req, res) => {
  try {
    const { id } = req.params;
    const {
        nombrecharla, 
        link, 
        fechaInicio,
        fechaFina,
        Cupos_charla,
        Cupos_disponibles,
        instituciones_instituciones_id
    } = req.body;

    const [result] = await pool.query(
      //query largo xd
      //mucho ojo con cada campo, el update en tabla correcta
      //sintaxis sql, etc

      "UPDATE charlas SET nombrecharla = IFNULL(?, nombrecharla), link = IFNULL(?, link), fechaInicio = IFNULL(?, fechaInicio), fechaFina = IFNULL(?, fechaFina),Cupos_charla = IFNULL(?, Cupos_charla),Cupos_disponibles = IFNULL(?, Cupos_disponibles),instituciones_instituciones_id = IFNULL(?, instituciones_instituciones_id) WHERE charlas_id = ?",
      [nombrecharla, link, fechaInicio, fechaFina, Cupos_charla, Cupos_disponibles, instituciones_instituciones_id, id]
    );

    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Institucion no encontrada" });

    const [rows] = await pool.query(
      "SELECT * FROM charlas WHERE charlas_id = ?",
      [id]
    );

    res.json(rows[0]);
  } catch (error) {
    return res
      .status(500)
      .json({error,  message: "Algo fue mal al actualizar la charla" });
  }
};


export const getCharlasPorInstitucionId = async (req, res) => {
  try {
    //creamos una const para guardar el parametro 
    const { instituciones_instituciones_id} = req.params;
    const [rows] = await pool.query(
      "SELECT * FROM CHARLAS WHERE instituciones_instituciones_id = ?",
      [instituciones_instituciones_id]
    );

    if (rows.length <= 0) {
      return res.status(404).json({ message: "No existen links" });
    }

    res.json(rows);
  } catch (error) {
    return res
      .status(500)
      .json({error, message: "Algo fue mal al charlas" });
  }
};

export const getCharlasPorCuentaId = async (req, res) => {
  try {
    //creamos una const para guardar el parametro 
    const { cuenta_cuenta_id} = req.params;
    const [rows] = await pool.query(
      `select a.nombre, b.nombrecharla, b.fechainicio, b.fechafina, b.link, c.estudcha_id
      from instituciones a, charlas b, charla_tiene_estudiantes c
      where a.instituciones_id = b.instituciones_instituciones_id and
          b.charlas_id = c.charlas_charlas_id and 
            c.cuenta_cuenta_id = ?`,
      [cuenta_cuenta_id]
    );

    if (rows.length <= 0) {
      return res.status(404).json({ message: "No existen links" });
    }
    res.json(rows);
  } catch (error) {
    return res
      .status(500)
      .json({error, message: "Algo fue mal al charlas" });
  }
};

//BORRAR CHARLAS DE ESTUDIANTE POR ID DE CHARLA-CUENTA
export const deleteCharlaCuentaPorId = async (req, res) => {
  try {
    const { estudcha_id } = req.params;
    const [rows] = await pool.query("DELETE FROM charla_tiene_estudiantes WHERE estudcha_id = ?", [
      estudcha_id,
    ]);

    if (rows.affectedRows <= 0) {
      return res.status(404).json({ message: "charla no encontrada" });
    }

    res.sendStatus(204);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Algo fue mal al momento de eliminar" });
  }
};


export const getCharlasPorIdAdmi = async (req, res) => {
  try {
    //creamos una const para guardar el parametro 
    const { instituciones_instituciones_id} = req.params;
    const [rows] = await pool.query(
      `select a.nombre, b.nombrecharla, b.fechainicio, b.fechafina, b.link, b.cupos_charla, count(c.estudcha_id) as 'inscritos', b.cupos_charla - count(c.estudcha_id) as 'libres'
      from instituciones a
      right join charlas b on a.instituciones_id = b.instituciones_instituciones_id
      left join charla_tiene_estudiantes c on b.charlas_id = c.charlas_charlas_id
      where b.instituciones_instituciones_id = ?
      group by b.charlas_id;`,
      [instituciones_instituciones_id]
    );

    if (rows.length <= 0) {
      return res.status(404).json({ message: "No existen links" });
    }
    res.json(rows);
  } catch (error) {
    return res
      .status(500)
      .json({error, message: "Algo fue mal al charlas" });
  }
};


export const getNotificacionesAdmi = async (req, res) => {
  try {
    const [rows] = await pool.query(`
    SELECT b.estudcha_id, a.nombrecharla, b.flag
    from charlas a, charla_tiene_estudiantes b
    where a.charlas_id = b.charlas_charlas_id and b.flag= 1;
    `);
    res.json(rows);
  } catch (error) {
    return res.status(500).json({ message: "Algo fue mal" });
  }
};


export const clearNotificationById = async (req, res) => {
  try {
    const { estudcha_id } = req.params;
    const [rows] = await pool.query(`UPDATE charla_tiene_estudiantes
                                      SET flag = 0
                                      WHERE estudcha_id = ?`, 
    [estudcha_id,]);

    if (rows.affectedRows <= 0) {
      return res.status(404).json({ message: "charla no encontrada" });
    }

    res.sendStatus(204);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Algo fue mal al momento de eliminar" });
  }
};


export const nodeM = async (req, res) => {
  try {
   
    //aqui se obtienen esos datos
    const {titulo, cuerpo, correo} = req.body;
    console.log

    const html = `
    <h1>${titulo}</h1>
    <p>${cuerpo}</p>
  `
    const transporter = nodeMailer.createTransport({
      service: 'Gmail',
      auth: {
        user: 'nodemailtest1234@gmail.com',
        pass: 'drcqmepojmocyeak'
      },

      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
    })
    const info = await transporter.sendMail({
      from: 'USEI UCB <nodemailtest1234@gmail.com>',
      to: `${correo}`,
      subject: 'USEI Test',
      html: html,
    })
  
    console.log("Message sent: " + info.messageId)

  } catch (error) {
    return res.status(500).json({error, message: "Algo fue mal en la creacion" });
  }
};


