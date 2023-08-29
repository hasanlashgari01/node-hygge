const { Router } = require("express");
const { checkLogin, isAdmin } = require("../middleware/authLogin");
const uploadProduct = require("../util/uploaderProduct");

const productController = require("../controllers/product");

const productRouter = Router();

productRouter
    .route("/")
    .get(productController.AllProducts)
    .post(uploadProduct.single("image"), checkLogin, isAdmin, productController.create);
productRouter.get("/cover/:fileName", productController.getCover);
productRouter.get("/like/:productId/:userId", checkLogin, productController.likeProduct);
productRouter.get("/unlike/:productId/:userId", checkLogin, productController.unlikeProduct);
productRouter.get("/bookmark/:productId/:userId", checkLogin, productController.addBookmarkProduct);
productRouter.get("/remove-bookmark/:productId/:userId", checkLogin, productController.removeBookmarkProduct);
productRouter.get("/search", productController.searchProduct);
productRouter
    .route("/:productId")
    .get(productController.getProduct)
    .delete(checkLogin, isAdmin, productController.remove);

module.exports = productRouter;
