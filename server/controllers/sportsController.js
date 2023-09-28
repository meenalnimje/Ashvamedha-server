const Sports = require("../models/sports");
const { success, error } = require("../utils/responseWrapper");
const { mapMatchResultOutput } = require("../utils/utils");
const sportPointTable = async (req, res) => {
  // point table in this requested sport
  try {
    // like collegeController only just add sportName also for filter
    const { collegeName, sportName, category } = req.body;
    const sportInfo = await Sports.find({
      collegeWon: { $eq: collegeName },
      sportName,
      category,
    });
    const modifiedResult = sportInfo.map((item) => mapMatchResultOutput(item));
    return res.send(success(201, { modifiedResult }));
  } catch (e) {
    console.log("this is the error from register side", e);
    return res.send(error(500, e.message));
  }
};
const sportTotalScore = async (req, res) => {
  // point table in this requested sport
  try {
    // like collegeController only just add sportName also for filter
    const { collegeName, sportName, category } = req.body;
    const sportInfo = await Sports.find({
      collegeWon: { $eq: collegeName },
      sportName,
      category,
    });
    let score = 0;
    sportInfo.forEach((element) => (score = score + element.point));
    return res.send(success(201, { score }));
  } catch (e) {
    console.log("this is the error from register side", e);
    return res.send(error(500, e.message));
  }
};
module.exports = {
  sportPointTable,
  sportTotalScore,
};
