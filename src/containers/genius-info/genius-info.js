import React from "react";
import {
  InputItem,
  List,
  TextareaItem,
  Button,
  WhiteSpace,
  WingBlank,
  NavBar
} from "antd-mobile";

import Buttom from "../../components/bottom";
import { connect } from "react-redux";
import { Redirect } from 'react-router-dom';
import { updataSync } from "../../redux/user.redux";
import SelectAvator from "../../components/select-avator/select-avator";

// 使用 connect 连接 redux 将数据保存到全局
@connect(
  state => ({ state: state.user }),
  { updataSync }
)
class GeniusInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  onChangeHandler(key, v) {
    this.setState({
      [key]: v
    });
  }

  render() {
      const currentPath = this.props.location.pathname;
      const { redirectTo } = this.props.state;
    return (
      <div>
          {(redirectTo && redirectTo !== currentPath) && <Redirect to={redirectTo}/>}
        <NavBar>牛人完善信息</NavBar>
        <SelectAvator
          selectAvator={v => {
            this.onChangeHandler("avator", v);
          }}
        />
        <List renderHeader="请完善求职相关信息">
          {this.renderInput("求职岗位", "title")}
          <TextareaItem title="个人简介" autoHeight rows={3} 
          onChange={v => {
            this.onChangeHandler("desc", v);
          }}
          />
        </List>
        <WhiteSpace />
        <WingBlank>
          <Buttom>
            <Button
              type="primary"
              onClick={() => this.props.updataSync(this.state)}
            >
              保存
            </Button>
          </Buttom>
        </WingBlank>
      </div>
    );
  }

  renderInput(title, key) {
    return (
      <InputItem
        onChange={v => {
          this.onChangeHandler(key, v);
        }}
      >
        {title}
      </InputItem>
    );
  }
}

export default GeniusInfo;
