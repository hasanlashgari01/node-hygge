const { Router } = require("express");
const { checkLogin, isAdmin } = require("../middleware/authLogin");
const adminController = require("../controllers/admin");
const avatarUploader = require("../util/avatarUploader");

const adminRouter = Router();

adminRouter.get("/avatar/:fileName", adminController.getAvatar);
adminRouter.use(checkLogin, isAdmin);
adminRouter
    .route("/")
    .get(adminController.AllAdmins)
    .put(avatarUploader.single("avatar"), adminController.uploadAvatar);
adminRouter.get("/set-user/:adminId", adminController.changeRoleToUser);

module.exports = adminRouter;
