const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const escortSchema = new Schema({
    traveller: {type: String, required: true},
    driver: {type: String, required: true},
    origin: {type: String, required: true},
    destination: {type: String, required: true},
    contact: {type: String, required: true},
    price: Number
}, {
    timestamps: true,
});


const Escort = mongoose.model('Escort', escortSchema);

module.exports = Escort;