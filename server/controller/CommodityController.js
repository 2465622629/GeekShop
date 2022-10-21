const {getCommodity} = require("../service/commodityService");
const {commodityConfig} = require('../config/getConfig')
const {pushPlushMsg} = require('../util/msgPush');

//监控商品价格变化 给用户发送消息
async function watchCommodity(event,req,res) {
    const {commodityUrl} = event.query
    let delay = commodityConfig.commodityDelay
    let nowPrice = 0; //商品当前价格
    let commodityTitle = '';
    let msg =
        `
        您好您选中的商品${commodityTitle} 当前的价格是 ${nowPrice}
        `
    let that = this
    getCommodity(commodityUrl).then((commodity) => {
        that.nowPrice = commodity.price
        that.commodity_title = commodity.title
    }).catch((err)=>{
        console.log(`出错了 错误原因${err}`)
    })

    //发送消息
    pushPlushMsg(commodityTitle, msg).then((res) => {
        console.log('消息推动成功')
    }).catch((err) => {
        console.log(`程序出错了 错误原因${err}`)
    })

}

module.exports = {
    watchCommodity
}
