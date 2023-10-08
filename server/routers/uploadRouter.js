const uploadController = require("../controllers/uploadControllers");

const router = require("express").Router();
router.post("/create", uploadController.uploadImage);
router.post("/", uploadController.getPhotos);
module.exports = router;
