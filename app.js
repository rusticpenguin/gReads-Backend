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

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true });

app.get("/", (req, res) => {
    res.json({message: 'Please use the /books or /authors route'});
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
        Book.findById(req.params.id, (err, book) => {
            if (err) res.send(err);

            if (req.body.title) book.title = req.body.title;
            if (req.body.bookGenre) book.bookGenre = req.body.bookGenre;
            if (req.body.bookDescription) book.bookDescription = req.body.bookDescription;
            if (req.body.bookCoverURL) book.bookCoverURL = req.body.bookCoverURL;

            book.save( function (err) {
                if (err) send (err);
                res.json({message: 'Book has been UPDATED!'});
            });
        });
    })
    .delete((req, res) => {
        Book.deleteOne({_id: req.params.id}, (err, book) => {
            if (err) return res.send(err);
            res.json({ message: 'Book has been DELETED!'});
        });
    })

app.route("/authors")
    .get((req, res) => {
        Author.find({}, (err, foundAuthors) => {
            if (err) res.status(404).end();
            res.status(200).json({foundAuthors});
            }
        );
    })
    .post((req, res) => {
        Author.create(req.body, (err)=>{
            if(err) res.status(418).end();
            res.status(200).json(req.body).end();
            }
        )
    })

app.route("/authors/:id")
    .get((req, res) => {
        Author.findById(req.params.id, (err, foundAuthors) => {
            if (err) res.status(404).end();
            res.status(200).json({foundAuthors});
            }
        );
    })
    .put((req, res) => {
        Author.findById(req.params.id, (err, author) => {
            if (err) res.send(err);

            if (req.body.firstName) author.firstName = req.body.firstName;
            if (req.body.lastName) author.lastName = req.body.lastName;
            if (req.body.bio) author.bio = req.body.bio;
            if (req.body.portraitURL) author.portraitURL = req.body.portraitURL;

            author.save( function (err) {
                if (err) send (err);
                res.json({message: 'Author has been UPDATED!'});
            });
        });
    })
    .delete((req, res) => {
        Author.deleteOne({_id: req.params.id}, (err, author) => {
            if (err) return res.send(err);
            res.json({ message: 'Author has been DELETED!'});
        });
    })

app.listen(port, () => {
    console.log("listening on port ", port);
})