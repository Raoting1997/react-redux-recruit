// 和用户相关的接口都在这里
const express = require("express");
const utility = require("utility");

const model = require("./model");
const User = model.getModel("user");
const Chat = model.getModel("chat");

const Router = express.Router();

Router.get("/info", (req, res) => {
  // 判断用户有没有 cookie
  const { userId } = req.cookies;
  if (!userId) {
    return res.json({
      code: 1,
      msg: "没有登录"
    });
  }
  User.findOne({ _id: userId }, { password: 0 }, (err, doc) => {
    if (err) {
      return res.json({
        code: 1,
        msg: "服务端出错了"
      });
    }
    if (doc) {
      return res.json({
        code: 0,
        data: doc
      });
    }
  });
});

// 注册接口
Router.post("/register", (req, res) => {
  const { user, password, type } = req.body;
  // 判断用户是不是已经存在了
  User.findOne({ user }, (err, doc) => {
    if (doc) {
      return res.json({
        code: 1,
        msg: "用户名重复",
        data: doc
      });
    }
    // 注册的时候也要添加一次 cookie
    const newUser = new User({ user, password: encryption(password), type });
    newUser.save((err, doc) => {
      if (err) {
        return res.json({
          code: 1,
          msg: "服务端出错了"
        });
      }
      // 不要全部的信息
      const { user, type, _id } = doc;
      res.cookie("userId", _id);
      return res.json({
        code: 0,
        data: { user, type, _id }
      });
    });
  });
});

// 登陆接口
Router.post("/login", (req, res) => {
  const { user, password } = req.body;
  User.findOne(
    { user, password: encryption(password) },
    { password: 0 },
    (err, doc) => {
      if (err) {
        return res.json({
          code: 1,
          msg: "服务端出错了"
        });
      }
      if (doc) {
        // 登陆成功了之后要添加 cookie
        res.cookie("userId", doc.id);
        return res.json({
          code: 0,
          data: doc
        });
      }
      return res.json({
        code: 1,
        msg: "用户名或密码错误"
      });
    }
  );
});

// 前端完善信息接口
Router.post("/updata", (req, res) => {
  // 获取 cookie 判断用户是否登陆
  const { userId } = req.cookies;
  if (!userId) {
    return res.json({
      code: 1,
      msg: "没有登陆"
    });
  }
  User.findByIdAndUpdate(userId, req.body, (err, doc) => {
    if (err) {
      return res.json({
        code: 1,
        msg: "服务端出错了"
      });
    }
    if (doc) {
      return res.json({
        code: 0,
        data: Object.assign(
          {},
          {
            user: doc.user,
            type: doc.type
          },
          req.body
        )
      });
    }
  });
});

// 获取所有用户信息
Router.get("/list", (req, res) => {
  const { type } = req.query;
  User.find({ type }, (err, doc) => {
    if (doc) {
      return res.json({ code: 0, data: doc });
    }
    if (err) {
      return res.json({ code: 1, msg: "服务端出错了" });
    }
  });
});

// 退出登陆
Router.get("/logout", (req, res) => {
  res.cookie("userId", "");
  return res.json({
    code: 0
  });
});

// 获取指定用户的所有相关信息
// 除了返回聊天列表之外，还要返回所有用户的信息（名称与头像）
Router.get("/chatList", (req, res) => {
  const { userId } = req.cookies;
  // {$or: [{from: userId, to: userId}]}
  User.find({}, (err, userDoc)=>{
    if(!err && userDoc) {
      const users = {};
      userDoc.forEach(element => {
        users[element._id] = {user: element.user, avator: element.avator}
      });
      Chat.find({
          $or: [{ from: userId }, { to: userId }]
        },
        (err, doc) => {
          if (err) {
            return res.json({
              code: 1,
              msg: "服务端出错了"
            });
          }
          if (doc) {
            return res.json({
              code: 0,
              data: doc,
              users
            });
          }
        });
    }
  });
});

// 标记已读消息。参数是 发送者
Router.post('/readMsg', (req, res) => {
  const { from } = req.body;
  const { userId } = req.cookies;
  Chat.update({from, to: userId},{$set:{read: true}},{'multi': true}, (err, doc)=>{
    if(!err) {
      res.json({ code: 0, num: doc.nModified});
    }
  })
});

//定义一个函数双重加密，使他不能被反加密出来，因为这是 非对称加密
const encryption = password => {
  const encryString = "raoting_first";
  return utility.md5(utility.md5(password + encryString));
};

module.exports = Router;
