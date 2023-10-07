const router = require("express").Router();
const requireUser = require("../middlewares/requireUser");
const sportsController = require("../controllers/sportsController");
router.post("/getlivescore", sportsController.getLiveScore);
router.post("/setlivescore", requireUser, sportsController.setLiveScore);
router.put("/updatelivescore", requireUser, sportsController.updateLiveScore);
router.delete(
  "/deletelivescore",
  requireUser,
  sportsController.deleteLiveScore
);
module.exports = router;
