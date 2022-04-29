const cloudinary = require("cloudinary");
const fs = require("fs");
const Trainer = require("../models/tranierAuth");
const User = require("../models/userAuth");

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_SECRET,
});
const uploadAvatar = (req, res) => {
    try {
        const file = req.files.file;

        cloudinary.v2.uploader.upload(
            file.tempFilePath, {
                folder: "avatar",
                width: 150,
                height: 150,
                crop: "fill",
            },
            async(err, result) => {
                if (err) throw err;

                removeImg(file.tempFilePath);

                res.json({ url: result.secure_url });
            }
        );
    } catch (err) {
        return res.status(500).json({ msg: err.message });
    }
};
const uploadIdea = async(req, res, next) => {
    try {
        const file = req.files;
        for (let item in file) {
            console.log(file[item]);
            const newFile = new ManyFileModel({
                fileName: req.file[item].originalname,
                filePath: req.file[item].path,
                fileType: req.file[item].mimetype,
                fileSize: fileSizeFormatter(req.file[item].size, 2), //0.00
            });
            console.log(file[item].originalname);
            await newFile.save();
        }
        res.send(file);
    } catch (error) {
        return res.status(500).json({ msg: error.message });
    }
};
const getAllTrainer = async(req, res) => {
    try {
        const trainer = await Trainer.findById(req.params.trainerId);
        res.status(200).json(trainer);
    } catch (error) {
        res.status(500).json({ msg: error });
    }
};
const getAllUser = async(req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ msg: error });
    }
};

const getFriendFlow = async(req, res) => {
    try {
        const user =
            (await User.findById(req.params.userId)) ||
            (await Trainer.findById(req.params.userId));
        const userFriend = await Promise.all(
            user.followings.map(async(e) => {
                const objUser = (await User.findById(e)) || (await Trainer.findById(e));
                return {
                    ...e._doc,
                    userId: objUser._id,
                    avatarUser: objUser.avatar,
                    nameUser: objUser.name,
                };
            })
        );
        res.status(200).json(userFriend);
    } catch (error) {
        res.status(500).json({ msg: error });
    }
};
const removeImg = function(patchFile) {
    fs.unlink(patchFile, (err) => {
        if (err) throw err;
    });
};
const fileSizeFormatter = (bytes, decimal) => {
    if (bytes === 0) {
        return "0 Bytes";
    }
    const dm = decimal || 2;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "YB", "ZB"];
    const index = Math.floor(Math.log(bytes) / Math.log(1000));
    return (
        parseFloat((bytes / Math.pow(1000, index)).toFixed(dm)) + "-" + sizes[index]
    );
};
module.exports = {
    uploadAvatar,
    uploadIdea,
    getAllTrainer,
    getAllUser,
    getFriendFlow,
};