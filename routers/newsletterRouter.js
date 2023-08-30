const { Router } = require("express");
const newsLetterController = require("../controllers/newsletter");

const newsLetterRouter = Router();

newsLetterRouter.post("/", newsLetterController.addNewsLetter);

module.exports = newsLetterRouter;
