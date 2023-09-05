const { Router } = require("express");
const blogController = require("../controllers/blog");
const { checkLogin, isAdmin } = require("../middleware/authLogin");
const blogUploader = require("../util/blogUploader");

const blogRouter = Router();

blogRouter
    .route("/")
    .get(blogController.AllBlogs)
    .post(blogUploader.single("image"), checkLogin, isAdmin, blogController.createBlog);
blogRouter.get("/search", blogController.searchBlog);
blogRouter.get("/image/:imageName", blogController.getImage);
blogRouter
    .route("/:blogId")
    .get(blogController.getBlog)
    .delete(checkLogin, isAdmin, blogController.removeBlog)
    .put(checkLogin, isAdmin, blogController.updateBlog);

module.exports = blogRouter;
