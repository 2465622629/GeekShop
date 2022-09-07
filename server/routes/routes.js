const express = require("express");

let router = express.Router();

// router.get("/commodity", require("../controller/CommodityController").commodityApi)
router.get("/", function (req,res){
    console.log('hello')
})

module.exports = router
