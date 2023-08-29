const { isValidObjectId } = require("mongoose");
const path = require("path");
const userModel = require("../models/user");

exports.AllAdmins = async (req, res, next) => {
    try {
        const admins = await userModel.find({ role: "ADMIN" }).sort({ createdAt: -1 }).lean();
        if (admins.length == 0) throw { message: "There is no user." };

        res.send(admins);
    } catch (error) {
        next(error);
    }
};

exports.changeRoleToUser = async (req, res, next) => {
    try {
        let { adminId } = req.params;

        if (!isValidObjectId(adminId)) throw { status: 422, message: "There is no user with this id." };

        const admin = await userModel.findById(adminId);
        admin.role === "ADMIN" && (await userModel.updateOne({ _id: adminId }, { $set: { role: "USER" } }));

        res.status(200).json({ message: "The user has been successfully updated." });
    } catch (error) {
        next(error);
    }
};

exports.uploadAvatar = async (req, res, next) => {
    try {
        let userId = req.user._id;
        let avatar = req.file;

        if (!isValidObjectId(userId)) throw { status: 422, message: "There is no user with this id." };

        await userModel.updateOne({ _id: userId }, { $set: { image: avatar.filename } });
        res.json({ ok: true, status: 200, success: true, message: "The user has been successfully updated." });
    } catch (error) {
        next(error);
    }
};

exports.getAvatar = async (req, res, next) => {
    try {
        let { fileName } = req.params;
        console.log(fileName);
        if (!fileName) throw { status: 404, message: "File not found" };

        res.sendFile(path.join(__dirname, "..", "public", "users", "avatar", fileName));
    } catch (error) {
        next(error);
    }
};