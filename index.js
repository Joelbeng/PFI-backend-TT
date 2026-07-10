import express from "express";
import cors from "cors";
import 'dotenv/config';

import productsRouter from './src/rutas/products.routes.js';
import loginRoutes from "./src/rutas/auth.routes.js"

const app = express();

app.use(cors({

    origin: "*",

    methods: ["GET", "POST", "PUT", "DELETE"],

    allowedHeaders: ["Content-Type", "Authorization"]

}));

app.use(express.json());

app.use((req, res, next) => {
    console.log(`Datos recibidos: ${req.method} ${req.url}`);
    next();
})

app.use(loginRoutes);
app.use("/api", productsRouter);

app.use(function (req, res, next) {
    res.status(404).json ({
            message: "Ruta inválida" 
    });
});

app.use(function (req, res, next) {
    res.status(500).json({ 
            message: "Error interno del servidor" 
        });
});

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`)
})