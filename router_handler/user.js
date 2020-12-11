const express = require("express")
const db = require("../db/index")
const router = express.Router()
// 导入加密密码的包
const bcrypt = require("bcryptjs")
// 用这个包来生成 Token 字符串
const jwt = require('jsonwebtoken')
// 导入将用户信息对象加密成 Token 字符串的文件
const config = require("../config")
// 抽离路由并共享出去
exports.regUser = (req, res) => {
    // res.send("reguser ok")
    // 检测用户名或者密码是否为空
    const userinfo = req.body
    if (!userinfo.username || !userinfo.password) return res.cc("用户名和密码不能为空！")
    // 检测用户名是否被占用
    // 导入数据库模块  查询数据库中是否已注册该用户名
    const db = require("../db/index")
    // 定义sql语句查询
    const sql = "select * from ev_users1 where username=?"
    db.query(sql, userinfo.username, (err, results) => {
        if (err) return res.cc(err)
        if (results.length > 0) return res.cc("用户名被占用！请更换其他用户名")
        // TODO: 用户名可用，继续后续流程...
        // 导入加密密码的包
        const bcrypt = require("bcryptjs")
        // 确认用户名可用之后，调用 bcrypt.hashSync(明文密码, 随机盐的长度) 方法，对用户的密码进行加密处理：
        userinfo.password = bcrypt.hashSync(userinfo.password, (10))
        // 插入新的用户 定义sql插入语句
        const sql1 = "insert into ev_users1 set ?"
        db.query(sql1, { username: userinfo.username, password: userinfo.password }, (err, results) => {
            if (err) return res.cc(err)
            // 语句执行成功 但执行行数不为1
            if (results.affectedRows !== 1) {
                return res.cc("注册用户失败，请稍后再试！")
            }
            // 注册成功
            res.cc("恭喜您注册成功！ ", 0)
        })
    })

}
// 登录处理函数
exports.login = (req, res) => {
    // res.send("login ok")
    // 根据用户名查询数据
    const userinfo = req.body
    // 定义sql语句查询
    const sql = "select * from ev_users1 where username=?"
    db.query(sql, userinfo.username, (err, results) => {
        if (err) return res.cc(err)
        // 查询数据库中数据 查到的结果不等于1 说明没有注册过
        if (results.length !== 1) {
            return res.cc("登录失败！")
        }
        // 拿着用户输入的密码,和数据库中存储的密码进行对比
        const compareResult = bcrypt.compareSync(userinfo.password, results[0].password)
        // 如果对比的结果等于 false, 则证明用户输入的密码错误
        if (!compareResult) {
            return res.cc('密码输入错误 请重新输入！')
        }

        // TODO：登录成功，生成 Token 字符串
        // 剔除完毕之后，user 中只保留了用户的 id, username, nickname, email 这四个属性的值
        const user = { ...results[0], password: '', user_pic: '' }
        // 安装生成token字符串的包 npm i jsonwebtoken@8.5.1   在顶部导入


        // 生成token字符串
        const tokenStr = jwt.sign(user, config.jwtSecretKey, { expiresIn: "24h" })  // 有效期十个小时
        // 将自动生成的字符串响应给客户端
        res.send({
            status: 0,
            message: "登录成功！",
            token: 'Bearer ' + tokenStr,
        })

        // 配置解析token中间件 npm i express-jwt@5.3.3
    })
}

