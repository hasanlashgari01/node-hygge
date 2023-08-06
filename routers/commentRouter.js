const { Router } = require("express");

const commentController = require("../controllers/comment");
const { checkLogin } = require("../middleware/authLogin");

const commentRouter = Router();

commentRouter.route("/").get(commentController.AllReviews).post(checkLogin, commentController.newComment);

module.exports = commentRouter;
