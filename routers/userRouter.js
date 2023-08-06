const { Router } = require("express");
const { checkLogin, isAdmin } = require("../middleware/authLogin");
const userController = require("../controllers/user");

const userRouter = Router();

userRouter.use(checkLogin);
userRouter.get("/", isAdmin, userController.AllUsers);
userRouter.patch("/", userController.updateUserProfile);
userRouter.delete("/:userId", isAdmin, userController.removeUser);
userRouter.get("/set-admin/:userId", isAdmin, userController.changeRoleToAdmin);

module.exports = userRouter;
