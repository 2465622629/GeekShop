const express = require("express");

let router = express.Router();

router.get("/commodity", require("../controller/CommodityController").watchCommodity)

module.exports = router
