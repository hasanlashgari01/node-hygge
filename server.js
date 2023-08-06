const { default: mongoose } = require("mongoose");
const app = require("./app");
require("dotenv").config();

mongoose
  .connect("mongodb://127.0.0.1:27017/hygge")
  .then(() => console.log("Connected!"))
  .catch(err => console.log(err));

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Server listen on port ${port}`));
