const router = require("express").Router();
const adminController = require("../controllers/adminController");
const auth = require("../middleware/auth");
const authAdmin = require("../middleware/authAdmin");
const { uploadImagePost } = require("../middleware/uploadImagePost");

router.post("/register", adminController.register);

router.post("/activation", adminController.activateEmail);

router.post("/login", adminController.login);

router.post("/refresh_token", adminController.getAccessToken);

router.post("/forgot", adminController.forgotPassword);

router.post("/reset", auth, adminController.resetPassword);

router.get("/infor", auth, adminController.getUserInfor);

router.get("/all_user", auth, authAdmin, adminController.getAllUsers);

router.get("/all_trainer", auth, authAdmin, adminController.getAllTrainer);

router.get("/logout", adminController.logout);

router.patch("/update_infor", auth, adminController.updateInfor);

// router.patch('/update_role/:id', auth, authAdmin, adminController.updateUserRole)

router.delete("/delete_user/:id", auth, authAdmin, adminController.deleteUser);

router.delete(
    "/delete_trainer/:id",
    auth,
    authAdmin,
    adminController.deleteTrainer
);

router.post("/add_category", auth, authAdmin, adminController.addCategory);

router.put(
    "/update_category/:id",
    auth,
    authAdmin,
    adminController.updateCategory
);

router.delete(
    "/delete_category/:id",
    auth,
    authAdmin,
    adminController.deleteCategory
);

router.get("/get_allCate", auth, authAdmin, adminController.getAllCategory);

router.post("/add_discovery", auth, authAdmin, adminController.addDiscovery);

router.post(
    "/add_newPost",
    auth,
    authAdmin,
    uploadImagePost.array("file", 12),
    adminController.addPostIntoDis
);
router.post("/add_BMI/", auth, authAdmin, adminController.addBMI);

router.get("/dashboard/", auth, authAdmin, adminController.dashboard);

module.exports = router;