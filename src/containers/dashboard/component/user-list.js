import React from "react";
import { Card, WingBlank, WhiteSpace } from "antd-mobile";
import "antd-mobile/dist/antd-mobile.css";
import { withRouter } from 'react-router-dom';

@withRouter
class UserList extends React.Component {

  enterChat(user) {
    this.props.history.push('/chat/'+user);
  }

  render() {
    const userList = this.props.userList;
    return (
      <WingBlank>
        {userList.map(x => (
          <div key={x._id}>
            <WhiteSpace />
            <Card key={x._id} onClick={() => this.enterChat(x._id)}>
              <Card.Header
                title={x.user}
                thumb={require("../../../../public/images/" +
                  x.avator +
                  ".jpg")}
                thumbStyle={{ width: "50px", height: "50px" }}
                extra={<span>{x.title}</span>}
              />
              <Card.Body>
                {x.desc.split("\n").map(v => <p key={v}>{v}</p>)}
              </Card.Body>
              {x.type == 'boss' && <Card.Footer content={'公司名称：' + (x.company ? x.company : '暂无信息')} extra={<span>薪资：{x.money}</span>} />}              
            </Card>
          </div>
        ))}
      </WingBlank>
    );
  }
}

export default UserList;


