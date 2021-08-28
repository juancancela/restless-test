const express = require("express");
const router = express.Router();

router.use(async (req, res) => {
  res.status(200).send({ hello: "world" });
});

module.exports = router;
