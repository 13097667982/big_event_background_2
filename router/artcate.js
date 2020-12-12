const express = require("express")
const router = express.Router()
// 导入验证模块中间件
const expressJoi = require("@escook/express-joi")
// 导入文章分类验证模块
const { add_cate_schema, delete_cate_schema, get_cate_schema, update_cate_schema } = require("../schema/artcate")
// 获取文章模块的处理函数
const artcate_handler = require("../router_handler/artcate")
// 获取文章分类的列表数据
router.get("/cates", artcate_handler.getArticleCates)

// 新增文章分类
router.post("/addcates", expressJoi(add_cate_schema), artcate_handler.addArticleCates)


// 删除文章分类
router.get("/deletecate/:id", expressJoi(delete_cate_schema), artcate_handler.deleteCateById)

// 根据id获取文章分类
router.get('/cates/:id', expressJoi(get_cate_schema), artcate_handler.getArtCateById)

// 根据id更新文章分类
router.post('/updatecate', expressJoi(update_cate_schema), artcate_handler.updateCateById)

// 共享路由
module.exports = router