const cheerio = require("cheerio");
const superagent = require("superagent");
const CommodityModel = require("../model/Commodity");
const puppeteer = require("puppeteer");

// 获取商品详情
async function getCommodity(commodityUrl, commodityId) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    // await page.setViewport({height: 1000, width: 1200})
    await page.goto(commodityUrl);
    await page.waitForSelector(".itemInfo-wrap");
    let comDetails = await page.evaluate(() => {
        return {
            title: document.querySelector(".sku-name").innerHTML.toString().trim(),
            price: document.querySelector(".price, .J-p-100010508835").innerHTML,
            commodity_id: commodityId,
            commodity_url: commodityUrl,
        }
    })
    await browser.close();
    return comDetails;
}

//向数据库添加商品
async function addCommodity(data) {
    //向数据库新增商品数据
    const comm = await CommodityModel.create({
        commodity_title: data.title,
        commodity_price: data.price,
        commodity_id: data.commodity_id,
        commodity_url: data.commodity_url,
        commodity_date: new Date().getTime(),
    });
    console.log(`data add Successful!`)
    return comm.commodity_id;
}
//查找所有商品
async function findCommodityAll() {
    //从数据库查找商品信息
    let Commodity = await CommodityModel.findAll({
        attributes: [
            "commodity_title",
            "commodity_price",
            "commodity_id",
            "commodity_url",
            "commodity_date"
        ]
    })
    return Commodity
}

//通过id查找商品


//监控商品
async function watchCommodity(commodityUrl,CommodityId) {
    // 先从数据库查询商品 如果有则监控 如果没有调用getCommodity方法添加到数据库中
}

//测试
// getCommodity("https://item.jd.com/100004898713.html")
// findCommodity()
module.exports = {
    getCommodity,
}
