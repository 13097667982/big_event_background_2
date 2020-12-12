const path = require("path")
// 导入数据库
const db = require("../db/index")
// 发布文章模块
exports.addArticle = (req, res) => {
    // console.log(req.body);
    // console.log(req.file);
    // res.send('ok')
    // 判断用户是否上传了封面
    if (!req.file || req.file.fieldname !== 'cover_img') return res.cc("文章封面是必选参数")
    const articleInfo = {
        // 标题 内容 状态 所属分类的id
        ...req.body,
        // 文章封面在服务器端的存放路径
        cover_img: path.join('/uploads', req.file.filename),
        // 文章发布时间
        pub_date: new Date(),
        // 文章的作者
        author_id: req.user.id
    }
    // 定义发表文章的语句
    const sql = "insert into ev_articles2 set ?"
    db.query(sql, articleInfo, (err, results) => {
        if (err) return res.cc(err)
        if (results.affectedRows !== 1) return res.cc("发表文章失败")
        res.cc("发表文章成功！", 0)
    })
}