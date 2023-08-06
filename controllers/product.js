const { isValidObjectId } = require("mongoose");
const { productValidationSchema } = require("../validators/productValidator");
const productModel = require("../models/product");
const categoriesModel = require("../models/category");

exports.AllProducts = async (req, res, next) => {
    try {
        const products = await productModel.find({}, "-__v");

        if (products.length == 0) throw { ok: false, status: 404, success: false, message: "There is no product" };

        res.json(products);
    } catch (error) {
        next(error);
    }
};

exports.create = async (req, res, next) => {
    try {
        let { title, description, priceOriginal, ability, categoryName } = req.body;

        await productValidationSchema.validateAsync({ title, description, priceOriginal, ability });

        const product = await productModel.create({ title, description, priceOriginal, ability, categoryName });
        await categoriesModel.findOneAndUpdate(
            { name: categoryName },
            {
                $push: { products: product._id },
            }
        );

        res.json({ ok: true, status: 200, success: true, message: "New product create successfully", product });
    } catch (error) {
        console.log(error);
        next(error);
    }
};

exports.remove = async (req, res, next) => {
    try {
        let { productId } = req.params;
        if (!isValidObjectId(productId)) throw { status: 422, message: "this id is not valid" };

        const removeProduct = await productModel.deleteOne({ _id: productId });
        if (removeProduct.deletedCount == 0) throw { status: 404, message: "Product not found" };

        res.json({ ok: true, status: 200, success: true, message: "Product deleted successfully" });
    } catch (error) {
        next(error);
    }
};

exports.getProduct = async (req, res, next) => {
    try {
        const { productId } = req.params;
        if (!isValidObjectId(productId)) throw { status: 422, message: "this id is not valid" };

        const product = await productModel.findById(productId, "-__v").populate("comments");
        if (!product) throw { status: 404, message: "Product not found" };

        res.json(product);
    } catch (error) {
        next(error);
    }
};
