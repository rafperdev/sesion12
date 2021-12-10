const { model, Schema } = require("mongoose");
const { genSalt, hash } = require("bcryptjs");

const userSchema = new Schema({
    usuario: {
        type: "string",
        unique: true,
        required: true,
        max: 100
    },
    password: {
        type: "string",
        required: true
    },
    rol: {
        type: "string",
        required: true
    }
});

userSchema.pre("save", async function (next) {
    const salt = await genSalt(10);
    this.password = await hash(this.password, salt);
    next();
})

const userModel = model("users", userSchema);

exports.userModel = userModel;