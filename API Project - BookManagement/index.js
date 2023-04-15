require('dotenv').config();

const express = require("express");
const app = express();

// Mongoose
const mongoose = require("mongoose");
mongoose.connect(process.env.MONGO_URL).then(() => console.log("Connection established"));

// Body parser
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// DATABASE
const database = require("./database/database");

// Models
const BookModel = require("./database/books");
const AuthorModel = require("./database/authors");
const PublicationModel = require("./database/publications");

//GET ALL BOOKS
/*
Route           /
Description     Get all books
Access          Public
Parameter       NONE
Methods         GET
*/
app.get("/", async (req,res)=>{
    const getAllBooks = await BookModel.find();
    return res.json(getAllBooks);
});


//GET A SPECIFIC BOOK
/*
Route           /is
Description     Get specific books
Access          Public
Parameter       isbn
Methods         GET
*/
app.get("/is/:isbn", async (req,res)=>{
    const getSpecificBook = await BookModel.findOne({ISBN: req.params.isbn});
    if (!getSpecificBook) {
        return res.json({error: `No books for the ISBN of ${req.params.isbn}`});
    }
    return res.json({book: getSpecificBook});
});


//GET A SPECIFIC BOOK BASED ON CATEGORY
/*
Route           /c
Description     Get a list of books based on category
Access          Public
Parameter       category
Methods         GET
*/
app.get("/c/:category", async (req,res)=>{
    const getSpecificBook = await BookModel.findOne({category: req.params.category});
    if (!getSpecificBook) {
        return res.json({error: `No books in the category of ${req.params.category}`});
    }
    return res.json({book: getSpecificBook});
});


//GET A SPECIFIC BOOK BASED ON LANGUAGES
/*
Route           /l
Description     Get a list of books based on languages
Access          Public
Parameter       language
Methods         GET
*/
app.get("/l/:language", async (req,res)=>{
    const getSpecificBook = await BookModel.findOne({language: req.params.language});
    if (!getSpecificBook) {
        return res.json({error: `No books in the language ${req.params.language}`});
    }
    return res.json({book: getSpecificBook});
});


//GET ALL AUTHORS
/*
Route           /authors
Description     Get all authors
Access          Public
Parameter       NONE
Methods         GET
*/
app.get("/authors", async (req,res)=>{
    const getAllAuthor = await AuthorModel.find();
    return res.json(getAllAuthor);
});


//GET A SPECIFIC AUTHOR
/*
Route           /authors
Description     Get specific author
Access          Public
Parameter       id
Methods         GET
*/
app.get("/authors/:id", async (req,res)=>{
    const getSpecificAuthor = await AuthorModel.findOne({id: req.params.id});
    if(!getSpecificAuthor){
        return res.json({error: `No author in the ID: ${req.params.id}`});
    }
    return res.json({author: getSpecificAuthor});
});


//GET AUTHORS BASED ON A BOOK
/*
Route           /authors/books
Description     Get the authors based on a book's ISBN
Access          Public
Parameter       isbn
Methods         GET
*/
app.get("/authors/books/:isbn", async (req,res)=>{
    const getSpecificAuthors = await AuthorModel.find({books: req.params.isbn});
    if(!getSpecificAuthors.books){
        return res.json({error: `No author availabe for the book: ${req.params.isbn}`});
    }
    return res.json({author: getSpecificAuthors});
});


//GET ALL PUBLICATIONS
/*
Route           /publications
Description     Get all publications
Access          Public
Parameter       NONE
Methods         GET
*/
app.get("/publications", async (req,res)=>{
    const getAllPublications = await PublicationModel.find();
    return res.json(getAllPublications);
});


//GET A SPECIFIC PUBLICATION
/*
Route           /publications/
Description     Get specific publication
Access          Public
Parameter       id
Methods         GET
*/
app.get("/publications/:id", async (req,res)=>{
    const getSpecifiPublications = await PublicationModel.findOne({id: req.params.id});
    if(! getSpecifiPublications){
        return res.json({error: `No publications in the ID: ${req.params.id}`});
    }
    return res.json({author: getSpecifiPublications});
});


//GET A SPECIFIC PUBLICATIONS BASED ON BOOKS
/*
Route           /publications/books
Description     Get specific author based on books ISBN
Access          Public
Parameter       isbn
Methods         GET
*/
app.get("/publications/books/:isbn", async (req,res)=>{
    const getSpecificAuthor = await PublicationModel.find({books: req.params.isbn});
    if( !getSpecificAuthor.books){
        return res.json({error: `No publications availabe for the book: ${req.params.isbn}`});
    }
    return res.json({author: getSpecificAuthor});
});


// ADD NEW BOOK 
/*
Route           /book/new
Description     Add new book
Access          Public
Parameter       NONE
Methods         POST
*/ 

app.post("/book/new", async (req,res) => {
    const newBook = req.body;
    const existingBook = await BookModel.findOne({ISBN: newBook.ISBN});
    if ( !existingBook){
        const addNewBook = BookModel.create(newBook);
        return res.json({
            books: addNewBook,
            message: "Book was added !"
        });
    }
    else {
        return res.json({"Error": "Book with the same ISBN number exists"});
    }
    
});


// ADD NEW AUTHOR
/*
Route           /author/new
Description     Add new author
Access          Public
Parameter       NONE
Methods         POST
*/ 

app.post("/author/new", async (req,res) => {
    const newAuthor = req.body;
    const existingAuthor = await AuthorModel.findOne({id: newAuthor.id});
    if (!existingAuthor){
        const addNewAuthor = AuthorModel.create(newAuthor);
        return res.json({
            authors: addNewAuthor,
            message: "Author was added !"
        });
    }
    else {
        return res.json({"Error": "Author with the same ID exist"});
    }

});


// ADD NEW PUBLICATION
/*
Route           /publication/new
Description     Add new publication
Access          Public
Parameter       NONE
Methods         POST
*/ 

app.post("/publication/new", async (req,res) => {
    const newPublication = req.body;
    const existingPublication = await PublicationModel.findOne({id: newPublication.id});
    if ( !existingPublication){
        const addNewPublication = PublicationModel.create(newPublication);
        return res.json({
            publication: addNewPublication,
            message: "Publication was added !"
        });
    }
    else{
        return res.json({"Error": "Publication with the same ID exist"});
    }
});


// UPDATE BOOK ON ISBN
/*
Route           /book/update
Description     Update book on isbn 
Access          Public
Parameter       isbn
Methods         PUT
*/ 

app.put("/book/update/:isbn", async (req, res ) => {
    const updatedBook = await BookModel.findOneAndUpdate(
        {
            ISBN: req.params.isbn
        },
        {
            title: req.body.bookTitle
        },
        {
            new: true
        }
    );
    return res.json({
        books: updatedBook
    });
});


// UPDATE BOOK AUTHORS BASED ON ISBN
/*
Route           /author/update/book
Description     Update the authors in a book based on isbn and add book to author 
Access          Public
Parameter       isbn
Methods         PUT
*/ 

app.put("/author/update/book/:isbn", async (req, res ) => {
    const updatedBook = await BookModel.findOneAndUpdate(
        {
            ISBN: req.params.isbn
        },
        {
            $addToSet: {
                author: req.body.newAuthor
            }
        },
        {
            new: true
        }
    );
    const updatedAuthor = await AuthorModel.findOneAndUpdate(
        {
            id: req.body.newAuthor
        },
        {
            $addToSet : {
                books: req.params.isbn
            }
        },
        {
            new: true
        }
    )
    return res.json({
        authors: updatedAuthor,
        books: updatedBook
    });
});


// UPDATE PUBLICATION-BOOK
/*
Route           /publication/update/book
Description     Update the specified book in the given publication and update publication in the book
Access          Public
Parameter       isbn
Methods         PUT
*/ 

app.put("/publication/update/book/:isbn", async (req, res ) => {
    // Update book db
    const updatedBook = await BookModel.findOneAndUpdate(
        {
            ISBN: req.params.isbn
        },
        {
            publications: req.body.pubID
        },
        {
            new: true
        }
    );
    
    // update publication db
    const updatedPublication = await PublicationModel.findOneAndUpdate(
        {
            id: req.body.pubID
        },
        {
            $addToSet : {
                books: req.params.isbn
            }
        },
        {
            new: true
        }
    );
    
    return res.json(
        {
            publications: updatedPublication,
            books: updatedBook
        }
    );
});


// DELETE A BOOK
/*
Route           /book/delete
Description     Delete a book based on isbn
Access          Public
Parameter       isbn
Methods         DELETE
*/ 
app.delete("/book/delete/:isbn", async (req, res) => {
    const updatedBookDatabase = await BookModel.findOneAndDelete(
        {
            ISBN: req.params.isbn
        }
    );
    
    return res.json({books: updatedBookDatabase});
});


// DELETE BOOK FROM AUTHOR
/*
Route           /author/delete/book
Description     Delete a book from author
Access          Public
Parameter       isbn
Methods         DELETE
*/ 
app.delete("/author/delete/book/:isbn", async (req, res) => {
    const deletedAuthor = await AuthorModel.findOneAndUpdate(
        {
            id: req.body.pubID
        },
        {
            $pull: {
                books: req.params.isbn
            }
        },
        {
            new: true
        }

    );
    return res.json({
        Author: deletedAuthor,
        message: "Successfully deleted"
    });

});


// DELETE AUTHOR FROM BOOK AND RELATED BOOKS FROM AUTHORS
/*
Route           /book/delete/author
Description     Delete author from book and the book from author
Access          Public
Parameter       isbn, authorId
Methods         DELETE
*/ 
app.delete("/book/delete/author/:isbn/:authorId", async (req, res) => {
    // Update book database
    const deletedBook = await BookModel.findOneAndUpdate(
        {
            ISBN: req.params.isbn
        },
        {
            $pull: {
                author: req.params.authorId
            }
        },
        {
            new: true
        }

    );
    // Update author database
    const deletedAuthor = await AuthorModel.findOneAndUpdate(
        {
            id: req.params.authorId
        },
        {
            $pull: {
                books: req.params.isbn
            }
        },
        {
            new: true
        }

    );
    return res.json(
        {
            Books: deletedBook,
            Author: deletedAuthor,
            message: "Successfully deleted"
        }
    );
});


app.listen(3000, ()=>{
    console.log("Server up and running");
});
