import React from "react";
import Logo from "../../components/logo/logo";
import {
  InputItem,
  Button,
  WingBlank,
  WhiteSpace,
  List,
  Radio
} from "antd-mobile";
import { Redirect, withRouter } from 'react-router-dom';
import { connect } from "react-redux";
import "antd-mobile/dist/antd-mobile.css";

import Buttom from "../../components/bottom";
import { registerSync } from "../../redux/user.redux";
import Msg from '../../components/msg';
import FromHOC from '../../components/from-hoc';

@FromHOC@connect(
  state => ({ state: state.user }),
  { registerSync }
)@withRouter
class Register extends React.Component {
  constructor(porps) {
    super(porps);
    this.registerHandle = this.registerHandle.bind(this);
  }

  componentDidMount() {
    console.log(this.props);
    this.props.onChangeHandle('type', 'genius');
  }

  registerHandle() {
    this.props.registerSync(this.props.data);
  }

  render() {
    const { type } = this.props.data;
    const { redirectTo } = this.props.state;
    console.log(redirectTo);
    return (
      <div>
        <WingBlank>
          {redirectTo && (
            <Redirect to={redirectTo} />
          )}
          <Logo />
          {this.props.state.msg && <Msg>{this.props.state.msg}</Msg>}
          <List renderHeader="填写信息">
            <InputItem
              onChange={v => {
                this.props.onChangeHandle("user", v);
              }}
            >
              用户名
            </InputItem>
            <InputItem
              type="password"
              onChange={v => {
                this.props.onChangeHandle("password", v);
              }}
            >
              密码
            </InputItem>
            <InputItem
              type="password"
              onChange={v => {
                this.props.onChangeHandle("repeatPassword", v);
              }}
            >
              确认密码
            </InputItem>
          </List>
          <List renderHeader="选择角色">
            <Radio.RadioItem
              checked={type === "boss"}
              onChange={() => this.props.onChangeHandle("type", "boss")}
            >
              Boss
            </Radio.RadioItem>
            <Radio.RadioItem
              checked={type === "genius"}
              onChange={() => this.props.onChangeHandle("type", "genius")}
            >
              Genius
            </Radio.RadioItem>
          </List>
          <WhiteSpace />
          <Buttom>
            <Button type="primary" onClick={this.registerHandle}>
              注册
            </Button>
          </Buttom>
        </WingBlank>
      </div>
    );
  }
}

export default Register;
