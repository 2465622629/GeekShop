const cheerio = require("cheerio");
const superagent = require("superagent");
const url = require("url");
const puppeteer = require("puppeteer");

async function getCommodity(comUrl) {
    superagent.get(comUrl)
        .set({"user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.5112.102 Safari/537.36 Edg/104.0.1293.70"})

        .end((err, res) => {
            if (err) {
                return err
            }

            let $ = cheerio.load(res.text)
            let items = []

            items.push({
                title: $('.sku-name').text(),
                price: $('.price , .J-p-100010508835').text(),
            })


            console.log(items)
        })
}

async function getCommodityForEdge(Url) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.setViewport({height: 1000, width: 1200})
    await page.goto(Url);
    // 内容
    await page.waitForSelector(".itemInfo-wrap");
    let comDetails = await page.evaluate(()=>{
        return{
            title: document.querySelector(".sku-name").innerHTML,
            price:document.querySelector(".price, .J-p-100010508835").innerHTML
        }
    })
    console.log(comDetails)

}

// getCommodity('https://item.jd.com/100010508835.html')

getCommodityForEdge('https://item.jd.com/100010508835.html')
