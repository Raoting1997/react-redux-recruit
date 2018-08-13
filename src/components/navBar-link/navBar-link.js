import React from "react";
import { TabBar } from "antd-mobile";
import "antd-mobile/dist/antd-mobile.css";
import { withRouter } from "react-router-dom";
import styled from "styled-components";
import { connect } from "react-redux";

@connect(state => state.chat)
@withRouter
class NavBarLink extends React.Component {
  render() {
    const navBarList = this.props.data.filter(x => !x.hide);
    const { pathname } = this.props.location;

    return (
      <Container>
        <TabBar>
          {navBarList.map(x => (
            <TabBar.Item
              key={x.path}
              title={x.text}
              badge={x.path === "/msg" ? this.props.unread : null}
              icon={{ uri: require("./img/" + x.icon + ".png") }}
              selectedIcon={{ uri: require("./img/" + x.icon + "-active.png") }}
              selected={pathname == x.path}
              onPress={() => {
                this.props.history.push(x.path);
              }}
            />
          ))}
        </TabBar>
      </Container>
    );
  }
}

export default NavBarLink;

const Container = styled.div`
  width: 100%;
  position: fixed;
  bottom: 0;
`;
