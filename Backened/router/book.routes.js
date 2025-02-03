import { Router } from "express";
import { deleteBook, getAllBooks, getBooksByClass, getBookById, uploadBook, getBooksBySubject } from "../controllers/book.controllers.js";

const bookRoutes=Router();

bookRoutes.post("/upload", uploadBook);
bookRoutes.get("/", getAllBooks);
bookRoutes.get("/:bookId", getBookById);
bookRoutes.delete("/:bookId", deleteBook);
bookRoutes.get("/class/:studyYear",getBooksByClass);
bookRoutes.get("/subject/:category",getBooksBySubject);

export default bookRoutes;