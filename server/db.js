const {Sequelize} = require("sequelize");
const {dbConfig} = require("./config/getConfig.js");
const fs = require("fs");


//创建数据库实例

const dbSequelize = new Sequelize({
    database: dbConfig.database,
    username: dbConfig.username,
    password: dbConfig.password,
    host: dbConfig.host,
    port: dbConfig.port,
    dialect: "mysql",
    logging: console.log,
    dialectOptions: {
        ssl: {
            rejectUnauthorized: true,
        }
    }

})

// 测试连接
async function testConn(){
    try {
        await dbSequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

testConn()

module.exports = dbSequelize
