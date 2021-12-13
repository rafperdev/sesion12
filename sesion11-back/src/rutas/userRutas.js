const { Router } = require("express");
const { userModel } = require("../modelos/userModel");
const { compare } = require("bcryptjs");
const { sign } = require("jsonwebtoken");
const { userSaveGuard } = require("../guards/userSaveGuard");
const userRutas = Router();

userRutas.post("/login", async function (req, res) {
    try {
        const { usuario, password } = req.body; //{usuario:"us1", password:"123"}        
        // Buscar en BD el usuario
        const user = await userModel.findOne({ usuario });
        console.log(user);
        // Preguntar si existe
        if (!user) {
            return res.status(401).send({ estado: "error", msg: "Credenciales no válidas" });
        }

        // Comprobar password
        const passOK = await compare(password, user.password);
        if (passOK) {
            //Genera el token
            const token = sign(
                {
                    usuario: user.usuario,
                    rol: user.rol
                },
                process.env.JWT_SECRET_KEY
            )
            return res.status(200).send({ estado: "ok", msg: "Logueado :)", token })
        } else {
            return res.status(401).send({ estado: "error", msg: "Credenciales no válidas" });
        }
        // Enviar mensaje OK/Error
    } catch (error) {
        return res.status(401).send({ estado: "error", msg: "Credenciales no válidas", error });
    }
});

userRutas.post("/save", userSaveGuard, function (req, res) {
    const data = req.body; // {usuario:"admin", password:"123456", rol:"usuario"}
    const user = new userModel(data);
    user.save(function (error) {
        if (error) {
            return res.status(500).send({ estado: "error", msg: "ERROR: Usuario NO guardado" });
        }
        return res.status(200).send({ estado: "ok", msg: "Usuario Guardado" });
    })
})


exports.userRutas = userRutas;