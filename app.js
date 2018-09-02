require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(cors());
app.use(express.urlencoded({extended:true}));

mongoose.connect(process.env.MONGODBURL, { useNewUrlParser: true });

const bookSchema = new mongoose.Schema({
    title: { type: String, required: true },
    bookGenre: { type: String, required: false },
    bookDescription: { type: String, required: false},
    bookCoverURL: { type: String, required: false},
});

const authorSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: {type: String, required: true },
    bio: { type: String, required: false},
    portraitURL: { type: String, required: false}
});

const Book = mongoose.model('Book', bookSchema);
const Author = mongoose.model('Author', authorSchema);

app.get("/", (req, res) => {
    res.redirect("/");
})

app.route("/books")
    .get((req, res) => {
        Book.find({}, (err, foundBooks) => {
            if (err){
                res.status(404).end();
            } else {
                res.status(200).json({foundBooks});
            }
        });
    })
    .post((req, res) => {
        Book.create(req.body, (err)=>{
            if(err){
                res.status(418).end();
            }
        })
    })

app.route("/books/:id")
    .get((req, res) => {
        Book.findById(req.params.id, (err, foundBooks) => {
            if (err){
                res.status(404).end();
            } else {
                res.status(200).json({foundBooks});
            }
        });
    })

app.listen(port, () => {
    console.log("listening on port ", port)
})