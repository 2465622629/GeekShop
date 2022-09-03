const cheerio = require("cheerio");
const superagent = require("superagent");
const CommodityModel = require("../model/Commodity");
const puppeteer = require("puppeteer");

// 获取商品详情
async function getCommodity(commodityUrl,commodityId) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    // await page.setViewport({height: 1000, width: 1200})
    await page.goto(commodityUrl);
    // 内容
    await page.waitForSelector(".itemInfo-wrap");
    let comDetails = await page.evaluate(() => {
        return {
            title: document.querySelector(".sku-name").innerHTML.toString().trim(),
            price: document.querySelector(".price, .J-p-100010508835").innerHTML,
        }
    })
    await browser.close();


    //向数据库新增商品数据
    const comm = await CommodityModel.create({
        commodity_title: comDetails.title,
        commodity_price: comDetails.price,
        commodity_date: new Date().getTime(),
        commodity_id: commodityUrl.match(/\d+/)[0],
        commodity_url: commodityUrl
    });
    console.log(`data add Successful!`)
    return comm;
}

async function findCommodity(){
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
}

//监控商品
async function watchCommodity(Url) {
    // 先从数据库查询商品 如果有则监控 如果没有调用getCommodity方法添加到数据库中
}

//测试
// getCommodity("https://item.jd.com/100004898713.html")

module.exports = {
    getCommodity,
}
