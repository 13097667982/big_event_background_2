// 导入数据库模块
const expressJoi = require("@escook/express-joi")
const db = require("../db/index")
// 文章模块路由处理函数

// 获取文章分类
exports.getArticleCates = (req, res) => {
    const sql = "select * from ev_article_cate1 where is_delete=0 order by id asc"
    db.query(sql, (err, results) => {
        if (err) return res.cc(err)
        // 执行sql语句成功
        res.send({
            status: 0,
            message: "获取成功！",
            data: results
        })
    })
}

// 新增文章分类
exports.addArticleCates = (req, res) => {
    // 定义查重的语句
    const sql = "select * from ev_article_cate1 where name=? or alias=?"
    db.query(sql, [req.body.name, req.body.alias], (err, results) => {
        if (err) return res.cc(err)
        if (results.length === 2) return res.cc("分类名称与别名均已被占用！")
        if (results.length === 1 && req.body.name === results[0].name && req.body.alias === results[0].alias) return res.cc("分类名称与别名均已被占用！")
        if (results.length === 1 && req.body.name === results[0].name) return res.cc("分类名称被占用，请更换重试！")
        if (results.length === 1 && req.body.alias === results[0].alias) return res.cc("用户别名被占用")
        // 成功
        // 定义店家分类的sql
        const sql = "insert into ev_article_cate1 set ?"
        db.query(sql, req.body, (err, results) => {
            if (err) return res.cc(err)
            if (results.affectedRows !== 1) return res.cc("新增文章分类失败！")
            res.cc("添加文章分类成功！", 0)
        })
    })
}

// 根据id删除文章分类
exports.deleteCateById = (req, res) => {
    // 实现根据文章删除文章分类功能 定义sql语句   实则改变状态码
    const sql = "update ev_article_cate1 set is_delete=1 where id=?"
    db.query(sql, req.params.id, (err, results) => {
        if (err) return res.cc(err)
        if (results.affectedRows !== 1) return res.cc("删除文章分类失败！")
        res.cc("删除文章分类成功！", 0)
    })
}

// 根据id获取文章分类数据
exports.getArtCateById = (req, res) => {
    const sql = "select * from ev_article_cate1 where id=?"
    db.query(sql, req.params.id, (err, results) => {
        if (err) return res.cc(err)
        if (results.length !== 1) res.cc("获取文章分类失败！")
        res.send({
            status: 0,
            message: "获取文章分类成功！",
            data: results[0]
        })
    })
}

// 根据id更新文章分类
exports.updateCateById = (req, res) => {
    const sql = "select * from ev_article_cate1 where id!=? and (name=? or alias=?)"
    db.query(sql, [req.body.id, req.body.name, req.body.alias], (err, results) => {
        if (err) return res.cc(err)
        if (results.length === 2) return res.cc("分类名称与分类别名均已被占用，请更换重试！")
        if (results.length === 1 && results[0].name === req.body.name && results[0].name === req.body.name) return res.cc("分类名称与分类别名均已被占用，请更换重试！")
        if (results.length === 1 && results[0].name === req.body.name) return res.cc("分类名称被占用，请更换重试！")
        if (results.length === 1 && results[0].alias === req.body.alias) return res.cc("分类别名被占用！")
        // 实现更新功能
        const sql = "update ev_article_cate1 set ? where Id=?"
        db.query(sql, [req.body, req.body.Id], (err, results) => {
            if (err) return res.cc(err)
            if (results.affectedRows !== 1) return res.cc("更新文章分类失败！")
            res.cc("更新文章分类成功！")
        })
    })
}