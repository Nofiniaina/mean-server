const mongoose = require('mongoose');

const StockSchema = new mongoose.Schema({
    nom: { type: String, required: true },
    reference: { type: String, required: true },
    quantite: { type: Number, required: true },
    prix: { type: Number, required: true },
    fournisseur: { type: String, required: true }
}, { timestamps: true});

module.exports = mongoose.model('Stock', StockSchema);