const express = require("express");
const cors = require("cors");
const app = express();
const { productos } = require("./datos");
app.use(cors()); //Middleware cors
app.use(express.json()); //Middleware json()
app.get("/", function (req, res) {
    res.send("Hola mundo!");
})

app.get("/producto/consultar/:name", function (req, res) {
    const prod = productos.find(p => p.title === req.params.name);
    res.send(prod);
})
/**
 * API Rest Guardar producto en 'BD'
 * Ruta: /producto/guardar
 * Método: POST
 * Datos de entrada: { nombre:"pan", precio:200, stock:52 }
 * Respuesta: { status: "ok", msg: "Guardado satisfactoriamente" }
 */
app.post("/producto/guardar", function (req, res) {
    // Capturar los datos que vienen del cliente
    const nom = req.body.nombre;
    const pre = req.body.precio;
    const stk = req.body.stock;
    // Crear un json
    const prod = { title: nom, price: pre, stock: stk };
    // Guardar en 'BD' de Productos
    productos.push(prod);
    // Responder al cliente
    res.send({ status: "ok", msg: "Guardado satisfactoriamente" });
});

/**
 * API Rest Editar producto en 'BD'
 * Ruta: /producto/editar
 * Método: POST
 * Datos de entrada: { nombre:"pan", precio:200, stock:52 }
 * Respuesta: { status: "ok", msg: "Editado satisfactoriamente" }
 */
app.post("/producto/editar", function (req, res) {
    //Capturar los datos que vienen del cliente
    const nom = req.body.nombre;
    const pre = req.body.precio;
    const stk = req.body.stock;
    // Crear un json
    const prod = { title: nom, price: pre, stock: stk };
    //Buscar por nombre de producto en 'BD'
    let i = 0;
    for (const p of productos) {
        if (p.title.toLowerCase() == nom.toLowerCase()) {
            productos[i] = prod; //Reemplazar por el nuevo producto
            break;
        }
        i++;
    }
    //Responder al cliente
    res.send({ status: "ok", msg: "Editado satisfactoriamente" });
})

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
            productos.splice(i,1) //Elimina el producto
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