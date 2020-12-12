// 检验文章数据模块
// 导入定义规则的模块
const joi = require("@hapi/joi")

// 定义分类名称和分类别名的验证规则
const name = joi.string().required()
const alias = joi.string().alphanum().required()

// 定义id验证规则
const id = joi.number().integer().min(1).required()

// 将校验规则对象共享出去
exports.add_cate_schema = {
    body: {
        name,
        alias
    }
}

// 将id的验证规则共享出去
exports.delete_cate_schema = {
    params: {
        id,
    },
}

// 将定义的根据id获取文章分类规则指向出去
exports.get_cate_schema = {
    params: {
        id,
    },
}
// 校验规则对象 - 更新分类
exports.update_cate_schema = {
    body: {
        Id: id,
        name,
        alias,
    },
}