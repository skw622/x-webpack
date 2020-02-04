const express = require("express");
const homeController = require("../controllers/homeController.js");
const homeRouter = express.Router();

homeRouter.get("/", homeController.index);
homeRouter.get('/login', homeController.login)
homeRouter.post('/thanks', homeController.thanks)

module.exports = homeRouter;
