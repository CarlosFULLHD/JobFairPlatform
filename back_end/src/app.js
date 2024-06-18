import express from "express";
import morgan from "morgan";
import bodyParser from 'body-parser'// PROCESS JSON DATA VERY EASLY
import cors from 'cors'

import institucionesRoutes from "./routes/instituciones.routes.js";
import cuentaRoutes from "./routes/cuenta.routes.js";
import indexRoutes from "./routes/index.routes.js";
import inst_linkRoutes from "./routes/inst_links.routes.js";
import inst_imagesRoutes from "./routes/inst_img.routes.js";
import inst_videosRoutes from "./routes/inst_videos.routes.js";
import institucionesJOINRoutes from "./routes/inst_join.routes.js";
import institucionescalendarioRoutes from "./routes/calendario.routes.js"
import charlasRoutes from "./routes/charlas.routes.js"
import charlaslinksRoutes from "./routes/char_links.routes.js"
//este se diferencia porque obtiene charlas por id de institucion
import charlasINSTITUCIONRoutes from "./routes/añadirest_charla.routes.js"

import chatRoutes from "./routes/chat.routes.js"
//Carpeta 1



const app = express();

// Middlewares
app.use(morgan("dev"));
app.use(express.json());
app.use(bodyParser.json())
app.use(cors())

app.use("/", indexRoutes);

//Para instituciones CRUD
app.use("/api", institucionesRoutes);
//Para cuenta login
app.use("/api", cuentaRoutes);

//Para instituciones link, imagenes, videos
app.use("/api", inst_linkRoutes);
app.use("/api", inst_imagesRoutes);
app.use("/api", inst_videosRoutes);

//Para las tarjetas
app.use("/api", institucionesJOINRoutes);
//pal calendario checkbox
app.use("/api", institucionescalendarioRoutes);
//Para charlas
app.use("/api", charlasRoutes);
//Para link de las charlas
app.use("/api", charlaslinksRoutes);


//para obtener las charlas por id de institucion
// PARA INSCRIPCION DE CHARLAS
app.use("/api", charlasINSTITUCIONRoutes);

// API PARA NATALIA
// Ya funciona 
app.use("/api", chatRoutes);



app.use((req, res, next) => {
  res.status(404).json({ message: "Not found" });
});

export default app;
