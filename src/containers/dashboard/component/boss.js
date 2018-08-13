/* eslint no-unused-expressions: off */

import React from "react";
import { connect } from "react-redux";

import { getUserListSync } from "../../../redux/chat.redux";
import UserList from "./user-list";

@connect(
  state => ({ chat: state.chat }),
  { getUserListSync }
)
class Boss extends React.Component {
  componentDidMount() {
    this.props.getUserListSync("genius");
  }

  render() {
    const { userList } = this.props.chat;
    console.log(userList);
    return (
        <UserList userList={userList}/>
    );
  }
}

export default Boss;
