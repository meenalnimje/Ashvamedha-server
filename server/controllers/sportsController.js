// const Sports = require("../models/sports");
// const { success, error } = require("../utils/responseWrapper");
// const { mapMatchResultOutput } = require("../utils/utils");
// const sportPointTable = async (req, res) => {
//   // point table in this requested sport
//   try {
//     // like collegeController only just add sportName also for filter
//     const { collegeName, sportName, category } = req.body;
//     const sportInfo = await Sports.find({
//       collegeWon: { $eq: collegeName },
//       sportName,
//       category,
//     });
//     const modifiedResult = sportInfo.map((item) => mapMatchResultOutput(item));
//     return res.send(success(201, { modifiedResult }));
//   } catch (e) {
//     console.log("this is the error from register side", e);
//     return res.send(error(500, e.message));
//   }
// };
// const sportTotalScore = async (req, res) => {
//   // point table in this requested sport
//   try {
//     // like collegeController only just add sportName also for filter
//     const { collegeName, sportName, category } = req.body;
//     const sportInfo = await Sports.find({
//       collegeWon: { $eq: collegeName },
//       sportName,
//       category,
//     });
//     let score = 0;
//     sportInfo.forEach((element) => (score = score + element.point));
//     return res.send(success(201, { score }));
//   } catch (e) {
//     console.log("this is the error from register side", e);
//     return res.send(error(500, e.message));
//   }
// };
// module.exports = {
//   sportPointTable,
//   sportTotalScore,
// };

const liveScore = require("../models/liveScore");
const { success, error } = require("../utils/responseWrapper");
const setLiveScore = async (req, res) => {
  try {
    const {
      college1Name,
      college1Score,
      college2Name,
      college2Score,
      matchName,
      category,
      sportName,
      editedBy,
      set,
    } = req.body;
    if (
      !matchName ||
      !college1Name ||
      !college2Name ||
      !college1Score ||
      !sportName ||
      !college2Score ||
      !editedBy ||
      !category ||
      !set
    ) {
      return res.send(error(400, "All fields are required"));
    }
    const livescore = await liveScore.create({
      college1Name,
      college1Score,
      college2Name,
      college2Score,
      matchName,
      category,
      sportName,
      editedBy,
      set,
    });
    return res.send(success(201, `live score set ${livescore}`));
  } catch (e) {
    console.log("this is the error from liveScore side", e);
    return res.send(error(500, e.message));
  }
};
const updateLiveScore = async (req, res) => {
  try {
    const { matchId, set, college1Score, college2Score } = req.body;
    if (!matchId) {
      return res.send(error(400, "match id required for update score"));
    }
    const match = await liveScore.findById({ _id: matchId });
    if (!match) {
      return res.send(404, "match score not found, set the score");
    }
    match.college1Score = college1Score;
    match.college2Score = college2Score;
    match.set = set;
    await match.save();
    return res.send(success(200, `score updated ${match}`));
  } catch (e) {
    console.log("this is the error from updateLiveScore side", e);
    return res.send(error(500, e.message));
  }
};
const getLiveScore = async (req, res) => {
  try {
    const { sportname } = req.body;
    if (!sportname) {
      return res.send(error(400, "all fields are reqired"));
    }
    const liveScoreInfo = await liveScore.find({
      sportName: sportname,
    });
    if (!liveScoreInfo) {
      return res.send(404, "match score not found");
    }
    return res.send(success(200, { liveScoreInfo }));
  } catch (e) {
    console.log("this is the error from updateLiveScore side", e);
    return res.send(error(500, e.message));
  }
};
const deleteLiveScore = async (req, res) => {
  try {
    const { matchId } = req.body;
    if (!matchId) {
      return res.send(error(400, "match id required for to delete score"));
    }
    const match = await liveScore.findById({ _id: matchId });
    if (!match) {
      return res.send(404, "match score not found, set the score first");
    }
    await liveScore.deleteOne({ _id: matchId });
    return res.send(
      success(200, `live score ended plz update the overall point table`)
    );
  } catch (e) {
    console.log("this is the error from updateLiveScore side", e);
    return res.send(error(500, e.message));
  }
};
module.exports = {
  setLiveScore,
  updateLiveScore,
  deleteLiveScore,
  getLiveScore,
};
