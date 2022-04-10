const router = require('express').Router()
const userController = require('../controllers/userController')
const auth = require('../middleware/auth')
const registerCourses = require('../middleware/registerCourses')
    // const authAdmin = require('../middleware/authAdmin')

router.post('/register', userController.register)

router.post('/activation', userController.activateEmail)

router.post('/login', userController.login)

router.post('/refresh_token', userController.getAccessToken)

router.post('/forgot', userController.forgotPassword)

router.post('/reset', auth, userController.resetPassword)

router.get('/infor', auth, userController.getUserInfor)

router.get('/logout', userController.logout)

router.patch('/update_infor', auth, userController.updateInfor)

router.post('/register_courses/:name', auth, userController.registerCourses)

router.get('/check_register', auth, userController.checkRegister)

router.get('/learning/:name', auth, userController.viewCourses)

router.put('/learning_check/:name', auth, userController.checkCoursesDone)

router.get('/getALl_cate', userController.getAllCate)

router.get('/getAll_tutorial', userController.getAllTutorial)

router.get('/getAllCourses/:id', auth, userController.getllCourses)

router.put('/done_courses/:id', auth, userController.doneCourses)

router.post('/comment_tutorial/:name', auth, userController.addComment)

module.exports = router