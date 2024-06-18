import { Router } from "express";
import {
    getCharlas,
    getCharlaID,
    deleteCharla,
    createCharla,
    updateCharla,
    getCharlasPorInstitucionId,
    getCharlasPorCuentaId,
    nodeM,
    deleteCharlaCuentaPorId,
    getCharlasPorIdAdmi,
    getNotificacionesAdmi,
    clearNotificationById

} from "../controllers/charlas.controller.js";

import {
    addStudentToCharla
} from "../controllers/añadirest_charla.controller.js"
const router = Router();
// GET todas las instituciones
router.get("/charlasAll", getCharlas);

// GET una charla por ID
router.get("/charlas/:id", getCharlaID);

// DELETE una charla con ID
router.delete("/charlas/:id", deleteCharla);

// INSERTAR una charla 
router.post("/charlas", createCharla);

//actualizar una charla
router.patch("/charlas/:id", updateCharla);

// OBTENER TODAS LAS CHARLAS POR ID DE INSTITUCION
router.get("/charlasins/:instituciones_instituciones_id", getCharlasPorInstitucionId)
export default router;

// AÑADIR CHARLA A CUENTA
router.post(`/addcharlacuenta`,addStudentToCharla),

router.get(`/getcharlacuenta/:cuenta_cuenta_id`,getCharlasPorCuentaId)

router.delete("/deletecharlacuenta/:estudcha_id", deleteCharlaCuentaPorId);

router.get(`/getcharlasadmi/:instituciones_instituciones_id`, getCharlasPorIdAdmi)

router.get(`/getnotificacionesadmin`,getNotificacionesAdmi)

router.patch(`/clearnotificationid/:estudcha_id`, clearNotificationById)

router.post(`/charlanode`,nodeM)
