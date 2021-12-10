const { verify } = require("jsonwebtoken");

const userSaveGuard = (req, res, next) => {
    //Captura el token desde la cabecera
    const authorization = req.headers.authorization;
    //Valida que hay un token
    if (!authorization) {
        next(JSON.stringify({ estado: "error", msg: "NO AUTORIZADO" }))
    };
    try {
        // Captura el token
        const token = authorization.split(' ')[1];
        //Obtiene la carga útil 
        const payload = verify(token, "misecreto");
        // Verifica el Rol de usuario
        if (payload.rol !== "admin") next(JSON.stringify({ estado: "eror", msg: "NO AUTORIZADO" }));
    } catch (err) {
        console.log(err);
    }
    return next();
};

exports.userSaveGuard = userSaveGuard;