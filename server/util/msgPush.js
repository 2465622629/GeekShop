const axios = require("axios");
const {pushPlusConfig} = require("../config/getConfig");


async function pushPlushMsg(title, cont) {
    //http://www.pushplus.plus/send?token=${pushPlusConfig.token}&title=${title}&content=${cont}&template=html
    let url = 'http://www.pushplus.plus/send'
    axios.get(url,{
        params:{
            token: pushPlusConfig.token,
            title: title,
            content: cont,
            template: 'html',
        }
    }).then((res) => {
        console.log(res.data)
    }).catch((err) => {
        console.log(`err:${err}`)
    })
}

pushPlushMsg('测试','测试')

module.exports={
    pushPlushMsg
}

