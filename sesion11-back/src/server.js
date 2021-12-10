const express = require("express");
const cors = require("cors");
// Importa las rutas de Productos
const { productoRutas } = require("./rutas/productoRutas");
const { userRutas } = require("./rutas/userRutas");
const mongoose = require("mongoose");
const app = express();
app.use(cors()); //Middleware cors
app.use(express.json()); //Middleware json()

//APIs
app.use("/producto", productoRutas);
app.use("/user", userRutas);

//Conecta a la BD tienda
mongoose.connect("mongodb://localhost:27017/tienda")
    .then(res => console.log("Conectado a BD"))
    .catch(err => console.log("error:", err))

app.listen(8081, function () {
    console.log("Servidor corriendo en el puerto 8081...")
})