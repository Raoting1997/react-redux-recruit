const mongoose = require('mongoose');


// 连接 mongoDB, 并且使用 imooc 这个集合，如果没有的话会新建一个 imooc 集合
mongoose.connect('mongodb://localhost:27017/imooc');
mongoose.connection.on('connected', () => console.log('connection success'));

const models = {
    user: {
        'user': {type: String, require: true},
        'password': {type: String, require: true},
        'type': {type: String, require: true},
        'avator': {type: String, require: true},
        // 个人简介或者职位简介
        'desc': {type: String},
        // 职位名
        'title': {type: String},
        // Boss 的字段
        'company': {type: String},
        'money': {type: String}
    },
    chat: {
        'chatId': {type: String, require: true},
        'from': {type: String, require: true},
        'to': {type: String, require: true},
        'read': {type: Boolean, default: false},
        'crate_time': {type: Number, require: true, default: new Date().getTime()},
        'content': {type: String, require: true},
    }
}

// 动态的生成模型
for(let m in models) {
   mongoose.model(m, new mongoose.Schema(models[m])); 
}

module.exports = {
    getModel: function (name){
        // 要返回
        return mongoose.model(name);
    }
}
