const express = require("express");

// DATABASE
const database = require("./database");
const app = express();

//GET ALL BOOKS
/*
Route           /
Description     Get all books
Access          Public
Parameter       NONE
Methods         GET
*/
app.get("/", (req,res)=>{
    return res.json({books: database.books});
});

//GET A SPECIFIC BOOK
/*
Route           /is
Description     Get specific books
Access          Public
Parameter       isbn
Methods         GET
*/
app.get("/is/:isbn", (req,res)=>{
    const getSpecificBook = database.books.filter(
        (book) => book.ISBN === req.params.isbn
    );
    if (getSpecificBook.length === 0) {
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
app.get("/c/:category", (req,res)=>{
    const getSpecificBook = database.books.filter(
        (book) => book.category.includes(req.params.category)
    );
    if (getSpecificBook.length === 0) {
        return res.json({error: `No books in the category of ${req.params.category}`});
    }
    return res.json({book: getSpecificBook});
});


//GET A SPECIFIC BOOK BASED ON LANGUAGES
/*
Route           /c
Description     Get a list of books based on languages
Access          Public
Parameter       category
Methods         GET
*/
app.get("/l/:language", (req,res)=>{
    const getSpecificBook = database.books.filter(
        (book) => book.language === req.params.language
    );
    if (getSpecificBook.length === 0) {
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
app.get("/authors", (req,res)=>{
    return res.json({authors: database.authors});
});


//GET A SPECIFIC AUTHOR
/*
Route           /authors
Description     Get specific author
Access          Public
Parameter       id
Methods         GET
*/
app.get("/authors/:id", (req,res)=>{
    const getSpecificAuthor = database.authors.filter(
        (author) => author.id === parseInt(req.params.id)
        
    );
    if (getSpecificAuthor.length === 0) {
        return res.json({error: `No author in the ID: ${req.params.id}`});
    }
    return res.json({author: getSpecificAuthor});
});


//GET A SPECIFIC AUTHOR BASED ON BOOKS
/*
Route           /authors/books
Description     Get specific author based on books ISBN
Access          Public
Parameter       isbn
Methods         GET
*/
app.get("/authors/books/:isbn", (req,res)=>{
    const getSpecificAuthor = database.authors.filter(
        (author) => author.books.includes(req.params.isbn)        
    );
    if (getSpecificAuthor.length === 0) {
        return res.json({error: `No author availabe for the book: ${req.params.isbn}`});
    }
    return res.json({author: getSpecificAuthor});
});


//GET ALL PUBLICATIONS
/*
Route           /publications
Description     Get all publications
Access          Public
Parameter       NONE
Methods         GET
*/
app.get("/publications", (req,res)=>{
    return res.json({authors: database.publication});
});


//GET A SPECIFIC PUBLICATION
/*
Route           /publications/
Description     Get specific publication
Access          Public
Parameter       id
Methods         GET
*/
app.get("/publications/:id", (req,res)=>{
    const getSpecifiPublications = database.publication.filter(
        (publication) => publication.id === parseInt(req.params.id)
        
    );
    if (getSpecifiPublications.length === 0) {
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
app.get("/publications/books/:isbn", (req,res)=>{
    const getSpecificAuthor = database.publication.filter(
        (publication) => publication.books.includes(req.params.isbn)        
    );
    if (getSpecificAuthor.length === 0) {
        return res.json({error: `No publications availabe for the book: ${req.params.isbn}`});
    }
    return res.json({author: getSpecificAuthor});
});


app.listen(3000, ()=>{
    console.log("Server up and running");
});
