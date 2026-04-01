const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const listingSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: String,
    image: {
        type: String,
        default: "https://www.eclosio.ong/wp-content/uploads/2018/08/default.png",
        set: (value) => value === "" ? "https://www.eclosio.ong/wp-content/uploads/2018/08/default.png" : value,
    },
    price: Number,
    location: String,
    country: String,
});

const Listing = mongoose.model('Listing', listingSchema);
module.exports = Listing;