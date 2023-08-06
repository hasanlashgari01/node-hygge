const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.hashString = str => {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(str, salt);
};

exports.tokenGenerator = payload => {
    return jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: "15 days" });
};

exports.verifyJwtToken = token => {
    const result = jwt.verify(token, process.env.SECRET_KEY);
    if (!result?.email) throw { status: 401, message: "Please log in to your account." };
    return result;
};
