const commentModel = require("../models/comment");
const productModel = require("../models/product");
const userModel = require("../models/user");

exports.getInfos = async (req, res, next) => {
    try {
        const productsCount = await productModel.find().lean().count();
        const usersCount = await userModel.find().lean().count();
        const commentsCount = await commentModel.find().lean().count();
        const users = await userModel.find().sort("-1").lean();

        res.json({ productsCount, usersCount, commentsCount, users });
    } catch (err) {
        next(err);
    }
};
