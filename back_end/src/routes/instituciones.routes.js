import { Router } from "express";
import {
  getInstituciones,
  getInstitucion,
  deleteInstitucion,
  createInstituciones,
  updateInstitucion,
  getInstitucionbyword,
} from "../controllers/instituciones.controller.js";
//controlador de rutas para el manejo modularizado
//Digamos carpeta 2
//importamos funciones asincronas de la carpeta 3

const router = Router();
//RUTAS validas "/ruta", eso nos servira para la conexion con el frontend


// GET todas las instituciones
router.get("/instituciones", getInstituciones);

//obtener una institucion por nombre
router.get("/instituciones/query/:word", getInstitucionbyword);

// GET una institucion por ID
router.get("/instituciones/:id", getInstitucion);

// DELETE una institucion con ID
router.delete("/instituciones/:id", deleteInstitucion);

// INSERTAR una institucion 
router.post("/instituciones", createInstituciones);

//actualizar una institucion
router.patch("/instituciones/:id", updateInstitucion);



export default router;
