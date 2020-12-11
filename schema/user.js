// 用户信息验证规则模块
// 导入
const joi = require('@hapi/joi')
// 用户名的验证规则
const username = joi.string().alphanum().min(1).max(10).required()
// 密码的验证规则
const password = joi.string().pattern(/^[\S]{6,12}$/).required()
// 定义id，nickname，email的验证规则
const id = joi.number().integer().min(1).required()
const nickname = joi.string().required()
const email = joi.string().email().required()
const avatar = joi.string().dataUri().required()
// 注册和登录表单的验证规则对象！
exports.reg_login_schema = {
    // 表示需要对 req.body 中的数据进行验证
    body: {
        username,
        password,
    },
}

// 将定义的id nickname email 规则暴露出去
exports.update_userInfo_schema = {
    body: {
        id,
        nickname,
        email
    }
}

// 修改密码验证规则共享
exports.update_password_schema = {
    body: {
        oldPwd: password,
        newPwd: joi.not(joi.ref('oldPwd')).concat(password)
    }
}

// 头像验证规则
exports.update_avatar_schema = {
    body: {
        avatar
    }
}