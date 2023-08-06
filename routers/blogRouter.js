const { Router } = require("express");

const blogController = require("../controllers/blog");
const { checkLogin, isAdmin } = require("../middleware/authLogin");

const blogRouter = Router();

blogRouter.route("/").get(blogController.AllBlogs).post(blogController.createBlog);
blogRouter
    .route("/:blogId")
    .get(blogController.getBlog)
    .delete(checkLogin, isAdmin, blogController.removeBlog)
    .put(checkLogin, isAdmin, blogController.updateBlog);

module.exports = blogRouter;
