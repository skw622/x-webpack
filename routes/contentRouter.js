const express = require("express");
const contentController = require("../controllers/admin/contentController.js");
const contentRouter = express.Router();

contentRouter.use("/postcontent", contentController.postContent);
contentRouter.use("/create", contentController.addContent);
contentRouter.use("/update/:id", contentController.updateContent);
contentRouter.use("/postupdatecontent/:id", contentController.postUpdateContent);
contentRouter.use("/delete/:id", contentController.deleteContent);
contentRouter.use("/", contentController.getContents);

module.exports = contentRouter;
