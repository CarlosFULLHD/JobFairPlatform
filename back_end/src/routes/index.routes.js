import { Router } from "express";
import { index, ping } from "../controllers/index.rotes.js";
//contorlador de rutas para el manejo modularizado
const router = Router();


//para verificar la conexion correcta del backend:
router.get("/", index);
router.get("/ping", ping);

export default router;
