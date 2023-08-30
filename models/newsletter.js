const { default: mongoose } = require("mongoose");

const newsletterSchema = new mongoose.Schema({
    email: { type: String, unique: true, required: true },
});

const newsletterModel = mongoose.model("newsletter", newsletterSchema);

module.exports = newsletterModel;
