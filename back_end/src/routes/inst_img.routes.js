import { Router } from "express";
import {

  createInstimages,
  getImagenesById
} from "../controllers/inst_images.controller.js";

const router = Router();

// INSERTAR una institucion 
router.post("/institucionesimages", createInstimages);
router.get("/institucionesimages/:instituciones_instituciones_id",getImagenesById)

export default router;