const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const driverSchema = new Schema({
    fname: {type: String, required: true},
    lname: {type: String, required: true},
    car: {type: String, required: false},
    contact: {type: String, required: true},
    isActive:{type: Boolean, required: true}
}, {
    timestamps: true,
});


const Driver = mongoose.model('Driver', driverSchema);

module.exports = Driver;