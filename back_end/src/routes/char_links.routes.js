import { Router } from "express";
import {
    getCharlaslink,
    //getCharlaIDlink,
    deleteCharlalink,
    createCharlalink,
    updateCharlalink,

} from "../controllers/char_links.controller.js";
const router = Router();
// GET todas las instituciones
router.get("/charlaslinks", getCharlaslink);

// // GET una charla por ID
// router.get("/charlas/:id", getCharlaID);

// DELETE una charla con ID
router.delete("/charlaslinks/:id", deleteCharlalink);

// INSERTAR una charla 
router.post("/charlaslinks", createCharlalink);

//actualizar una charla
router.patch("/charlaslinks/:id", updateCharlalink);
export default router;
