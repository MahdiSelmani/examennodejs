const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    Libelle: String,
    Prix: Number,
    Description: String,
    Quantite : Number
},{timestamps: true});
const Produit = mongoose.model('Produit', userSchema);
module.exports = Produit;
