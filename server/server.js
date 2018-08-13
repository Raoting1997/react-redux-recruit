const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const userRoute = require("./user");

const model = require("./model");
const Chat = model.getModel("chat");

// 新建 app
const app = express();
// 要想使 socket.io 与 express 一起工作。需要先将 http 模块引入，然后用 http.Server 方法吧 app 包裹一层，在传入 socket.io 中
const server = require("http").Server(app);
const io = require("socket.io")(server);

// io是整个应用的 socket 连接
// 里面的参数是当前一次的 socket 连接
io.on("connection", socket => {
  console.log("连接成功");
  socket.on("oneMsg", data => {
    console.log(data);
    // 接收到消息之后广播一次，让所有人知道有消息了,
    // 将消息存储到数据库中。将 from 和 to 排序连接连接起来作为chatId 。如果直接连接起来的话，返回的聊天会话的信息会不完整。
    // 注意：后端返回给前端的是 与 那个用户相关的所有消息记录，前端需要根据 from 和 to 和这个方法一样生成一个 chatId 来找对应的会话
    // 首先：一个人可以有多个会话。也就是 from 是他的会有多个
    // 两个人之间的会话需要一个唯一的 Id 来标识，chatId 是那个的全部都是他们两个的消息记录.
    const chatId = [data.from,data.to].sort().join('_');
    const temp = Object.assign({}, data, { chatId: chatId });
    Chat.create(temp, (err, doc) => {
      if (!err) {
          console.log('存储成功了');
        io.emit("globalMsg", data);
      }
    });
  });
});

// 使用两个引入的中间件
// 将要公共使用的中间件放在路由中间件的前面
app.use(bodyParser.json());
app.use(cookieParser());

app.use("/user", userRoute);

// 启动服务
server.listen(3003, function() {
  console.log("node App start at port 3003");
});
