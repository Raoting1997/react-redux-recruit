import React from "react";
import { connect } from "react-redux";
import { Result, List, Button, WhiteSpace, Modal } from "antd-mobile";
import { logoutSync } from "../../../redux/user.redux";
import { Redirect, withRouter } from "react-router-dom";

// 直接从 redux 中取数据就好，因为在获取用户信息的时候我们已经把用户的信息存在了 redux.user 中
@connect(
  state => ({ user: state.user }),
  { logoutSync }
)
@withRouter
class Me extends React.Component {
  onClickHandler() {
    const alert = Modal.alert;

    alert("退出", "确认退出吗", [
      { text: "取消", onPress: () => console.log("cancel") },
      { text: "确定", onPress: () => this.props.logoutSync() }
    ]);
  }

  render() {
    const { user } = this.props;
    return (
      <div>
        {user.redirectTo && <Redirect to={user.redirectTo} />}
        {user.avator && (
          <div>
            <Result
              img={
                <img
                  alt=""
                  style={{ width: "70px", borderRadius: "50%" }}
                  src={require("../../../../public/images/" +
                    user.avator +
                    ".jpg")}
                />
              }
              title={user.user}
              message={user.company ? user.company : null}
            />
            <List renderHeader="简介">
              <List.Item>
                {user.title}
                <List.Item.Brief>
                  {user.desc.split("\n").map(v => <div key={v}>{v}</div>)}
                </List.Item.Brief>
                {user.money && (
                  <List.Item.Brief>薪资：{user.money}</List.Item.Brief>
                )}
              </List.Item>
            </List>
            <WhiteSpace />
            <Button onClick={() => this.onClickHandler()}>退出登录</Button>
          </div>
        )}
      </div>
    );
  }
}

export default Me;
