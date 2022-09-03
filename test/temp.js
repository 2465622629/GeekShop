// let time = new Date()
// console.log(time.getTime());


// 正则

// https://item.jd.com/100004898713.html
let url = 'https://item.jd.com/100004898713.html'
// let getCommodityId = /*\b\.html/
let re = /^ab+c$/;

let commodityId = url.match(/\d+/)
console.log(commodityId[0])
