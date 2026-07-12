const File = require("../models/File");
const { DeleteObjectCommand } = require("@aws-sdk/client-s3");
const uploadFile = async (req, res) => {
    try {

        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "No file uploaded"
            });
        }

        const file = await File.create({
            user: req.user.id,
            fileName: req.file.key,
            originalName: req.file.originalname,
            fileType: req.file.mimetype,
            fileSize: req.file.size,
            s3Key: req.file.key,
            fileUrl: req.file.location
        });

        res.status(200).json({
            success: true,
            message: "File uploaded successfully",
            file
        });

    } catch (error) {
        console.log(error);

        res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
};





const getMyFiles = async (req, res) => {
    try {

        const files = await File.find({
            user: req.user.id
        }).sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: files.length,
            files
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
};
module.exports = {
    uploadFile,
    getMyFiles
};