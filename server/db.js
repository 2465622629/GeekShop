const {Sequelize} = require("sequelize");
const {dbConfig} = require("./config/getConfig.js");


//创建数据库实例

const dbSequelize = new Sequelize({
    database: dbConfig.database,
    username: dbConfig.username,
    password: dbConfig.password,
    host: dbConfig.host,
    port: dbConfig.port,
    dialect: "mysql",
    logging: console.log,
})

//测试连接
dbSequelize.authenticate().then(() => {
    console.log("mysql 创建连接成功")
}).catch(()=>{
    console.log(`创建连接失败 原因:${e}`)
})

module.exports = dbSequelize
