require('dotenv').config()
const Admin = require('../models/adminAuth')
const Users = require('../models/userAuth')
const Trainers = require('../models/tranierAuth')
const Category = require('../models/catergories')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const sendMail = require('./sendMail')
const Categories = require('../models/catergories')


const { CLIENT_URL } = process.env
const userController = {
    register: async(req, res) => {
        try {
            const { name, email, password } = req.body
            if (!name || !email || !password) {
                return res.status(400).json({ msg: "Please fill in all fields." })
            }
            if (!validateEmail(email)) {
                return res.status(400).json({ msg: "Invalid email." })
            }
            const user = await Admin.findOne({ email })
            if (user) return res.status(400).json({ msg: "This email already exists." })
            if (password.length < 6) {
                return res.status(400).json({ msg: "Password must be at least 6 characters." })
            }
            const passwordHash = await bcrypt.hash(password, 12)

            const newUser = {
                name,
                email,
                password: passwordHash
            }
            const activation_token = createAtivationToken(newUser)
            const url = `${CLIENT_URL}/admin/activate/${activation_token}`
            sendMail(email, url, "Verify your email address")
            res.json({ msg: "Register Success! Please activate your email to start." })
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    activateEmail: async(req, res) => {
        try {
            const { activation_token } = req.body
            const user = jwt.verify(activation_token, process.env.ACTIVATION_TOKEN_SECRET)
            const { name, email, password } = user
            const check = await Admin.findOne({ email })
            if (check) return res.status(400).json({ msg: "This email is alread exits." })

            const newUser = new Admin({
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
            const user = await Admin.findOne({ email })
            if (!user) return res.status(400).json({ msg: "This email does not exist." })

            const isMatch = await bcrypt.compare(password, user.password)
            if (!isMatch) return res.status(400).json({ msg: "Password is incorrect." })

            const refresh_token = createRefreshToken({ id: user._id })
            res.cookie('refreshtoken', refresh_token, {
                httpOnly: true,
                path: '/admin/refresh_token',
                maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
            })
            res.json({ msg: "Login success!" })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    getAccessToken: (req, res) => {
        try {
            const rf_token = req.cookies.refreshtoken
            if (!rf_token) return res.status(400).json({ msg: "Please login now!" })

            jwt.verify(rf_token, process.env.REFERSH_TOKEN_SECRET, (err, user) => {
                if (err) return res.status(400).json({ msg: "Please login now!" })

                const access_token = createAccessToken({ id: user.id })
                res.json({ access_token })
            })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    forgotPassword: async(req, res) => {
        try {
            const { email } = req.body
            const user = await Admin.findOne({ email })
            if (!user) return res.status(400).json({ msg: "This email dose not exits." })

            const access_token = createAccessToken({ id: user.id })
            const url = `${CLIENT_URL}/user/reset/${access_token}`

            sendMail(email, url, "Reset your password")
            res.json({ msg: "Re-send the password, please check your email." })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    resetPassword: async(req, res) => {
        try {
            const { password } = req.body
            const passwordHash = await bcrypt.hash(password, 12)

            await Admin.findOneAndUpdate({ _id: req.user.id }, {
                password: passwordHash
            })
            res.json({ msg: "Password successfully changed!" })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    getUserInfor: async(req, res) => {
        try {
            const user = await Admin.findById(req.user.id).select('-password')
            res.json(user)
        } catch (error) {
            return res.status(500).json({ msg: error.message })
        }
    },
    getAllUsers: async(req, res) => {
        try {
            const users = await Users.find().select('-password')
            res.json(users)
        } catch (error) {
            return res.status(500).json({ msg: error.message })
        }
    },
    getAllTrainer: async(req, res) => {
        try {
            const trainers = await Trainers.find().select('-password')
            res.json(trainers)
        } catch (err) {
            return res.status(500).json({ msg: err.message })
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
            const user = await Admin.findById(req.user.id).select('-password')
            await Admin.findByIdAndUpdate({ _id: req.user.id }, {
                name,
                avatar: avatar || user.avatar
            })
            res.json({ msg: "Update successfully" })
        } catch (error) {
            return res.status(500).json({ msg: error.message })
        }
    },
    updateUserRole: async(req, res) => {
        try {
            const { role } = req.body
            await Users.findByIdAndUpdate({ _id: req.params.id }, {
                role
            })
            res.json({ msg: "Update successfully" })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    deleteUser: async(req, res) => {
        try {
            await Users.findByIdAndDelete(req.params.id)
            res.json({ msg: "Delete user successfully" })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    deleteTrainer: async(req, res) => {
        try {
            await Trainers.findByIdAndDelete(req.params.id)
            res.json({ msg: "Delete trainer successfully" })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    addCategory: async(req, res) => {
        try {
            const { name } = req.body
            const category = await Categories.findOne({ name: name })

            if (category) return res.status(400).json({ msg: "This category dose already." })

            const newCate = new Categories({
                name,
                manger_cate: req.user.id,
            })
            await newCate.save()
            res.json({ msg: "Categories add successfully" })
        } catch (error) {
            return res.status(500).json({ msg: error.message })
        }
    },
    updateCategory: async(req, res) => {
        try {
            const { name } = req.body
            const category = await Categories.findOne({ name: name })

            if (category) return res.status(400).json({ msg: "This category dose already." })
            await Categories.findByIdAndUpdate({ _id: req.params.id }, {
                name,
            })
            res.json({ msg: "Update successfully" })
        } catch (error) {
            return res.status(500).json({ msg: error.message })
        }
    },
    deleteCategory: async(req, res) => {
        try {
            await Categories.findByIdAndRemove(req.params.id)
                // const doc = await DocumentIdea.find()
                // for (let item of doc) {
                //     if (item.category.toString() === req.params.id) {
                //         console.log(item);
                //         await DocumentIdea.findByIdAndDelete(item._id)
                //     }
                // }
            res.status(200).json({ msg: 'Delete category successfully' })
        } catch (error) {
            return res.status(500).json({ msg: error.message })
        }
    },
    getAllCategory: async(req, res) => {
        try {
            const data = await Categories.find()
            res.status(200).json(data)
        } catch (error) {
            return res.status(500).json({ msg: error.message })
        }
    },
    dashboard: async(req, res, ) => {
        try {
            const user = await Users.find()
            const trainer = await Trainers.find()
            const category = await Category.find()


            // const allStaff = []
            // for (let item of user) {
            //     if (item.role === 0) {
            //         allStaff.push(item)
            //     }
            // }
            const dashboard = {
                user: user,
                trainer: trainer,
                category: category
            }
            res.status(200).json(dashboard)
        } catch (error) {
            return res.status(500).json({ msg: error.message })
        }
    },

}
const validateEmail = (email) => {
    return email.match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};
const createAtivationToken = (payload) => {
    return jwt.sign(payload, process.env.ACTIVATION_TOKEN_SECRET, { expiresIn: '5m' })
}
const createAccessToken = (payload) => {
    return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' })
}
const createRefreshToken = (payload) => {
    return jwt.sign(payload, process.env.REFERSH_TOKEN_SECRET, { expiresIn: '7d' })
}


module.exports = userController