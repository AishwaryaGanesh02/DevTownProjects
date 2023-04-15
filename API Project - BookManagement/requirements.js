//Requirements for our project

//Book management company

//BOOKS
//ISBN, title, pub date, language, num page, author[], publication[], category[]

//AUTHORS
//id, name, books[]

//PUBLICATIONS
//id, name, books[]


// ---------GET request

//BOOKS
//WE NEED AN API FOR
//-> to get all books 
//-> to get specific book 
//-> to get a list of books based on category 
//-> to get a list of books based on languages

//AUTHORS
//WE NEED AN API FOR
//-> to get all authors
//-> to get specific author
//-> to get a list of authors based on books

//PUBLICATIONS
//WE NEED AN API FOR
//-> to get all publications
//-> to get specific publication 
//-> to get a list of publications based on book

// ---------POST request
// 1. Add new book
// 2. Add new author
// 3. Add new publication

// ---------PUT request
// 1. Update book on isbn 
// 2. Update the authors in a book based on isbn
// 3. Update the specified book in the given publication and update publication in the book

// ---------DELETE request
// 1. Delete a book
// 2. Delete book from author
// 3. Delete author from book and related book from author
