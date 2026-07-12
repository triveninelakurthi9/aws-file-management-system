const File = require("../models/File");
const { DeleteObjectCommand } = require("@aws-sdk/client-s3");
const s3 = require("../config/s3");
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
const deleteFile = async (req, res) => {
    try {
        const file = await File.findById(req.params.id);

        if (!file) {
            return res.status(404).json({
                success: false,
                message: "File not found"
            });
        }

        if (file.user.toString() !== req.user.id) {
            return res.status(403).json({
                success: false,
                message: "Unauthorized"
            });
        }

        await s3.send(
            new DeleteObjectCommand({
                Bucket: process.env.AWS_BUCKET_NAME,
                Key: file.s3Key
            })
        );

        await File.findByIdAndDelete(req.params.id);

        res.status(200).json({
            success: true,
            message: "File deleted successfully"
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
    getMyFiles,
    deleteFile
};