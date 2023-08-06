const userModel = require("../models/user");
const { verifyJwtToken } = require("../modules/functions");

exports.checkLogin = async (req, res, next) => {
    try {
        let authError = { statusCode: 401, message: "Please log in to your account." };
        const authorization = req?.headers?.authorization;
        if (!authorization) next(authError);

        let token = authorization.split(" ")[1];
        if (!token) next(authError);

        const result = verifyJwtToken(token);
        const { email } = result;
        const user = await userModel.findOne({ email }, { password: 0, __v: 0 });
        if (!user) throw authError;

        req.user = user;
        return next();
    } catch (error) {
        next(error);
    }
};

exports.isAdmin = async (req, res, next) => {
    try {
        let admin = req.user;
        if (admin.role === "ADMIN") {
            next();
        } else {
            next({ statusCode: 401, message: "You do not have access to this section" });
        }
    } catch (error) {
        next(error);
    }
};
