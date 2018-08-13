import React from "react";
import { connect } from "react-redux";
import { List, Badge } from "antd-mobile";
import "antd-mobile/dist/antd-mobile.css";
import { getChatListSync, newMsgListener } from "../../../redux/chat.redux";
import styled from "styled-components";

@connect(
  state => state,
  { getChatListSync, newMsgListener }
)
class Msg extends React.Component {
  componentDidMount() {
    if (this.props.chat.chatList.length < 1) {
      this.props.getChatListSync();
      this.props.newMsgListener();
    }
  }

  render() {
    //   按聊天分组
    const chatGroup = {};
    this.props.chat.chatList.forEach(element => {
      chatGroup[element.chatId] = chatGroup[element.chatId] || [];
      chatGroup[element.chatId].push(element);
    });
    // Object.values(数组).将所有的值作为数组返回. 这样每一个聊天回话就是一个数组。会话中的信息也是数组
    const chatSessions = Object.values(chatGroup);
    // 根据每一个会话的最后一项的时间戳排序
    chatSessions.sort((a, b) => {
      const a1 = a[a.length - 1].crate_time;
      const b1 = b[b.length - 1].crate_time;
      return b1 - a1;
    });

    // 遍历含有所有值得数组。每个会话作为一条列表显示
    // 可以根据第一条信息的 from 和 to 和当前的用户比较，确定这个会话是谁。再根据 redux 中的 users 数组得到名称和头像
    return (
      <div>
        {chatSessions.map(x => {
          // 判断当前会话的另一方
          const from = x[0].from === this.props.user._id ? x[0].to : x[0].from;
          const user = this.props.chat.users[from];
          const unread = x.filter(x => x.from === from && x.read !== true).length;
          return (
            <List>
              {user && (
                  <List.Item
                    thumb={require("../../../../public/images/" +
                      user.avator +
                      ".jpg")}
                    onClick={() => this.props.history.push("/chat/" + from)}
                    extra={<Badge text={unread} />}
                    arrow="horizontal"
                  >
                    {x[x.length - 1].content}
                    <List.Item.Brief>{user.user}</List.Item.Brief>
                  </List.Item>
                )}
            </List>
          );
        })}
      </div>
    );
  }
}

export default Msg;