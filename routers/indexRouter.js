const { Router } = require("express");

const mainRouter = Router();

const categoryRouter = require("./categoryRouter");
const productRouter = require("./productRouter");
const blogRouter = require("./blogRouter");
const commentRouter = require("./commentRouter");
const authRouter = require("./authRouter");
const userRouter = require("./userRouter");
const infosRouter = require("./infosRouter");
const adminRouter = require("./adminRouter");
const newsLetterRouter = require("./newsletterRouter");

mainRouter.use("/auth", authRouter);
mainRouter.use("/api/categories", categoryRouter);
mainRouter.use("/api/products", productRouter);
mainRouter.use("/api/comments", commentRouter);
mainRouter.use("/api/blogs", blogRouter);
mainRouter.use("/api/users", userRouter);
mainRouter.use("/api/panel", infosRouter);
mainRouter.use("/api/admins", adminRouter);
mainRouter.use("/api/news", newsLetterRouter);

module.exports = mainRouter;
