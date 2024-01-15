import path from "path"
import {db} from "../app.js"
import { Router } from "express";

export let bookRouter = new Router();

bookRouter.get("/getBooks", async (req, res) => {
    let booksCollection = db.collection("books");
    let books = await booksCollection.find().toArray();
    res.json({books : books});
})


bookRouter.get("/book_details/:isbn", function(request, response) {
    response.sendFile(path.resolve("front/book.html"));
})


bookRouter.get("/:isbn", async function(request, response) {
    let isbn = request.params.isbn;
    let booksCollection = db.collection("books");
    let targetBook = await booksCollection.findOne({"isbn" : isbn});
    if (!targetBook) {
        return response.status(404).json({message : "book not found"});
    }
    return response.status(200).json({"book" : targetBook});
})



bookRouter.put("/change/book/availability", async (req, res) => {
    let updateBook = req.body.book;
    let bookCollection = db.collection("books");
    await bookCollection.updateOne({isbn : updateBook.isbn}, {$set: {availability : !updateBook.availability}});
    res.status(200).json({message : "successful update"});
})