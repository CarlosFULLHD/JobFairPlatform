import { Router } from "express";
import { 
    getCupos,
    getDatosCompletos,
    getNombreDeEmpresa,
    getInstituciones
 } from "../controllers/chat.controller.js";
const router = Router();

// GET todas las instituciones
router.get("/chats_empresas", getInstituciones);
// GET nombre de empresa
router.get("/chats_empresas/:id", getNombreDeEmpresa);
// GET datos reunion
router.get("/chats_empresas/datos/:id", getDatosCompletos);
// GET cantidad de cupos disponibles
router.get("/chats_empresas/cupos/:id", getCupos);

export default router;