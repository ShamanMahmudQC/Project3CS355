const express = require("express");
const router = express.Router();
const { getCollection } = require("../models/db");

router.get("/api/leaderboard", async (req, res) => {
  const users = getCollection("users");
  const scores = await users.aggregate([
    { $unwind: "$history" },
    {
      $project: {
        user: "$username",
        score: "$history.score",
        date: "$history.date",
      },
    },
    { $sort: { score: -1, date: 1 } },
    { $limit: 10 },
  ]).toArray();

  res.json(scores);
});

module.exports = router;
