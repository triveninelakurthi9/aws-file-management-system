const File = require("../models/File");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const {
    DeleteObjectCommand,
    GetObjectCommand
} = require("@aws-sdk/client-s3");
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
    console.error("Rename Error:", error);

    res.status(500).json({
        success: false,
        message: error.message
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
const downloadFile = async (req, res) => {
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

        const command = new GetObjectCommand({
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: file.s3Key
        });

        const url = await getSignedUrl(s3, command, {
            expiresIn: 300
        });

        res.status(200).json({
            success: true,
            downloadUrl: url
        });

    } catch (error) {
        console.log(error);

        res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
};
const renameFile = async (req, res) => {
    try {
        console.log("BODY:", req.body);
        console.log("PARAMS:", req.params);
        console.log("USER:", req.user);
        console.log(req.headers);
        console.log(req.body);
        const { originalName } = req.body;

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

        file.originalName = originalName;

        await file.save();

        res.status(200).json({
            success: true,
            message: "File renamed successfully",
            file
        });

    } catch (error) {
        console.error("========== RENAME ERROR ==========");
        console.error(error);
        console.error("==================================");

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
const searchFiles = async (req, res) => {
    try {
        const { query } = req.query;

        const files = await File.find({
            user: req.user.id,
            originalName: { $regex: query, $options: "i" }
        });

        res.status(200).json({
            success: true,
            count: files.length,
            files
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
};
const getStorageUsage = async (req, res) => {
    try {
        const files = await File.find({
            user: req.user.id
        });

        const totalFiles = files.length;

        const storageUsed = files.reduce((total, file) => {
            return total + file.fileSize;
        }, 0);

        const storageUsedMB = (storageUsed / (1024 * 1024)).toFixed(2);

        res.status(200).json({
            success: true,
            totalFiles,
            storageUsed,
            storageUsedMB
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
};
module.exports = {
    uploadFile,
    getMyFiles,
    deleteFile,
    downloadFile,
    renameFile,
    searchFiles,
    getStorageUsage
};