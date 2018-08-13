import React from "react";
import SelectAvator from "../../components/select-avator/select-avator";
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
import "antd-mobile/dist/antd-mobile.css";

import { updataSync } from "../../redux/user.redux";

// 使用 connect 连接 redux 将数据保存到全局
@connect(
  state => ({ state: state.user }),
  { updataSync }
)
class BossInfo extends React.Component {
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
        <NavBar>Boss完善信息</NavBar>
        <SelectAvator
          selectAvator={v => {
            this.onChangeHandler("avator", v);
          }}
        />
        <List renderHeader="请完善职位相关信息">
          {this.renderInput("职位名称", "title")}
          {this.renderInput("公司名称", "company")}
          {this.renderInput("职位薪资", "money")}
          <TextareaItem title="职位要求" autoHeight rows={3} 
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

export default BossInfo;
