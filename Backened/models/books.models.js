import { Schema, model } from "mongoose";

const bookSchema = new Schema({
    title: {
        type: String,
        required: [true, "Book title is required"],
        trim: true,
        maxLength: [200, "Book title should be less than 200 characters"]
    },
    author: {
        type: String,
        required: [true, "Author name is required"],
        trim: true
    },
    category: {
        type: String,
        required: [true, "Book category is required"],
        enum: ["Science", "Math", "History", "English", "Art", "Other"]
    },
    studyYear: {
        type: String,
        required: [true, "Please specify the study year this book is for"],
        enum: ["KG1", "KG2", "1ST", "2ND", "3RD", "4TH", "5TH"]
    },
    pdfUrl:{
        public_id: { type: String },
        secure_url: { type: String }
    },
    totalChapters: {
        type: Number,
        required: true,
        min: 1
    },
    totalPages: {
        type: Number,
        required: true,
        min: 1
    },
    chapters: [
        {
            name: { type: String, required: true },
            pages: { type: Number, required: true }
        }
    ],
    coverImage: {
        public_id: { type: String },
        secure_url: { type: String }
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Book = model("Book", bookSchema);
export default Book;