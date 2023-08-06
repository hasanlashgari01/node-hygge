const { default: mongoose } = require("mongoose");

const productSchema = new mongoose.Schema({
    title: { type: String },
    description: { type: String },
    image: [{ type: String }],
    priceOriginal: { type: Number },
    offPercent: { type: Number },
    ability: { type: String },
    // product => many comments
    comments: [
        {
            type: mongoose.Types.ObjectId,
            ref: "comment",
            default: [],
        },
    ],
});

const productModel = mongoose.model("product", productSchema);

module.exports = productModel;
