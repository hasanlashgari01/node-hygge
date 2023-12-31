const path = require("path");
const { isValidObjectId } = require("mongoose");
const { categoryValidatationSchema } = require("../validators/categoriesValidator");
const categoriesModel = require("../models/category");
const productModel = require("../models/product");

exports.AllCategories = async (req, res, next) => {
    try {
        const categories = await categoriesModel.find({}).lean();
        if (!categories) throw { message: "Category not found" };

        res.json(categories);
    } catch (error) {
        next(error);
    }
};

exports.getCategory = async (req, res, next) => {
    try {
        const { shortName } = req.params;
        const { price, date } = req.body;

        const category = await categoriesModel.findOne({ shortName }, "-__v").lean();
        if (!category) throw { ok: false, status: 404, message: "Category not found" };
        const products = await productModel
            .find({ category: category._id })
            .sort({ createdAt: date, priceOriginal: price })
            .lean();

        res.json({ ...category, products });
    } catch (error) {
        next(error);
    }
};

exports.create = async (req, res, next) => {
    try {
        const { title, shortName } = req.body;
        const icon = req.file;

        await categoryValidatationSchema.validateAsync({ title, shortName });

        await categoriesModel.create({ title, shortName, icon: icon.filename });

        res.json({ ok: true, status: 201, success: true, message: "Category created was successfully." });
    } catch (error) {
        next(error);
    }
};

exports.remove = async (req, res, next) => {
    try {
        const { id } = req.params;
        if (!isValidObjectId(id)) throw { statuc: 422, message: "This is not category id!" };

        const deleteUser = await categoriesModel.deleteOne({ _id: id });
        if (!deleteUser.deletedCount) throw { statuc: 404, message: "The category does not exist!" };

        res.json({ ok: true, statuc: 200, success: true, message: "The category has been successfully deleted!" });
    } catch (error) {
        next(error);
    }
};

exports.removeMany = async (req, res, next) => {
    try {
        let { id: usersId } = req.body;
        const deleteCategories = await categoriesModel.deleteMany({ _id: { $in: usersId } });

        if (!deleteCategories.deletedCount) throw { statuc: 404, message: "The category does not exist!" };

        res.send({ ok: true, statuc: 200, success: true, message: "The category has been successfully deleted!" });
    } catch (error) {
        next(error);
    }
};

exports.getIcon = async (req, res, next) => {
    try {
        let { fileName } = req.params;
        if (!fileName) throw { status: 404, message: "File not found" };

        res.sendFile(path.join(__dirname, "..", "public", "icon", fileName));
    } catch (error) {
        next(error);
    }
};
