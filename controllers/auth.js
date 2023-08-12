const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userModel = require("../models/user");
const { tokenGenerator, hashString } = require("../modules/functions");
const { registerValidationSchema, loginValidationSchema } = require("../validators/authValidator");

exports.register = async (req, res, next) => {
    try {
        let { username, fullName, email, password } = req.body;
        let token = tokenGenerator({ email });
        const userValidate = await registerValidationSchema.validate({ username, fullName, email, password });
        const hashPassword = hashString(password);
        if (userValidate) {
            const user = await userModel
                .create({ username, fullName, email, password: hashPassword, token })
                .catch(err => {
                    if (err?.code == 11000) {
                        if (err.keyPattern.email == 1) {
                            throw { status: 400, success: false, message: "ایمیل قبلا در سیستم استفاده شده است" };
                        } else if (err.keyPattern.username == 1) {
                            throw { status: 400, success: false, message: "نام کاربری قبلا در سیستم استفاده شده است" };
                        }
                    }
                });
            res.status(201).json({ message: "User registration was successful." });
        } else {
            next();
        }
    } catch (error) {
        next(error);
    }
};

exports.login = async (req, res, next) => {
    try {
        let { email, password } = req.body;
        let user = await userModel.findOne({ email });
        await loginValidationSchema.validateAsync(req.body);
        const compareResult = bcrypt.compareSync(password, user.password);

        const userObject = user.toObject();
        Reflect.deleteProperty(userObject, "password");
        Reflect.deleteProperty(userObject, "token");

        if (user && compareResult) {
            const token = tokenGenerator({ email });
            user.accessToken = token;
            await user.save();

            res.status(200).json({ accessToken: token, user: userObject });
        } else {
            res.status(400).json({ message: "Email or Password isn't valid." });
        }
    } catch (error) {
        next(error);
    }
};

exports.getMe = async (req, res, next) => {
    const authHead = req.header("Authorization")?.split(" ");

    if (authHead?.length !== 2) {
        return res.status(403).json({
            message: "this route is protected and you can't have access to it.",
        });
    }

    const token = authHead?.[1];

    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);

        const user = await userModel
            .findOne({ email: decoded.email }, { password: 0, __v: 0 })
            .populate("likes", "-__v -category")
            .populate("bookmarks", "-__v -category");

        if (!user) {
            return res.status(404).json({ message: "User Not Found" });
        }

        req.user = user;
        res.json({ user: req.user });
    } catch (error) {
        if (error instanceof jwt.TokenExpiredError) {
            throw { statusCode: 401, message: "توکن منقضی شده است" };
        } else if (error instanceof jwt.JsonWebTokenError) {
            throw { statusCode: 401, message: "توکن نامعتبر است" };
        }
        next(error);
    }
};
