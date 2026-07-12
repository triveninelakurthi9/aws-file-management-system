const mongoose = require("mongoose");

const fileSchema = new mongoose.Schema(
{
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    fileName: {
        type: String,
        required: true
    },
    originalName: {
        type: String,
        required: true
    },
    fileType: {
        type: String,
        required: true
    },
    fileSize: {
        type: Number,
        required: true
    },
    s3Key: {
        type: String,
        required: true
    },
    fileUrl: {
        type: String,
        required: true
    }
},
{
    timestamps: true
});

module.exports = mongoose.model("File", fileSchema);