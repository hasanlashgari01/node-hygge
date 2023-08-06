const { isValidObjectId } = require("mongoose");
const { categoryValidatationSchema } = require("../validators/categoriesValidator");
const categoriesModel = require("../models/category");

exports.AllCategories = async (req, res, next) => {
    try {
        const categories = await categoriesModel.find({});
        if (!categories) throw { message: "Category not found" };

        res.json(categories);
    } catch (error) {
        next(error);
    }
};

exports.getCategory = async (req, res, next) => {
    try {
        const { categoryName } = req.params;

        const category = await categoriesModel.findOne({ name: categoryName }).populate("products");
        if (!category) throw { ok: false, status: 404, message: "Category not found" };

        res.json(category);
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
