const router = require("express").Router();
const matchController = require("../controllers/matchController");
const requireUser = require("../middlewares/requireUser");
router.post("/", requireUser, matchController.updateMatchResult);
module.exports = router;
