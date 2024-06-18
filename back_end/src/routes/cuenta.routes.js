import { Router } from "express";
import {
    getCuenta,
    createCuenta,
    // getCuentas,
    // deleteCuenta,
    // updateCuenta,
} from "../controllers/cuenta.controller.js";
//carpeta 2

const router = Router();

// GET para que te de los datos de UNA SOLA CUENTA - se necesita ID
router.get("/cuenta/:cuenta/:pwd", getCuenta);
// INSERTAR/Crear una cuenta nueva 
router.post("/cuenta", createCuenta);

// // GET para ver todas las cuentas
// router.get("/cuenta", getCuentas);
// // DELETE una cuenta por ID
// router.delete("/instituciones/:id", deleteCuenta);
// //actualizar una cuenta
// router.patch("/instituciones/:id", updateCuenta);

export default router;
