const express = require("express");
const cors = require("cors");
// Importa las rutas de Productos
const { productoRutas } = require("./rutas/productoRutas");
const { userRutas } = require("./rutas/userRutas");
const { ventasRutas } = require("./rutas/ventasRutas");
const mongoose = require("mongoose");
const app = express();
app.use(cors()); //Middleware cors
app.use(express.json()); //Middleware json()
require("dotenv").config();

//APIs
app.use("/producto", productoRutas);
app.use("/user", userRutas);
app.use("/ventas", ventasRutas);

//Conecta a la BD tienda
mongoose.connect(process.env.SERVER_DB_URL)
    .then(res => console.log("Conectado a BD"))
    .catch(err => console.log("error:", err))

app.listen(8081, function () {
    console.log("Servidor corriendo en el puerto 8081...")
})