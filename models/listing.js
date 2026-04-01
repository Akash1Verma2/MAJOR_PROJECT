const mongoose = require('mongoose');
const Schema = mongoose.Schema;

mongoose.set('strictQuery', true);

const listingSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: String,
    image: {
    filename: {
        type: String,
        default: "listingimage",
    },
    url: {
        type: String,
        default: "https://www.eclosio.ong/wp-content/uploads/2018/08/default.png",
        set: (value) =>
            value === ""
                ? "https://www.eclosio.ong/wp-content/uploads/2018/08/default.png"
                : value,
    },
},
    price: Number,
    location: String,
    country: String,
});

const Listing = mongoose.model('Listing', listingSchema);
module.exports = Listing;