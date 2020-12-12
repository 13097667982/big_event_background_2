// 导入
const express = require("express")
// 为表单中携带的每个数据项，定义验证规则
const joi = require("@hapi/joi")
// 导入解析token的中间件
const config = require("./config")
const expressJwt = require("express-jwt")
// 注册创建服务器
const app = express()
// 需要多次调用 res.send() 向客户端响应 处理失败 的结果，为了简化代码，可以手动封装一个 res.cc() 函数
// 所有路由之前，声明一个全局中间件，为 res 对象挂载一个 res.cc() 函数 ：
app.use((req, res, next) => {
    res.cc = (err, status = 1) => {
        res.send({
            status,
            message: err instanceof Error ? err.message : err
        })
    }
    next()
})
// 配置跨域中间件
const cors = require("cors")
app.use(cors())
// 配置解析表单的中间件  express内置  只能解析x-www-urlencoded......格式
app.use(express.urlencoded({ extended: false }))
// 托管静态资源
app.use('/uploads', express.static('./uploads'))
// 指定哪些接口不需要token认证
app.use(expressJwt({ secret: config.jwtSecretKey }).unless({
    path: [/^\/api\//]
}))

// 调用模块化路由  用户路由模块
const userRouter = require("./router/user")
// 将模块化路由挂载到全局
app.use("/api", userRouter)
// 导入个人中心模块路由
const userinfoRouter = require("./router/userinfo")
app.use("/my", userinfoRouter)

// 导入文章分类模块路由
const artCateRouter = require("./router/artcate")
app.use("/my/article", artCateRouter)

// 导入文章模块并挂载到全局
const articleRouter = require("./router/article")
app.use('/my/article', articleRouter)

// 错误级别中间件
app.use((err, req, res, next) => {
    // 数据验证失败
    if (err instanceof joi.ValidationError) return res.cc(err)

    // 捕获身份认证失败的错误
    if (err.name == 'UnauthorizedError') return res.cc("身份认证失败！")

    // 未知错误
    res.cc(err)
})

app.listen("3007", () => {
    console.log("api server running at http://127.0.0.1:3007");
})