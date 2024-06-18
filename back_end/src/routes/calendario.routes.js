import { Router } from "express";
import {
    getInstitucionescalendario
} from "../controllers/calendario.controller.js";
const router = Router();
// GET todas las instituciones
router.get("/calendario", getInstitucionescalendario);

// //obtener una institucion por nombre
// router.get("/instituciones/query/:word", getInstitucionbyword);

// // GET una institucion por ID
// router.get("/instituciones/:id", getInstitucion);

// // DELETE una institucion con ID
// router.delete("/instituciones/:id", deleteInstitucion);

// // INSERTAR una institucion 
// router.post("/instituciones", createInstituciones);

// //actualizar una institucion
// router.patch("/instituciones/:id", updateInstitucion);
export default router;
