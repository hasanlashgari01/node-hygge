const { isValidObjectId } = require("mongoose");
const commentModel = require("../models/comment");

exports.AllReviews = async (req, res, next) => {
    try {
        const comments = await commentModel.find({}, "body author").populate("author", "fullName username role image");

        if (comments.length == 0) throw { status: 404, message: "There is no comment" };

        res.json(comments);
    } catch (error) {
        next(error);
    }
};

exports.newComment = async (req, res, next) => {
    try {
        let { body, productId } = req.body;
        let { _id: author } = req.user;

        if (!isValidObjectId(productId)) throw { status: 422, message: "Product id is not valid" };

        await commentModel.create({ body, author, product: productId });

        res.json({ ok: true, status: 201, success: true, message: "New comment create successfully" });
    } catch (error) {
        next(error);
    }
};
