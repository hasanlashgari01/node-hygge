const express = require("express");
const path = require("path");
const cors = require("cors");
const bodyParser = require("body-parser");
const mainRouter = require("./routers/indexRouter");
const { notFoundError, errorHandler } = require("./middleware/errorHandler");

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')));

app.use(mainRouter);
app.use(notFoundError);
app.use(errorHandler);

module.exports = app;
