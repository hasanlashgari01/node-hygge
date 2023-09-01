const { Router } = require("express");
const categoryController = require("../controllers/category");
const { checkLogin, isAdmin } = require("../middleware/authLogin");
const uploadFile = require("../util/multerStorage");

const categoryRouter = Router();

categoryRouter
    .route("/")
    .get(categoryController.AllCategories)
    .post(uploadFile.single("icon"), checkLogin, isAdmin, categoryController.create);
categoryRouter.get("/icon/:fileName", categoryController.getIcon);
categoryRouter.delete("/deleteMany", checkLogin, isAdmin, categoryController.removeMany);
categoryRouter.delete("/:id", checkLogin, isAdmin, categoryController.remove);
categoryRouter.get("/:shortName", categoryController.getCategory);

module.exports = categoryRouter;
