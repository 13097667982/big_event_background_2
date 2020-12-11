const express = require("express")
const router = express.Router()
// 导入验证的中间件
const expressJoi = require("@escook/express-joi")
// 导入验证规则模块
const { update_userInfo_schema, update_password_schema, update_avatar_schema } = require("../schema/user")
// 获取用户中心模块的处理函数
const userinfo_handler = require('../router_handler/userinfo')
// 挂载获取用户中心模块路由 
router.get("/userinfo", userinfo_handler.getUserInfo)

// 更新用户信息
router.post("/userinfo", expressJoi(update_userInfo_schema), userinfo_handler.updateUserInfo)

// 修改密码模块
router.post("/updatepwd", expressJoi(update_password_schema), userinfo_handler.updatePassword)

// 更新头像模块
router.post('/update/avatar', expressJoi(update_avatar_schema), userinfo_handler.updateAvatar)





// 将用户信息模块路由暴露出去
module.exports = router