const { default: mongoose } = require("mongoose");

const productSchema = new mongoose.Schema(
    {
        title: { type: String },
        description: { type: String },
        productImage: { type: String },
        images: [{ type: String }],
        priceOriginal: { type: Number },
        offPercent: { type: Number },
        ability: { type: String },
        isLike: { type: Object, default: false },
        isBookmark: { type: Object, default: false },
        category: {
            type: mongoose.Types.ObjectId,
            ref: "category",
        },
    },
    { timestamps: true }
);

productSchema.virtual("comments", {
    ref: "comment",
    localField: "_id",
    foreignField: "product",
});

const productModel = mongoose.model("product", productSchema);

module.exports = productModel;
