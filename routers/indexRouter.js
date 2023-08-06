const { Router } = require("express");

const mainRouter = Router();

const categoryRouter = require("./categoryRouter");
const productRouter = require("./productRouter");
const blogRouter = require("./blogRouter");
const commentRouter = require("./commentRouter");
const authRouter = require("./authRouter");
const userRouter = require("./userRouter");
const adminRouter = require("./adminRouter");

mainRouter.use("/auth", authRouter);
mainRouter.use("/api/categories", categoryRouter);
mainRouter.use("/api/products", productRouter);
mainRouter.use("/api/comments", commentRouter);
mainRouter.use("/api/blogs", blogRouter);
mainRouter.use("/api/users", userRouter);
mainRouter.use("/api/admins", adminRouter);

module.exports = mainRouter;
