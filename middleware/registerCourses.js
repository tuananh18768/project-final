const Tutorial = require('../models/tutorialModel')
const RegisterCourese = require('../models/registerCourseModel')

const registerCourses = async(req, res, next) => {
    try {
        // const tutorialParams = await Tutorial.findById(req.params.id)
        const newRigister = new RegisterCourese({
            users: req.user.id,
            courses: req.params.id
        })
        newRigister.save()
        next()
    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
}
module.exports = registerCourses