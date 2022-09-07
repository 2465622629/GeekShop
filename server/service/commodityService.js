const cheerio = require("cheerio");
const superagent = require("superagent");
const CommodityModel = require("../model/Commodity");
const puppeteer = require("puppeteer");
const {where} = require("sequelize");

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
    return await CommodityModel.findAll({
            attributes: [
                "commodity_title",
                "commodity_price",
                "commodity_id",
                "commodity_url",
                "commodity_date"
            ]
        }
    )
}

//通过id查找商品
async function findCommodityById(commodityId) {
    return await CommodityModel.findAll(
        {
            where: {
                commodity_id: commodityId
            },
            attributes: [
                "commodity_title",
                "commodity_price",
                "commodity_id",
                "commodity_url",
                "commodity_date"
            ]
        }
    )
}

//监控商品
async function watchCommodity(commodityUrl, commodityId) {
    let afterPrice = 0
    let nowPrice = 0
    if (commodityUrl == null || commodityUrl.length === 0) { //空值判断
        return '未传入商品链接地址'
    }
    if (!commodityId) {
        commodityId = commodityUrl.match("/\b/")[0]
    }
    // 从数据库查找对应商品
    findCommodityById(commodityId).then((data) => {
        console.log(`数据 ${data[0].dataValues}`)
        afterPrice = data[0].dataValues.commodity_price
    })
    // 先从数据库查询商品 如果有则监控 如果没有调用getCommodity方法添加到数据库中
}

//记录商品变化
async function RecordCommodityPrice() {

}

//测试
// getCommodity("https://item.jd.com/100004898713.html")
// findCommodity()
// findCommodityById("100004898713").then((data)=>{
//     console.log(data[0].dataValues['commodity_title'])
// })
//查询指定商品
module.exports = {
    getCommodity,
    findCommodityAll,
    findCommodityById,
    addCommodity,
    watchCommodity,
    RecordCommodityPrice
};
