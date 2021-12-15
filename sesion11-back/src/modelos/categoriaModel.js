const { model, Schema } = require("mongoose");

const categoriaSchema = new Schema({
    nombre: {
        type: "string",
        required: true
    }
});

const categoriaModel = model("categorias", categoriaSchema);

exports.categoriaModel = categoriaModel;