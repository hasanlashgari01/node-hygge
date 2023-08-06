const { isValidObjectId } = require("mongoose");
const userModel = require("../models/user");

exports.AllUsers = async (req, res, next) => {
    try {
        const users = await userModel.find({ role: "USER" }).sort({ createdAt: -1 });
        if (users.length == 0) {
            throw { status: 404, message: "There is no user." };
        }

        res.json(users);
    } catch (error) {
        next(error);
    }
};

exports.updateUserProfile = async (req, res, next) => {
    try {
        let userId = req.user._id;
        let { fullName, password } = req.body;

        if (!isValidObjectId(userId)) {
            throw { status: 404, message: "There is no user with this id." };
        }

        await userModel.updateOne({ _id: userId, $set: { fullName, password } });
        res.status(200).json({ message: "The user has been successfully updated." });
    } catch (error) {
        next({ status: 404, message: "There is no user with this id." });
    }
};

exports.removeUser = async (req, res, next) => {
    try {
        let { userId } = req.params;
        if (isValidObjectId(userId)) {
            const user = await userModel.findOne({ _id: userId });

            if (!user) throw { status: 422, message: "There is no user with this id." };

            await userModel.deleteOne({ _id: userId });
            res.send({ ok: true, status: 200, success: true, message: "The user has been successfully deleted." });
        }
    } catch (error) {
        next(error);
    }
};

exports.changeRoleToAdmin = async (req, res, next) => {
    try {
        let { userId } = req.params;

        if (!isValidObjectId(userId)) throw { status: 422, message: "There is no user with this id." };

        const user = await userModel.findById(userId);
        user.role === "USER" && (await userModel.updateOne({ _id: userId }, { $set: { role: "ADMIN" } }));
        res.json({ ok: true, status: 200, success: true, message: "The user has been successfully updated." });
    } catch (error) {
        next(error);
    }
};
