const { Router } = require("express");
const categoriaRutas = Router();
const { productoModel } = require("../modelos/productoModel");
const { userAutorizadoGuard } = require("../guards/userAutorizadoGuard");
const { categoriaModel } = require("../modelos/categoriaModel");

categoriaRutas.post("/guardar", userAutorizadoGuard, function (req, res) {
    const data = req.body;
    const ventas = new categoriaModel(data);
    ventas.save(function (error) {
        if (error) {
            return res.status(500).send({ estado: "error", msg: "ERROR: Venta NO guardada" });
        }
        return res.status(200).send({ estado: "ok", msg: "Categoria guardada" });
    })
})

categoriaRutas.get("/listar", userAutorizadoGuard, function (req, res) {
    try {

        categoriaModel.find({}, function (err, categ) {
            return res.status(200).send({ estado: "ok", msg: "Categorias", data: categ });

        })
    } catch (error) {
        res.status(500).send({ estado: "error", msg: "ERROR" });
    }
})

exports.categoriaRutas = categoriaRutas;