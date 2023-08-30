const { Router } = require("express");
const { checkLogin, isAdmin } = require("../middleware/authLogin");
const userController = require("../controllers/user");
const avatarUploader = require("../util/avatarUploader");

const userRouter = Router();

userRouter.use(checkLogin);
userRouter
    .route("/")
    .get(isAdmin, userController.AllUsers)
    .put(avatarUploader.single("avatar"), userController.uploadAvatar);
userRouter.get("/avatar/:fileName", userController.getAvatar);

userRouter.delete("/:userId", isAdmin, userController.removeUser);
userRouter.get("/set-admin/:userId", isAdmin, userController.changeRoleToAdmin);

module.exports = userRouter;
