const mongoose = require("mongoose");

const ServiceSchema = new mongoose.Schema({
  rendez_vous_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "appointmentModel",
  },
  client_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  mecanicien_id: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  vehicule: { type: String, required: true },
  date_debut_service: { type: Date, required: true },
  date_fin_service: { type: Date },
  description: { type: String },
  pieces: [
    {
      piece_id: { type: mongoose.Schema.Types.ObjectId, ref: "stockModel" },
      date_ajout: { type: Date, default: Date.now },
      status: { type: String },
      quantite: { type: Number, required: true },
    },
  ],
  prix_main_oeuvre: { type: Number, required: true },
  frais_consultation: { type: Number, required: true },
  frais_deplacement: { type: Number, required: true },
  status: { type: String, default: "En cours" },
});

module.exports = mongoose.model("Service", ServiceSchema);
