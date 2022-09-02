const {DataTypes} = require('sequelize');
const sequelize = require("../db");


const Commodity = sequelize.define('Commodity',
    {
        Id: {
            type: DataTypes.INET,
            autoIncrement: true,
            primaryKey: true
        },
        commodityTitle: {
            type: DataTypes.CHAR,
            allowNull: false
        },
        commodityPrice: {
            type: DataTypes.DOUBLE,
            allowNull: false
        },
        commodityId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        commodityDate: {
            type: DataTypes.DATE,
            allowNull: false
        },
    },
    {
        tableName: Commodity,
        paranoid: true,
        deletedAt: "isDelete",
        timestamps: false,
    }
)


module.exports = Commodity;
