const { default: mongoose } = require("mongoose");

const categoriesSchema = new mongoose.Schema({
    title: { type: String, required: true },
    shortName: { type: String, unique: true, required: true },
    icon: { type: String, required: true },
    products: [
        {
            type: mongoose.Types.ObjectId,
            ref: "product",
            default: [],
        },
    ],
});

const categoriesModel = mongoose.model("category", categoriesSchema);

module.exports = categoriesModel;
