const { isValidObjectId } = require("mongoose");
const { productValidationSchema } = require("../validators/productValidator");
const productModel = require("../models/product");
const categoriesModel = require("../models/category");
const commentModel = require("../models/comment");

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
        let { title, description, priceOriginal, ability, category } = req.body;

        if (!isValidObjectId(category)) throw { status: 400, message: "Category id is not valid" };
        await productValidationSchema.validateAsync({ title, description, priceOriginal, ability });

        const isCategory = await categoriesModel.findOne({ _id: category });
        if (!isCategory) throw { status: 404, message: "Category not found" };

        const product = await productModel.create({ title, description, priceOriginal, ability, category });

        res.json({ ok: true, status: 200, success: true, message: "New product create successfully", product });
    } catch (error) {
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

        const product = await productModel.findOne({ _id: productId }, "-__v").lean();
        const comments = await commentModel.find({ product: product._id }, "body author").lean();

        if (!product) throw { status: 404, message: "Product not found" };

        res.json({ ...product, comments });
    } catch (error) {
        next(error);
    }
};
