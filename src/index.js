import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { 
    BrowserRouter,
    Route,
    Switch
 } from 'react-router-dom';


import { reducers } from './reducers';
import './axios.config';
import Login from './containers/login/login';
import Register from './containers/register/register';
import AuthRoute from '../src/components/authRoute/authRoute';
import BossInfo from '../src/containers/boss-info/boss-info';
import GeniusInfo from './containers/genius-info/genius-info';
import Dashboard from './containers/dashboard/dashboard';
import Chat from './components/chat';

const store = createStore(
    reducers, 
    compose(
        applyMiddleware(thunk),
        window.devToolsExtension ? window.devToolsExtension() : () => {}
))

ReactDOM.render(
    (<Provider store={store}>
        <BrowserRouter>
            <div>
                <AuthRoute />
                <Switch>
                    <Route path='/login' exact component={Login}></Route>
                    <Route path='/register' component={Register}></Route>
                    <Route path='/bossInfo' component={BossInfo}></Route>
                    <Route path='/geniusInfo' component={GeniusInfo}></Route>
                    <Route path='/chat/:user' component={Chat}></Route>
                    {/* 
                        没有匹配的路由的时候就会走这里
                        牛人列表、Boss列表、me、msg 等页面有部分东西是一样的，所以将他们放在一个路由里
                        他们是 tabbar ，有相同的 header 和 footer
                    */}
                    <Route component={Dashboard}></Route> 
                </Switch>
            </div>
        </BrowserRouter>
    </Provider>), 
    document.getElementById('root'));

