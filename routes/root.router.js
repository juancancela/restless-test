const express = require("express");
const router = express.Router();
const socialNetworkService = require("../services/socialNetwork.service");

router.use(async (req, res) => {
  const result = await socialNetworkService.get();
  res.status(200).send(result);
});

module.exports = router;
