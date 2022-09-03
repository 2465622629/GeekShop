const {DataTypes} = require('sequelize');
const sequelize = require("../db");


const CommodityModel = sequelize.define(
    'Commodity',
    {
        id: {
            type: DataTypes.INET,
            autoIncrement: true,
            primaryKey: true
        },
        commodity_title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        commodity_price: {
            type: DataTypes.DOUBLE,
            allowNull: false
        },
        commodity_id: {
            type: DataTypes.STRING,
            allowNull: true
        },
        commodity_date: {
            type: DataTypes.DATE(6),
            allowNull: false,
            defaultValue:DataTypes.NOW
        },
        commodity_url: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
    },
    {
        tableName: 'commodity',
        paranoid: true,
        deletedAt: "isDelete",
        timestamps: false,
    }
);


module.exports = CommodityModel;
