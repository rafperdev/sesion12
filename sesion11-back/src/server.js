const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const producto = require("./modelos/productoModel");
const app = express();
app.use(cors()); //Middleware cors
app.use(express.json()); //Middleware json()

//Conecta a la BD tienda
mongoose.connect("mongodb://localhost:27017/tienda")
    .then(res => console.log("Conectado a BD"))
    .catch(err => console.log("error:", err))

app.get("/", function (req, res) {
    res.send("Hola mundo!");
})

app.get("/producto/consultar/:name", function (req, res) {
    const prod = productos.find(p => p.title === req.params.name);
    res.send(prod);
})
/**
 * API Guardar Producto
 */
app.post("/producto/guardar", function (req, res) {
    const data = req.body;
    const prod = new producto(data);
    prod.save(function (error) {
        if (error) {
            res.send({ status: "error", msg: "ERROR: Producto NO guardado" });
            return false;
        }
        res.send({ status: "ok", msg: "Guardado satisfactoriamente" })
    })
});

/**
 * API Rest Editar producto en 'BD'
 * Ruta: /producto/editar
 * Método: POST
 * Datos de entrada: { nombre:"pan", precio:200, stock:52 }
 * Respuesta: { status: "ok", msg: "Editado satisfactoriamente" }
 */
app.post("/producto/consultar", function (req, res) {
    // Captura el nombre del producto a buscar
    const { nombre } = req.body; //{nombre:"pan",precio:2,stock:500}
    // Busca el producto en la BD
    producto.findOne({ nombre }, function (error, prod) {
        // Si hubo error
        if (error) {
            res.send({ status: "error", msg: "Producto NO encontrado" })
            return false;
        } else {
            if (prod !== null) {
                res.send({ status: "ok", msg: "Producto Encontrado", data: prod })
            } else {
                res.send({ status: "error", msg: "Producto NO encontrado" })
            }
        }
    })
});

/**
 * API Rest Eliminar producto en 'BD'
 * Ruta: /producto/eliminar
 * Método: POST
 * Datos de entrada: { nombre:"pan" }
 * Respuesta: { status: "ok", msg: "Producto Eliminado!" }
 */
app.post("/producto/eliminar", function (req, res) {
    //Capturar los datos que vienen del cliente
    const nom = req.body.nombre;
    //Buscar por nombre de producto en 'BD'
    let i = 0;
    for (const p of productos) {
        if (p.title.toLowerCase() == nom.toLowerCase()) {
            productos.splice(i, 1) //Elimina el producto
            break;
        }
        i++;
    }
    //Responder al cliente
    res.send({ status: "ok", msg: "Producto Eliminado!" });
})


app.listen(8081, function () {
    console.log("Servidor corriendo en el puerto 8081...")
})