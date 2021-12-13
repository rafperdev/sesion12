const { ventasModel } = require("../modelos/ventasModel");
const { Router } = require("express");
const ventasRutas = Router();
const { productoModel } = require("../modelos/productoModel");

ventasRutas.post("/guardar", function (req, res) {
    const data = req.body;
    const ventas = new ventasModel(data);
    ventas.save(function (error) {
        if (error) {
            return res.status(500).send({ estado: "error", msg: "ERROR: Venta NO guardada" });
        }
        return res.status(200).send({ estado: "ok", msg: "Venta guardada" });
    })
})

ventasRutas.post("/listar", function (req, res) {
    try {
        
        ventasModel.find({}, function (err, ventas) {
            productoModel.populate(ventas, { path: "producto" }, function (err, ventas) {
                return res.status(200).send(ventas);
            })
        })
    } catch (error) {
        res.status(500).send({ estado: "error", msg: "ERROR" });
    }
})

exports.ventasRutas = ventasRutas;