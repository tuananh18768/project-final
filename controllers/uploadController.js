const cloudinary = require('cloudinary')
const fs = require('fs')
    // const ManyFileModel = require('../models/fileIdea')

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_SECRET
})
const uploadAvatar = (req, res) => {
    try {
        const file = req.files.file;

        cloudinary.v2.uploader.upload(file.tempFilePath, {
            folder: 'avatar',
            width: 150,
            height: 150,
            crop: "fill"
        }, async(err, result) => {
            if (err) throw err;

            removeImg(file.tempFilePath)

            res.json({ url: result.secure_url })
        })

    } catch (err) {
        return res.status(500).json({ msg: err.message })
    }
}
const uploadIdea = async(req, res, next) => {
    try {
        const file = req.files
        for (let item in file) {
            console.log(file[item])
            const newFile = new ManyFileModel({
                fileName: req.file[item].originalname,
                filePath: req.file[item].path,
                fileType: req.file[item].mimetype,
                fileSize: fileSizeFormatter(req.file[item].size, 2) //0.00
            })
            console.log(file[item].originalname);
            await newFile.save()
        }
        // if (file.length == 0) {
        //     return res.status(400).json({ msg: 'Please upload a file' })
        // }
        // for (let item of file) {
        //     if (item.mimetype !== 'application/pdf' && item.mimetype !== 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
        //         removeImg("public/uploads/" + item.filename);
        //         return res.status(404).json({ msg: "file is not format" });
        //     }
        // }
        res.send(file)
    } catch (error) {
        return res.status(500).json({ msg: error.message })
    }
}
const removeImg = function(patchFile) {
    fs.unlink(patchFile, err => {
        if (err) throw err;
    })
}
const fileSizeFormatter = (bytes, decimal) => {
    if (bytes === 0) {
        return '0 Bytes'
    }
    const dm = decimal || 2
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'YB', 'ZB']
    const index = Math.floor(Math.log(bytes) / Math.log(1000))
    return parseFloat((bytes / Math.pow(1000, index)).toFixed(dm)) + '-' + sizes[index]
}
module.exports = {
    uploadAvatar,
    uploadIdea
}