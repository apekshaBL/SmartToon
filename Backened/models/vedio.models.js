import { Schema, model } from "mongoose";

const videoRequestSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    bookId: {
        type: Schema.Types.ObjectId,
        ref: "Book",
        required: true
    },
    chapter: {
        type: String,
        required: [true, "Chapter name or number is required"]
    },
    page: {
        type: Number,
        required: [true, "Page number is required"]
    },
    extractedText: {
        type: String,
        required: [true, "Extracted text from the PDF is required"]
    },
    status: {
        type: String,
        enum: ["pending", "processing", "completed", "failed"],
        default: "pending"
    },
    video: {
        public_id: { type: String }, 
        secure_url: { type: String }
    },
    errorMessage: {
        type: String,
        default: null
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    completedAt: {
        type: Date // Time when the video processing is completed
    }
});

const VideoRequest = model("VideoRequest", videoRequestSchema);
export default VideoRequest;