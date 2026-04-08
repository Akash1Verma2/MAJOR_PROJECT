const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Listing = require('./models/listing');
const path = require('path');
const methodoverride = require('method-override');
const ejsMate = require('ejs-mate');

const MONGO_URL = 'mongodb://127.0.0.1:27017/wanderlust';

main()
    .then((result) => {
        console.log('Connected to MongoDB');
    })
    .catch((err) => {
        console.error('Error connecting to MongoDB:', err);
    }); 

async function main(){ 
    await mongoose.connect(MONGO_URL);
}

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }));
app.use(methodoverride('_method'));
app.engine('ejs', ejsMate);
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.send('Hi, I am root!');
});

//Index Route - Show all listings
app.get('/listings', async (req, res) => {
    const allListings = await Listing.find({});
    res.render('listings/index.ejs', { allListings });
});

//New Route - Show form to create a new listing
app.get('/listings/new', (req, res) => {
    res.render('listings/new.ejs');
});

//Show Route - Show details of a listing
app.get('/listings/:id', async (req, res) => {
    const { id } = req.params;
    const listing = await Listing.findById(id);
    res.render('listings/show.ejs', { listing });
});

//Create Route - Create a new listing
app.post('/listings', async (req, res) => {
    const newListing = new Listing(req.body.listing);
    await newListing.save();
    res.redirect('/listings');
});

//Edit Route - Show form to edit a listing
app.get("/listings/:id/edit", async(req, res) => {
    let {id} = req.params;
    const listing = await Listing.findById(id);
    res.render('listings/edit.ejs', { listing });
});

//Update Route - Update a listing
app.put("/listings/:id", async(req, res) => {
    let {id} = req.params;
    const listing = await Listing.findByIdAndUpdate(id, {...req.body.listing});
    res.redirect(`/listings/${id}`);
});

//Delete Route - Delete a listing
app.delete("/listings/:id", async(req, res) => {
    let {id} = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    console.log('Deleted listing:', deletedListing);
    res.redirect('/listings');
});

// app.get('/listings', async (req, res) => {
//     let sampleListing = new Listing({
//         title:'My New villa',
//         description: 'By the beach',
//         price: 1200,
//         location: 'Calangute Goa',
//         country: 'India',
//     });
//     await sampleListing.save();
//     console.log('sample was saved');
//     res.send('Listing created successfully!');
// });

app.listen(8080, () => {
    console.log('Server is running on port 8080');
});