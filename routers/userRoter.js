const router = require("express").Router();
const userController = require("../controllers/userController");
const auth = require("../middleware/auth");
const registerCourses = require("../middleware/registerCourses");
// const authAdmin = require('../middleware/authAdmin')

router.post("/register", userController.register);

router.post("/activation", userController.activateEmail);

router.post("/login", userController.login);

router.post("/refresh_token", userController.getAccessToken);

router.post("/forgot", userController.forgotPassword);

router.post("/reset", auth, userController.resetPassword);

router.get("/infor", auth, userController.getUserInfor);

router.get("/logout", userController.logout);

router.patch("/update_infor", auth, userController.updateInfor);

router.post("/register_courses/:name", auth, userController.registerCourses);

router.get("/check_register", auth, userController.checkRegister);

router.get("/learning/:name", auth, userController.viewCourses);

router.put("/learning_check/:name", auth, userController.checkCoursesDone);

router.get("/getALl_cate", userController.getAllCate);

router.get("/getObj_cate/:id", userController.getObjCate);

router.get("/getAll_tutorial", userController.getAllTutorial);

router.get(
    "/getAll_tutorial_Login",
    auth,
    userController.getAllTutorialUserLogin
);

router.get("/getAllCourses/:id", auth, userController.getllCourses);

router.put("/done_courses/:id", auth, userController.doneCourses);

router.post("/comment_tutorial/:name", auth, userController.addComment);

router.put("/add_listLike/:id", auth, userController.addListLike);

router.get("/list_like/", auth, userController.listLikeTutorial);

router.get(
    "/list_courses_registed/",
    auth,
    userController.listRegistedTutorial
);

router.put("/add_likeDiscovery/:id", auth, userController.addLikeDiscovery);

router.get("/list_discovery", auth, userController.listDiscovery);

router.get("/add_likeDiscovery", auth, userController.listTopicDiscovery);

router.post("/check_body", auth, userController.checkBody);

module.exports = router;