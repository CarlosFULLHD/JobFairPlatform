import { Router } from "express";
import {
  getLinksById,
  createInstlinks
} from "../controllers/inst_links.cotroller.js";

const router = Router();
// // GET todas las instituciones
// router.get("/institucioneslinks", getInstlinks);
// // GET una institucion por ID
// router.get("/instituciones/:id", getInstitucion);
// // DELETE una institucion con ID
// router.delete("/instituciones/:id", deleteInstitucion);

// INSERTAR una institucion 
router.post("/institucioneslinks", createInstlinks);

router.get("/institucioneslinks/:instituciones_instituciones_id", getLinksById);

export default router;