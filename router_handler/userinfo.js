// 导入数据库模块
const db = require("../db/index")
// 导入校验密码包bcrypt
const bcrypt = require("bcryptjs")
// 获取用户基本信息
exports.getUserInfo = (req, res) => {
    // res.send("ok")
    // 定义sql语句 根据用户的id查找信息
    const sql = "select id,username,nickname,email,user_pic from ev_users1 where id=?"
    // 注意：req 对象上的 user 属性，是 Token 解析成功，express-jwt 中间件帮我们挂载上去的
    db.query(sql, req.user.id, (err, results) => {
        if (err) return res.cc(err)
        if (results.length !== 1) return res.cc("获取用户信息失败")
        // 获取成功
        res.send({
            status: 0,
            message: "获取用户信息成功！",
            data: results[0]
        })
    })
}

// 更新用户基本信息
exports.updateUserInfo = (req, res) => {
    // 实现更新用户的功能
    const sql = "update ev_users1 set ? where id=?"
    db.query(sql, [req.body, req.body.id], (err, results) => {
        if (err) return res.cc(err)
        if (results.affectedRows !== 1) return ("更新用户信息失败！")
        // 更新成功
        res.cc("更新成功！", 0)
    })
}

// 修改密码模块
exports.updatePassword = (req, res) => {
    // 实现重置密码  先根据id查找用户是否存在
    const sql = "select * from  ev_users1 where id=?"
    db.query(sql, req.user.id, (err, results) => {
        if (err) return res.cc(err)
        if (results.length !== 1) return ("用户不存在")
        // 用户存在  校验输入的密码和数据库中储存的密码是否一致
        const compareResult = bcrypt.compareSync(req.body.oldPwd, results[0].password)
        if (!compareResult) return res.cc("原密码输入错误")
        // 将新密码更新到数据库
        const sql = "update ev_users1 set password=? where id=?"
        // 对新密码加密
        const newPwd = bcrypt.hashSync(req.body.newPwd, 10)
        db.query(sql, [newPwd, req.user.id], (err, results) => {
            if (err) return res.cc(err)
            if (results.affectedRows !== 1) return res.cc("更新密码失败！")
            res.cc("更新密码成功！", 0)
        })
    })
}


// 更新头像
exports.updateAvatar = (req, res) => {
    // 实现更新头像功能
    const sql = "update ev_users1 set user_pic=? where id=?"
    db.query(sql, [req.body.avatar, req.user.id], (err, results) => {
        if (err) return res.cc(err)
        if (results.affectedRows !== 1) return res.cc("更新头像失败！")
        res.cc("更新头像成功！", 0)
    })
}