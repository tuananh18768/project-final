const Users = require('../models/userAuth')
const Tutorial = require('../models/tutorialModel')
const RegisterCourese = require('../models/registerCourseModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const sendMail = require('./sendMail')
const Courses = require('../models/coursesModel')
const Categories = require('../models/catergories')
const TrainerModel = require('../models/tranierAuth')
const RegisterModel = require('../models/registerCourseModel')
const Discovery = require('../models/discovery')
const NewPostDiscovery = require('../models/newPostDiscovery')

const { CLIENT_URL } = process.env

const userController = {
    register: async(req, res) => {
        try {
            const { name, email, password } = req.body

            if (!name || !email || !password) {
                return res.status(400).json({ msg: "Please enter full fill!!" })
            }
            if (!validateEmail(email)) {
                return res.status(400).json({ msg: "Invalid email!!!" })
            }
            const userEmail = await Users.findOne({ email })
            if (userEmail) return res.status(400).json({ msg: "Email already does not exist!" })

            if (password.length < 6) {
                return res.status(400).json({ msg: "Password must be at lest 6 characters!" })
            }

            const passwordHash = await bcrypt.hash(password, 12)

            const newUser = {
                name,
                email,
                password: passwordHash
            }

            const activation_token = createActivationToken(newUser)
            const url = `${CLIENT_URL}/user/activate/${activation_token}`

            sendMail(email, url, "Verify your email address")
            res.json({ msg: "Register success! Please activate your email to start" })
        } catch (error) {
            return res.status(500).json({ msg: error.message })
        }
    },
    activateEmail: async(req, res) => {
        try {
            const { activation_token } = req.body
            const user = jwt.verify(activation_token, process.env.ACTIVATION_TOKEN_SECRET)
            const { name, email, password } = user
            const check = await Users.findOne({ email })
            if (check) return res.status(400).json({ msg: "This email is alread exits." })

            const newUser = new Users({
                name,
                email,
                password
            })
            await newUser.save()
            res.json({ msg: "Account has been activated!" })

        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    login: async(req, res) => {
        try {
            const { email, password } = req.body
            const user = await Users.findOne({ email })
            if (!user) return res.status(400).json({ msg: "This email does not exist." })

            const isMatch = await bcrypt.compare(password, user.password)
            if (!isMatch) return res.status(400).json({ msg: "Password is incorrect." })

            const refresh_token = createRefreshToken({ id: user._id })
            res.cookie('refreshtoken', refresh_token, {
                httpOnly: true,
                path: '/user/refresh_token',
                maxAge: 7 * 24 * 60 * 60 * 100 //7day
            })
            res.json({ msg: "Login success" })
        } catch (error) {
            return res.status(500).json({ msg: err.message })
        }
    },
    getAccessToken: (req, res) => {
        try {
            const rf_token = req.cookies.refreshtoken
            if (!rf_token) return res.status(500).json({ msg: "Please login now" })

            jwt.verify(rf_token, process.env.REFERSH_TOKEN_SECRET, (err, user) => {
                if (err) return res.status(500).json({ msg: "Please login now" })

                const access_token = createAccessToken({ id: user.id })
                res.json({ access_token })
            })
        } catch (error) {
            return res.status(500).json({ msg: error.message })
        }
    },
    forgotPassword: async(req, res) => {
        try {
            const { email } = req.body
            const user = await Users.findOne({ email })
            if (!user) return res.status(400).json({ msg: "This email dose not exits." })

            const access_token = createAccessToken({ id: user.id })
            const url = `${CLIENT_URL}/user/reset/${access_token}`

            sendMail(email, url, "Reset your password")
            res.json({ msg: "Re-send the password, please check your email." })
        } catch {
            return res.status(500).json({ msg: err.message })
        }
    },
    resetPassword: async(req, res) => {
        try {
            const { password } = req.body
            const passwordHash = await bcrypt.hash(password, 12)

            await Users.findOneAndUpdate({ _id: req.user.id }, {
                password: passwordHash
            })
            res.json({ msg: "Password successfully changed!" })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    getUserInfor: async(req, res) => {
        try {
            const user = await Users.findById(req.user.id).select('-password')
            res.json(user)
        } catch (error) {
            return res.status(500).json({ msg: error.message })
        }
    },
    logout: async(req, res) => {
        try {
            res.clearCookie('refreshtoken', { path: '/user/refresh_token' })
            return res.json({ msg: 'Logout!' })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    updateInfor: async(req, res) => {
        try {
            const { name, avatar } = req.body
            const userParams = await Users.findById(req.user.id).select('-password')
            await Users.findByIdAndUpdate({ _id: req.user.id }, {
                name: name || userParams.name,
                avatar: avatar || userParams.avatar
            })
            res.json({ msg: "Update successfully" })
        } catch (error) {
            return res.status(500).json({ msg: error.message })
        }
    },
    registerCourses: async(req, res) => {
        try {
            const tutorialParams = await Tutorial.findOne({ linkName: req.params.name })

            const newRigister = new RegisterCourese({
                users: req.user.id,
                courses: tutorialParams._id
            })
            const oldRisger = await RegisterCourese.findOne({ users: req.user.id, courses: tutorialParams._id })
                // const 
            if (!oldRisger) {
                newRigister.save()
            } else {
                return res.status(200).json({ msg: "Tiep tuc hoc" })
            }
            res.status(200).json({ msg: "Register courses successfully" })
        } catch (error) {
            res.status(500).json({ msg: error.message })
        }
    },
    checkRegister: async(req, res) => {
        try {
            const checkRegister = await RegisterModel.find()
            res.status(200).json(checkRegister)
        } catch (error) {
            return res.status(500).json({ msg: error.message })
        }
    },
    viewCourses: async(req, res) => {
        try {
            const tutorialParams = await Tutorial.findOne({ linkName: req.user.name })
            const courses = await Courses.findOne({ tutorials: tutorialParams._id })
            const ids = req.query.id
            res.status(200).json(courses)
        } catch (error) {
            res.status(500).json({ msg: error.message })
        }
    },
    checkCoursesDone: async(req, res) => {
        try {
            const tutorialParams = await Tutorial.findOne({ linkName: req.user.name })
            const courses = await Courses.findOne({ tutorials: tutorialParams._id })
            await Courses.findByIdAndUpdate({ _id: courses._id }, {
                status: true,
            })
            res.status(200).json('check done')
        } catch (error) {
            res.status(500).json({ msg: error.message })
        }
    },
    getAllCate: async(req, res) => {
        try {
            const data = await Categories.find()
            res.status(200).json(data)
        } catch (error) {
            return res.status(500).json({ msg: error.message })
        }
    },
    getAllTutorial: async(req, res) => {
        try {
            const data = await Tutorial.find()
            res.status(200).json(data)
        } catch (error) {
            return res.status(500).json({ msg: error.message })
        }
    },
    getllCourses: async(req, res) => {
        try {
            const courses = await Courses.find()
            let arrayCouses = []
            for (let item of courses) {
                if (item.tutorials.toString() === req.params.id) {
                    arrayCouses.push(item)
                }
            }
            let arrayCousesTutorial = []
            arrayCousesTutorial = await Promise.all(arrayCouses.map(async(current) => {
                const tutorial = await Tutorial.findById(current.tutorials)
                return {...current._doc, tutorials: tutorial.name }
            }))
            res.json(arrayCousesTutorial)
        } catch (error) {
            return res.status(500).json({ msg: error.message })
        }
    },
    doneCourses: async(req, res) => {
        try {
            const couses = await Courses.findById(req.params.id)
            couses.userLearn.push({ users: req.user.id })
            await couses.save()
            res.json(couses)
        } catch (error) {
            return res.status(500).json({ msg: error.message })
        }
    },
    addComment: async(req, res) => {
        try {
            const user = await Users.findById(req.user.id).select('-password')
            const postComment = await Tutorial.findOne({ linkName: req.params.name })
            const userAuthor = await TrainerModel.findById(postComment.trainer_id)
            const newComment = {
                text: req.body.text,
                name: user.name,
                avatar: user.avatar,
                users: user.id,
            }

            postComment.commnets.unshift(newComment)
            await postComment.save()
                // const url = `${CLIENT_URL}/detail_idea/${req.params.id}`
                // sendMail(userAuthor.email, url, "Come to post")
            res.status(200).json(postComment)
        } catch (error) {
            return res.status(500).json({ msg: error.message })
        }
    },
    addListLike: async(req, res) => {
        try {
            const params = await Tutorial.findOne({ linkName: req.params.name })
            const user = await Users.findById(req.user.id)
            const likesAble = user.heart.findIndex(like => like.toString() === params._id.toString())
            if (likesAble !== -1) {
                user.heart.splice(likesAble, 1)
                user.save()
                return res.json({ msg: 'Remove like successfully' })
            }

            user.heart.push(params._id)
            await user.save()
            return res.json({ msg: 'Like successfully' })
        } catch (error) {
            return res.status(500).json({ msg: error.message })
        }
    },
    listLikeTutorial: async(req, res) => {
        try {
            const user = await Users.findById(req.user.id);
            const userListLike = user.heart.map(e => e)
            res.status(200).json(userListLike)
        } catch (error) {
            return res.status(500).json({ msg: error.message })
        }
    },
    addLikeDiscovery: async(req, res) => {
        try {
            const params = await Discovery.findById(req.params.id)
            const user = await Users.findById(req.user.id)
            const likesAble = params.likes_user.findIndex(like => like.toString() === user._id.toString())
            if (likesAble !== -1) {
                params.likes_user.splice(likesAble, 1)
                params.save()
                return res.json({ msg: 'Remove discovery successfully' })
            }

            params.likes_user.push(user._id)
            await params.save()
            return res.json({ msg: 'add discovery successfully' })
        } catch (error) {
            return res.status(500).json({ msg: error.message })
        }
    },
    listTopicDiscovery: async(req, res) => {
        try {
            const discovery = await Discovery.find({ likes_user: req.user.id })
            const allTopic = await NewPostDiscovery.find({ discovery: discovery.map(e => e._id) })
            res.json(allTopic)
        } catch (error) {
            res.status(500).json({ msg: error.message })
        }
    },
    checkBody: async(req, res) => {
        try {
            const { weight, height } = req.body
            let message = ''
            let chiSoBMI = weight / (height * height);
            if (chiSoBMI < 18) {
                message = "Bạn là người gầy!";
            } else if (chiSoBMI <= 24.9) {
                message = "Bạn là người bình thường";
            } else if (chiSoBMI <= 29.9) {
                message = "Bạn bị béo phì độ I";
            } else if (chiSoBMI <= 34.9) {
                message = "Bạn bị béo phì độ II";
            } else {
                message = "Bạn bị béo phì độ III";
            }
            res.status(200).json(message)
        } catch (error) {
            res.status(500).json({ msg: error.message })
        }
    }
}



const validateEmail = (email) => {
    return String(email).toLowerCase().match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};
const createActivationToken = (payload) => {
    return jwt.sign(payload, process.env.ACTIVATION_TOKEN_SECRET, { expiresIn: '5m' })
}
const createAccessToken = (payload) => {
    return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' })
}
const createRefreshToken = (payload) => {
    return jwt.sign(payload, process.env.REFERSH_TOKEN_SECRET, { expiresIn: '7d' })
}
module.exports = userController