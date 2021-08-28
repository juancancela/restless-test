const express = require("express");
const router = express.Router();
const socialNetworkService = require("../services/socialNetwork.service");
const { log, error } = console;

router.use(async (req, res) => {
  try {
    log("[route.root]::executing social network service");
    const response = await socialNetworkService.get();
    log("[route.root]::executed social network service with following response: ", response);
    res.status(200).send(response);
  } catch (e) {
    error(
      `[route.root]::fail to execute social network service. Details: ${e}`
    );
    const { message, stack } = e;
    res.status(e.code).send({ message, stack });
  }
});

module.exports = router;
