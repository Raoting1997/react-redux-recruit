/* eslint no-unused-expressions: off */

import React from "react";
import { Card, WingBlank, WhiteSpace } from "antd-mobile";
import "antd-mobile/dist/antd-mobile.css";
import { connect } from "react-redux";

import { getUserListSync } from "../../../redux/chat.redux";
import UserList from "./user-list";

@connect(
  state => ({ chat: state.chat }),
  { getUserListSync }
)
class Genius extends React.Component {
  componentDidMount() {
    this.props.getUserListSync("boss");
  }

  render() {
    const { userList } = this.props.chat;
    console.log(userList);
    return (
      <UserList userList={userList} />
    );
  }
}

export default Genius;
