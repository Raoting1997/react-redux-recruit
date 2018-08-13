import React from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { set_user_info } from '../../redux/user.redux';
// 将普通组件使用 WithRouter 包裹一下就可以使用 路由组件的功能

@withRouter
@connect(null, { set_user_info })
class AuthRoute extends React.Component {
    componentDidMount() {
        // 当前如果是 登录页 或者 注册页 就不做处理(获取当前页是 this.porps.location.pathname)
        const pub = ['/login', '/register'];
        if(pub.indexOf(this.props.location.pathname) !== -1) {
            return null;
        }

        // 判断用户信息，是否登陆等,发送请求到后端，看看用户是否登陆
        axios.get('/user/info').then(res => {
            console.log(res);
            // 在这里判断是否有登陆信息，如果没有就跳转到 login
            if(res.data.code === 1) {
                console.log('没有登陆');
                this.props.history.push('./login');
            } else {
                this.props.set_user_info(res.data.data);
                console.log('已经登陆成功');
            }
        });

    }
    render() {
        return null;
    }
}

export default AuthRoute;