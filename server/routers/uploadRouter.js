const uploadImage = require("../controllers/uploadControllers");

const router = require("express").Router();
router.post("/", uploadImage);
module.exports = router;
