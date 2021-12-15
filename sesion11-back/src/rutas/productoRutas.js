const { Router } = require("express");
const { userAutorizadoGuard } = require("../guards/userAutorizadoGuard");
const productoRutas = Router();
const { productoModel } = require("../modelos/productoModel");

productoRutas.get("/consultar/:name", function (req, res) {
    const prod = productoModel.find(p => p.title === req.params.name);
    res.send(prod);
})
/**
 * API Guardar Producto
 */
productoRutas.post("/guardar", userAutorizadoGuard, function (req, res) {
    const data = req.body;
    const prod = new productoModel(data);
    prod.save(function (error) {
        if (error) {
            res.send({ estado: "error", msg: "ERROR: Producto NO guardado" });
            return false;
        }
        res.send({ estado: "ok", msg: "Guardado satisfactoriamente" })
    })
});

/**
 * API Rest Editar producto en 'BD'
 * Ruta: /producto/editar
 * Método: POST
 * Datos de entrada: { nombre:"pan", precio:200, stock:52 }
 * Respuesta: { estado: "ok", msg: "Editado satisfactoriamente" }
 */
productoRutas.post("/consultar", function (req, res) {
    // Captura el nombre del producto a buscar
    const { nombre } = req.body; //{nombre:"pan",precio:2,stock:500}
    // Busca el producto en la BD
    productoModel.findOne({ nombre }, function (error, prod) {
        // Si hubo error
        if (error) {
            res.send({ estado: "error", msg: "Producto NO encontrado" })
            return false;
        } else {
            if (prod !== null) {
                res.send({ estado: "ok", msg: "Producto Encontrado", data: prod })
            } else {
                res.send({ estado: "error", msg: "Producto NO encontrado" })
            }
        }
    })
});

productoRutas.get("/listar", function (req, res) {
    // Busca el producto en la BD
    productoModel.find({}, function (error, prod) {
        // Si hubo error
        if (error) {
            res.send({ estado: "error", msg: "Producto NO encontrado" })
            return false;
        } else {
            if (prod !== null) {
                res.send({ estado: "ok", msg: "Producto Encontrado", data: prod })
            } else {
                res.send({ estado: "error", msg: "Producto NO encontrado" })
            }
        }
    })
});

/**
 * API Rest Eliminar producto en 'BD'
 * Ruta: /producto/eliminar
 * Método: POST
 * Datos de entrada: { nombre:"pan" }
 * Respuesta: { estado: "ok", msg: "Producto Eliminado!" }
 */
productoRutas.post("/eliminar", function (req, res) {
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
    res.send({ estado: "ok", msg: "Producto Eliminado!" });
})

exports.productoRutas = productoRutas;