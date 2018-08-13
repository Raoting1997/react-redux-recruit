import React from "react";
import { InputItem, Toast, NavBar, List, Grid, Icon } from "antd-mobile";
import "antd-mobile/dist/antd-mobile.css";
import { connect } from "react-redux";

import {
  getChatListSync,
  sendNewMsg,
  newMsgListener,
  readMsgSync
} from "../redux/chat.redux";
import { getChatId } from '../../src/utils';

@connect(
  state => state,
  { getChatListSync, sendNewMsg, newMsgListener, readMsgSync }
)
class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      content: "",
      showEmoji: false
    };
  }

  componentDidMount() {
    //   将获取聊天记录和监听新消息放在 dashboard 中之后刷新 chat 的时候 redux 中的数据就没有了。所以需要在 chat 中在 获取一次
    if (this.props.chat.chatList.length < 1) {
      this.props.getChatListSync();
      this.props.newMsgListener();
    }
  }

  componentWillUnmount() {
      const from = this.props.match.params.user;
      this.props.readMsgSync(from);
  }

  emitMsg() {
    if (!this.state.content) {
      return Toast.info("不能发送空消息哦", 1);
    }

    const from = this.props.user._id;
    const to = this.props.match.params.user;

    // 发送新消息
    this.props.sendNewMsg({ from, to, content: this.state.content });
    this.props.getChatListSync();    
    this.setState({ content: "" });
  }

  render() {
    const from = this.props.match.params.user;
    const to = this.props.user._id    
    const { users } = this.props.chat;

    const chatId = getChatId(from, to);
    const chatList = this.props.chat.chatList.filter((v)=>v.chatId === chatId);

    const emoji = "😀 😁 😂 😄 😅 😆 😇 😉 😊 🙂 🙃 😋 😌 😍 😘 😏 🤗 😎 🤓 🤑 😝 😜 😙 😶 😑 😒 🙄 🤔 😳 😞 😟 😫 😖 😣 😕 😔 😡 😠 😑 😶 😠 😡 😔 😕 😣 😖 😫 😤 😮 😱 😨 😰 😯 😦 😢 😥 🤕 😴 💤 💩 😈 👹 👺 💀 👻 👽 🤖 👏 👋 👍 👎 👊 👌 ✋ 💪 🙏 ☝ ️ 👆 👇 👈 👉 🖐 🤘 ✍ ️💅 👄 👅 👂 👃 👁 👀 🗣 👶 👦 👧 👩 👱 👴 👵 👲 👳 👮 👷 💂 🕵 🎅 👼 👸 👰 🚶 🏃 💃 👯 👫 👬 👭 🙇 💁 🙅 🙋 💇 💆 💑 💏 👪 👨 ‍ 👩 ‍ 👧 ‍ 👦 👕 👖 👔 👗 👙 👘 💄 💋 👣 👠 👡 👢 👞 👟 👒 🎩 ⛑ 🎓 👑 🎒 👝 👛 👜 💼 👓 🕶 💍"
      .split(" ")
      .map(text => ({ text }));

    return (
      <div>
        <NavBar
          icon={<Icon type="left" />}
          onLeftClick={() => this.props.history.goBack()}
          style={{ position: "fixed", top: 0, width: "100%", zIndex: 999 }}
        >
         {users[from] && users[from].user}
        </NavBar>
        <div style={{ marginTop: "60px", marginBottom: "60px" }}>
          {chatList &&
            chatList.map(v => {
              return v.from === from ? (
                <List.Item thumb={users[from] && require('../../public/images/'+ users[from].avator + '.jpg')} key={v._id}>{users[from].user}：{v.content}</List.Item>
              ) : (
                <List.Item thumb={require('../../public/images/'+ this.props.user.avator + '.jpg')} key={v._id}>{this.props.user.user}：{v.content}</List.Item>
              );
            })}
        </div>
        <div
          style={{ position: "fixed", bottom: "0", width: "100%", zIndex: 999 }}
        >
          <InputItem
            onChange={v => this.setState({ content: v })}
            value={this.state.content}
            extra={
              <div>
                <span
                  style={{ marginRight: "16px" }}
                  onClick={() => {
                    this.setState({ showEmoji: !this.state.showEmoji });
                    window.dispatchEvent(new Event("resize"));
                  }}
                >
                  😀
                </span>
                <span onClick={() => this.emitMsg()}>发送</span>
              </div>
            }
          />
          {this.state.showEmoji && (
            <Grid
              data={emoji}
              isCarousel
              columnNum={10}
              carouselMaxRow={4}
              onClick={el =>
                this.setState({ content: this.state.content + el.text })
              }
            />
          )}
        </div>
      </div>
    );
  }
}

export default Chat;
