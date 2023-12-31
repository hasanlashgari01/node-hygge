const { isValidObjectId } = require("mongoose");
const path = require("path");
const { productValidationSchema, searchProductValidationSchema } = require("../validators/productValidator");
const productModel = require("../models/product");
const commentModel = require("../models/comment");
const userModel = require("../models/user");

exports.AllProducts = async (req, res, next) => {
    try {
        const products = await productModel.find({}, "-__v");

        if (products.length == 0) throw { ok: false, status: 404, success: false, message: "There is no product" };

        res.status(200).json(products);
    } catch (error) {
        next(error);
    }
};

exports.create = async (req, res, next) => {
    try {
        let { title, description, priceOriginal, ability, category } = req.body;
        let image = req.file;

        if (!isValidObjectId(category)) throw { status: 400, message: "Category id is not valid" };
        await productValidationSchema.validateAsync({ title, description, priceOriginal, ability });

        const product = await productModel.create({
            title,
            description,
            priceOriginal,
            ability,
            category,
            productImage: image.filename,
        });

        res.json({ product });
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

exports.likeProduct = async (req, res, next) => {
    try {
        let { productId, userId } = req.params;

        if (!isValidObjectId(productId) && !isValidObjectId(userId))
            throw { message: "Product ID or User ID is not valid" };

        await productModel.findByIdAndUpdate(productId, { $set: { isLike: true } });
        await userModel.findByIdAndUpdate(userId, { $push: { likes: productId } });

        res.json({ status: 200, message: "The product was liked by the user" });
    } catch (err) {
        next(err);
    }
};

exports.unlikeProduct = async (req, res, next) => {
    try {
        let { productId, userId } = req.params;

        if (!isValidObjectId(productId) && !isValidObjectId(userId))
            throw { message: "Product ID or User ID is not valid" };

        await productModel.findByIdAndUpdate(productId, { $set: { isLike: false } });
        await userModel.findByIdAndUpdate(userId, { $pull: { likes: productId } });

        res.json({ status: 200, message: "The product was removed from the list of likes" });
    } catch (err) {
        next(err);
    }
};

exports.addBookmarkProduct = async (req, res, next) => {
    try {
        let { productId, userId } = req.params;

        if (!isValidObjectId(productId) && !isValidObjectId(userId))
            throw { message: "Product ID or User ID is not valid" };

        await productModel.findByIdAndUpdate(productId, { $set: { isBookmark: true } });
        await userModel.findByIdAndUpdate(userId, { $push: { bookmarks: productId } });

        res.json({ status: 200, message: "The product was bookmarked by the user" });
    } catch (err) {
        next(err);
    }
};

exports.removeBookmarkProduct = async (req, res, next) => {
    try {
        let { productId, userId } = req.params;

        if (!isValidObjectId(productId) && !isValidObjectId(userId))
            throw { message: "Product ID or User ID is not valid" };

        await productModel.findByIdAndUpdate(productId, { $set: { isBookmark: false } });
        await userModel.findByIdAndUpdate(userId, { $pull: { bookmarks: productId } });

        res.json({ status: 200, message: "The product was removed from the list of bookmarks" });
    } catch (err) {
        next(err);
    }
};

exports.searchProduct = async (req, res, next) => {
    try {
        let search = req.body.search;

        await searchProductValidationSchema.validateAsync({ search });

        const products = await productModel.find({ title: { $regex: search, $options: "i" } });

        if (products == 0) throw { ok: true, status: 404, message: "Product not found with this title" };

        res.json({ products });
    } catch (err) {
        next(err);
    }
};

exports.getCover = async (req, res, next) => {
    try {
        let { fileName } = req.params;
        if (!fileName) throw { status: 404, message: "File not found" };

        res.sendFile(path.join(__dirname, "..", "public", "products", "covers", fileName));
    } catch (error) {
        next(error);
    }
};
