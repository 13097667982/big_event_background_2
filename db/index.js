// 安装并配置没有sql
const mysql = require("mysql")
const db = mysql.createPool({
    host: "127.0.0.1",
    user: "root",
    password: "admin123",
    database: "my_db_01"
})

// 将配置好的数据库暴露出去
module.exports = db
