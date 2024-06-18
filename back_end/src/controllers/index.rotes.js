import { pool } from "../db.js";
//prueba d econexion con la base de datos

export const index = (req, res) => res.json({ message: "API: Con pastel" });

export const ping = async (req, res) => {
  const [result] = await pool.query('SELECT "pong" as result');
  res.json(result[0]);
};
