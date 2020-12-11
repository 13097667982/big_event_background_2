// 这个文件作为路由模块
const express = require("express")
const router = express.Router()
// 导入用户路由处理函数对应的模块
const user_handler = require("../router_handler/user")
// 导入验证表单数据的中间件 
const expressJoi = require("@escook/express-joi")
// 导入需要的验证规则对象模块
const { reg_login_schema } = require("../schema/user")
// 注册新用户
router.post("/reguser", expressJoi(reg_login_schema), user_handler.regUser)

// 登录
// 登录的路由
router.post('/login', expressJoi(reg_login_schema), user_handler.login)



// 将路由共享出去
module.exports = router