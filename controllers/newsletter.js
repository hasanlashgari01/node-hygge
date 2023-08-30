const newsletterModel = require("../models/newsletter");
const userModel = require("../models/user");
const newsletterSchema = require("../validators/newsletterValidator");

exports.addNewsLetter = async (req, res, next) => {
    try {
        await newsletterSchema.validateAsync(req.body, { abortEarly: false });
        const { email } = req.body;
        const isUser = await userModel.findOne({ email });
        if (!isUser) throw new Error("You not a user in our website");

        await newsletterModel.create({ email });

        res.status(201).json({ message: "You are added to our newsletter" });
    } catch (error) {
        next(error);
    }
};
