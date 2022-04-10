const Trainers = require('../models/tranierAuth')

const authTrainer = async(req, res, next) => {
    try {
        const trainer = await Trainers.findOne({ _id: req.user.id })

        if (trainer.role !== 2)
            return res.status(500).json({ msg: "Trainer resources access denied." })

        next()
    } catch (err) {
        return res.status(500).json({ msg: err.message })
    }
}

module.exports = authTrainer