const router = require("express").Router();
const requireUser = require("../middlewares/requireUser");
const scoreController = require("../controllers/scoreController");
router.post("/getlivescore", scoreController.getLiveScore);
router.post("/setlivescore", requireUser, scoreController.setLiveScore);
router.put("/updatelivescore", requireUser, scoreController.updateLiveScore);
router.delete("/deletelivescore", requireUser, scoreController.deleteLiveScore);
module.exports = router;
