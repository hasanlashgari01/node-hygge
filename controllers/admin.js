const { isValidObjectId } = require("mongoose");
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
