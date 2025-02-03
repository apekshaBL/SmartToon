import Book from "../models/books.models.js";


export const uploadBook=async (req, res) => {
    try {
        const { title, author, category, studyYear, totalChapters, chapters, coverImage, totalPages, pdfUrl } = req.body;

        if (!title || !author || !category || !studyYear || !totalChapters || !chapters || !totalPages || !pdfUrl) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }

        const newBook = new Book({ title, author, category, studyYear, totalChapters, chapters, coverImage ,totalPages, pdfUrl});
        await newBook.save();

        res.status(201).json({ success: true, message: "Book uploaded successfully", book: newBook });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error", error: error.message });
    }
};


export const getAllBooks= async (req, res) => {
    try {
        const books = await Book.find();
        res.status(200)
        .json({ 
            success: true, 
            count: books.length, 
            books 
        });
    } catch (error) {
        res.status(500)
        .json({ 
            success: false, 
            message: "Server Error", 
            error: error.message 
        });
    }
};


export const getBookById=async (req, res) => {
    try {
        const book = await Book.findById(req.params.bookId);
        if (!book) {
            return res.status(404)
            .json({ 
                success: false, 
                message: "Book not found" 
            });
        }
        res.status(200)
        .json({ 
            success: true, 
            book 
        });
    } catch (error) {
        res.status(500)
        .json({ 
            success: false, 
            message: "Server Error", 
            error: error.message 
        });
    }
};  

export const getBooksByClass=async (req, res) => {
    try {
        const { studyYear } = req.params;
        
        const validStudyYears = ["KG1", "KG2", "1ST", "2ND", "3RD", "4TH", "5TH"];
        if (!validStudyYears.includes(studyYear)) {
            return res.status(400)
            .json({ 
                success: false, 
                message: "Invalid study year"
            });
        }

        const books = await Book.find({ studyYear });

        if (books.length === 0) {
            return res.status(404)
            .json({ 
                success: false, 
                message: "No books found for this study year" 
            });
        }

        res.status(200)
        .json({ 
            success: true, 
            count: books.length, 
            books 
        });
    } catch (error) {
        res.status(500)
        .json({ 
            success: false, 
            message: "Server Error", 
            error: error.message 
        });
    }
};

export const getBooksBySubject=async (req,res)=>{
    try {
        const { category } = req.params;

        const validCategories = ["Science", "Math", "History", "English", "Art", "Other"];
        if (!validCategories.includes(category)) {
            return res.status(400)
            .json({ 
                success: false, 
                message: "Invalid category" 
            });
        }

        const books = await Book.find({ category });

        if (books.length === 0) {
            return res.status(404)
            .json({ 
                success: false, 
                message: "No books found for this category" 
            });
        }

        res.status(200)
        .json({ 
            success: true, 
            count: books.length, 
            books
        });
    } catch (error) {
        res.status(500).json({ 
            success: false, 
            message: "Server Error", 
            error: error.message 
        });
    }
}


export const deleteBook=async (req, res) => {
    try {
        const book = await Book.findByIdAndDelete(req.params.bookId);
        if (!book) {
            return res.status(404)
            .json({ 
                success: false, 
                message: "Book not found" 
            });
        }
        res.status(200)
        .json({ 
            success: true, 
            message: "Book deleted successfully" 
        });
    } catch (error) {
        res.status(500)
        .json({ 
            success: false, 
            message: "Server Error", 
            error: error.message 
        });
    }
};