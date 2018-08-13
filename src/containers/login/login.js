import React from "react";
import Logo from "../../components/logo/logo";
import { InputItem, Button, WingBlank, WhiteSpace } from "antd-mobile";
import "antd-mobile/dist/antd-mobile.css";
import { connect } from "react-redux";
import { Redirect, withRouter } from "react-router-dom";

import Buttom from "../../components/bottom";
import { loginSync } from "../../redux/user.redux";
import Msg from "../../components/msg";
import FromHOC from '../../components/from-hoc'

// hello 还是之前的 hello，只是被包装了一层
// let hello = () => {
//   console.log("yuan ben de hello");
// };

// // 函数式编程
// function Warp(fn) {
//   return function() {
//     console.log("before");
//     fn();
//     console.log("after");
//   };
// }
// hello = Warp(hello);
// hello();


@FromHOC@connect(
  state => ({ state: state.user }),
  { loginSync }
)@withRouter
class Login extends React.Component {

  constructor(props) {
    super(props);
    this.loginHandle = this.loginHandle.bind(this);
    this.toRegister = this.toRegister.bind(this);
  }

  loginHandle() {
    console.log(this.props);
    this.props.loginSync(this.props.data);
    console.log(this.props.data);
  }

  toRegister() {
    console.log(this.props);
    this.props.history.push("/register");
  }

  render() {
    const { msg, redirectTo } = this.props.state;
    return (
      <div>
        <WingBlank>
          <Logo />
          {msg && <Msg>{msg}</Msg>}
          {redirectTo && <Redirect to={redirectTo} />}
          <InputItem onChange={v => this.props.onChangeHandle("user", v)}>
            用户名
          </InputItem>
          <InputItem
            onChange={v => this.props.onChangeHandle("password", v)}
            type="password"
          >
            密码
          </InputItem>
          <WhiteSpace />
          <Button type="primary" onClick={this.loginHandle}>
            登录
          </Button>
          <WhiteSpace />
          <Buttom>
            <Button type="primary" onClick={this.toRegister}>
              注册
            </Button>
          </Buttom>
        </WingBlank>
      </div>
    );
  }
}

export default Login;
