import { Router } from "express";
import {
    addStudentToCharla,
    getcuentabyID,
    getcharlabyID,
    getMensajebyIDInstitucion
} from "../controllers/añadirest_charla.controller.js";
const router = Router();
// inscribir a una cuentaen una charla
router.post("/inscribircharla", addStudentToCharla);


//LOS DOS PARA CREAR EL MENSAJE: El usuario se incribira a la charla del "Banco BNB" en fecha MAY 14 14:00:00
router.get("/mensaje/:id", getMensajebyIDInstitucion);


// GET una cuenta por ID, la que estamos usando actualmente
router.get("/cuenta/:id", getcuentabyID);
// GET una charla por ID ESTA YA LA TENEMOS PERO NO CON ID DE INSTITUCION
router.get("/charlainstitucion/:id", getcharlabyID);


// // GET una institucion por ID
// router.get("/instituciones/:id", getInstitucion);



export default router;
