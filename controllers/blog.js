const blogModel = require("../models/blog");
const { isValidObjectId } = require("mongoose");
const { blogValidationSchema, searchBlogValidationSchema } = require("../validators/blogValidator");

exports.AllBlogs = async (req, res, next) => {
    try {
        const blogs = await blogModel.find();

        if (blogs.length == 0) throw { status: 200, message: "There is no blog" };

        res.json(blogs);
    } catch (error) {
        next(error);
    }
};

exports.createBlog = async (req, res, next) => {
    try {
        let { title, tip } = req.body;
        let image = req.file;

        await blogValidationSchema.validateAsync({ title, tip });

        await blogModel.create({ title, image: image.filename, tip });
        res.json({ message: "New blog create successfully" });
    } catch (error) {
        next(error);
    }
};

exports.removeBlog = async (req, res, next) => {
    try {
        let { blogId } = req.params;
        if (!isValidObjectId(blogId)) throw { status: 422, message: "this id is not valid" };

        const removeBlog = await blogModel.deleteOne({ _id: blogId });
        if (removeBlog.deletedCount == 0) throw { status: 404, message: "blog not found" };

        res.json({ ok: true, status: 200, success: true, message: "Blog deleted successfully" });
    } catch (error) {
        next(error);
    }
};

exports.getBlog = async (req, res, next) => {
    try {
        let { blogId } = req.params;
        if (!isValidObjectId(blogId)) throw { status: 422, message: "this id is not valid" };

        const blog = await blogModel.findById({ _id: blogId });
        res.json(blog);
    } catch (error) {
        next(error);
    }
};

exports.updateBlog = async (req, res, next) => {
    try {
        let { blogId } = req.params;
        let dataBlog = req.body;
        if (!isValidObjectId(blogId)) throw { status: 422, success: false, message: "this id is not valid" };

        const blog = await blogModel.updateOne({ _id: blogId }, { $set: dataBlog });
        if (blog.modifiedCount == 0) throw { statusCode: 400, success: false, message: "This blog updated faild" };

        res.json({ ok: true, status: 201, success: true, message: "This blog updated successfully" });
    } catch (error) {
        next(error);
    }
};

exports.searchBlog = async (req, res, next) => {
    try {
        let title = req.body.title;

        await searchBlogValidationSchema.validateAsync({ title });

        const blogs = await blogModel.find({ title: { $regex: title, $options: "i" } });

        if (blogs == 0) throw { status: 404, message: "Product not found with this title" };

        res.json({ products: blogs });
    } catch (err) {
        next(err);
    }
};
