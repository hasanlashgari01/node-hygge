const { Router } = require("express");
const { checkLogin, isAdmin } = require("../middleware/authLogin");
const adminController = require("../controllers/admin");

const adminRouter = Router();

adminRouter.use(checkLogin);
adminRouter.get("/", isAdmin, adminController.AllAdmins);
adminRouter.get("/set-user/:adminId", isAdmin, adminController.changeRoleToUser);

module.exports = adminRouter;
