const { Router } = require("express");
const infosController = require("../controllers/infos");
const { isAdmin, checkLogin } = require("../middleware/authLogin");

const infosRouter = Router();

infosRouter.use(checkLogin, isAdmin);

infosRouter.get("/index", infosController.getInfos);

module.exports = infosRouter;
