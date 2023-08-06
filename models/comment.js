const { default: mongoose } = require("mongoose");

const commentSchema = new mongoose.Schema(
    {
        body: {
            type: String,
            required: true,
        },
        author: {
            type: mongoose.Types.ObjectId,
            required: true,
        },
    },
    { timestamps: true }
);

const commentModel = mongoose.model("comment", commentSchema);

module.exports = commentModel;
