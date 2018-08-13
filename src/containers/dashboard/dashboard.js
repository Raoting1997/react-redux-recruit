import React from "react";
import { connect } from "react-redux";
import { NavBar } from "antd-mobile";
import "antd-mobile/dist/antd-mobile.css";
import { Switch, Route } from "react-router-dom";
import styled from 'styled-components';

import NavBarLink from "../../components/navBar-link/navBar-link";
import Boss from "./component/boss";
import Genius from "./component/genius";
import Me from './component/me';
import Msg from './component/msg';
import {
  getChatListSync,
  newMsgListener
} from "../../redux/chat.redux";

// 需要用到 redux 中的 状态
@connect(
  state => state,
  {getChatListSync, newMsgListener}
)
class DashBoard extends React.Component {

  componentDidMount() {
    if (this.props.chat.chatList.length <1) {
      this.props.getChatListSync();
      this.props.newMsgListener();
    }
  }

  render() {

    console.log("props.user", this.props.user);

    // 在这里定义 显示 标签列表的数据，页面有 Boss、genius、msg、me等。信息有
    const tabBarList = [
      {
        path: "/boss",
        text: "牛人",
        title: "牛人列表",
        icon: "commun",
        component: Boss,
        hide: this.props.user.type == "genius"
      },
      {
        path: "/genius",
        text: "Boss",
        title: "Boss列表",
        icon: "home",
        component: Genius,
        hide: this.props.user.type == "boss"
      },
      {
        path: "/msg",
        text: "消息",
        title: "消息列表",
        icon: "msg",
        component: Msg
      },
      {
        path: "/me",
        text: "我的",
        title: "个人中心",
        icon: "user",
        component: Me
      }
    ];

    const { pathname } = this.props.location;

    return (
      <div>
        <Nav>
          {tabBarList.find(v => v.path === pathname).title}
        </Nav>
        {/* 在这里写路由 */}
        <Content>
          <Switch>
            {tabBarList.map(x => (
              <Route key={x.path} path={x.path} component={x.component} />
            ))}
          </Switch>
        </Content>
        <NavBarLink data={tabBarList} />
      </div>
    );
  }
}

export default DashBoard;

const Nav = styled(NavBar)`
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 999;
`;

const Content = styled.div`
    margin-top: 50px;
    margin-bottom: 70px;
`;