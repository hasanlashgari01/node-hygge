const { default: mongoose } = require("mongoose");

const categoriesSchema = new mongoose.Schema({
    title: { type: String, required: true },
    shortName: { type: String, unique: true, required: true },
    icon: { type: String, required: true },
});

categoriesSchema.virtual("products", {
    ref: "product",
    localField: "_id",
    foreignField: "category",
});

const categoriesModel = mongoose.model("category", categoriesSchema);

module.exports = categoriesModel;
