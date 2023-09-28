const router = require("express").Router();
const sportsController = require("../controllers/sportsController");
router.post("/", sportsController.sportPointTable);
router.post("/score", sportsController.sportTotalScore);
module.exports = router;
