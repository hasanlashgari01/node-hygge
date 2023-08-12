const { Router } = require("express");
const { checkLogin, isAdmin } = require("../middleware/authLogin");

const productController = require("../controllers/product");

const productRouter = Router();

productRouter.route("/").get(productController.AllProducts).post(checkLogin, isAdmin, productController.create);
productRouter
    .route("/:productId")
    .get(productController.getProduct)
    .delete(checkLogin, isAdmin, productController.remove);
productRouter.get("/like/:productId/:userId", checkLogin, productController.likeProduct);
productRouter.get("/unlike/:productId/:userId", checkLogin, productController.unlikeProduct);

module.exports = productRouter;
