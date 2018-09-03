require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const port = process.env.PORT || 5000;

const Book = require('./models/book');
const Author = require('./models/author');

app.use(bodyParser.json());
app.use(cors());
app.use(express.urlencoded({extended:true}));

mongoose.connect(process.env.MONGODBURL, { useNewUrlParser: true });

app.get("/", (req, res) => {
    res.redirect("/");
})

app.route("/books")
    .get((req, res) => {
        Book.find({}, (err, foundBooks) => {
            if (err) res.status(404).end();
            res.status(200).json({foundBooks});
            }
        );
    })
    .post((req, res) => {
        Book.create(req.body, (err)=>{
            if(err) res.status(418).end();
            res.status(200).json(req.body).end();
            }
        )
    })

app.route("/books/:id")
    .get((req, res) => {
        Book.findById(req.params.id, (err, foundBooks) => {
            if (err) res.status(404).end();
            res.status(200).json({foundBooks});
            }
        );
    })
    .put((req, res) => {
        Book.findByIdAndUpdate({_id: req.params.id})
            .then(data => {
                Book.findOne({_id: req.params.id})
                    .then(data => res.send(data))
            });
    })
    .delete((req, res) => {
        Book.deleteOne({_id: req.params.id}, (err, book) => {
            if (err) return res.send(err);
            res.json({ message: 'Book has been Deleted'});
        });
    })

app.listen(port, () => {
    console.log("listening on port ", port);
})