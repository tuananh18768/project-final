const router = require('express').Router()
const trainerController = require('../controllers/trainerController')
const auth = require('../middleware/auth')
const authTrainer = require('../middleware/authTrainer')

router.post('/register', trainerController.register)

router.post('/activation', trainerController.activateEmail)

router.post('/login', trainerController.login)

router.post('/refresh_token', trainerController.getAccessToken)

router.post('/forgot', trainerController.forgotPassword)

router.post('/reset', auth, trainerController.resetPassword)

router.get('/infor', auth, trainerController.getUserInfor)

router.get('/logout', trainerController.logout)

router.patch('/update_infor', auth, trainerController.updateInfor)

router.post('/add_toturial', auth, authTrainer, trainerController.addTutorial)

router.put('/update_tutorial/:id', auth, authTrainer, trainerController.updateTutorial)

router.get('/getAll_tutorial', auth, authTrainer, trainerController.getAllTutorial)

router.delete('/delete_tutorial/:id', auth, authTrainer, trainerController.deleteTutorial)

router.post('/add_courses/:id', auth, authTrainer, trainerController.addCourses)

router.put('/update_courses/:id', auth, authTrainer, trainerController.updateCourses)

router.delete('/delete_courses/:id', auth, authTrainer, trainerController.deleteCourses)

router.get('/getCourses_tutorial/:id', auth, authTrainer, trainerController.getAllCoursesTutorial)

router.get('/getAll_courses', auth, authTrainer, trainerController.getAllCourses)



module.exports = router