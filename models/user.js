const { default: mongoose } = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        fullName: { type: String },
        username: { type: String, unique: true, required: true },
        email: { type: String, unique: true, required: true },
        password: { type: String, required: true },
        image: { type: String },
        role: { type: String, default: "USER" },
        token: { type: String },
        likes: [{ type: mongoose.Types.ObjectId, ref: "product", default: [] }],
    },
    {
        timestamps: true,
    }
);

const userModel = mongoose.model("user", userSchema);

module.exports = userModel;
