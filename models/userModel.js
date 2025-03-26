const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
	nom: { type: String, required: true },
	prenom: { type: String, required: true }, 
	mdp: { type: String, required: true },
	mail: { type: String, unique: true, required: true },
	numero: { type: String },
	role: { type: String },
}, { timestamps: true});

module.exports = mongoose.model("User", UserSchema);
