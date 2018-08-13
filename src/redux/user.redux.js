import axios from 'axios';
import { getRedirectPath } from '../utils';
// 在这里写用户点击登录注册发送请求的逻辑
// 将用户名、密码、登录状态、错误信息等在很多地方都会用到的信息放在 redux 中
// action 的动作会有：点击注册后注册成功、点击登陆后登陆成功、有错误提示错误信息（用户名或者密码为空、两次密码不一致等）
// 在获取用户信息的时候将用户的信息存入 store 中

const AUTH_SUCCESS = 'auth_success'
// const REGISTER_SUCCESS = 'register_success';
// const LOGIN_SUCCESS = 'login_success';
const ERROR_MESSAGE = 'error_message';
const SET_USER_INFO = 'ser_user_info';
const LOGOUT = 'LOGOUT';

const initialState = {
    msg: '',
    user: '',
    redirectTo: '',
}

// 因为与用户相关的信息都在 User 集合中，因此对登陆、注册、完善信息的操作可以作为一类操作在 reducer 中， 因为登陆 注册 完善信息的 reducer 逻辑是一样的。并且在有了 cookie 的验证之后，就不需要isAuth 了

// reducer
export const user = (state=initialState, action) => {
    switch(action.type) {
        case AUTH_SUCCESS:
            return { ...state, ...action.payload, redirectTo: getRedirectPath(action.payload)};
        // case REGISTER_SUCCESS:
        //      return { ...state, redirectTo: getRedirectPath(action.payload), isAuth: true, ...action.payload, msg: ''};       
        // case LOGIN_SUCCESS:
        //     return { ...state, redirectTo: getRedirectPath(action.payload), isAuth: true, ...action.payload, msg: ''};
        case ERROR_MESSAGE:
            return { ...state, isAuth: false, msg: action.msg};
        case SET_USER_INFO: 
            return { ...state, ...action.payload};
        case LOGOUT: 
            return { redirectTo: '/login'};
        default:
             return state;
    }
}

// action creator
const error_message = (msg) => {
    return {
        msg,
        type: ERROR_MESSAGE
    }
}

const auth_success = (data) => {
    return {
        type: AUTH_SUCCESS,
        payload: data
    }
}

// 获取用户信息的时候设置当前的 store
export const set_user_info = (data) => {
    return {
        type: SET_USER_INFO,
        payload: data,
    }
}

const logout = () => {
    return {
        type: LOGOUT
    }
}

// 发送异步请求 
// 注册
export const registerSync = ({user, password, repeatPassword, type}) => {
    if(!user || !password || !repeatPassword) {
        return error_message('用户名或密码不能为空');
    }
    if( password !== repeatPassword) {
        return error_message('两次输入密码不一致');
    }
    return dispatch => {
        axios.post('/user/register', {user, password, type}).then((res) => {
            if(res.data.code === 0) {
                dispatch(auth_success(res.data.data));
            } else {
                dispatch(error_message(res.data.msg));
            }
        })
    }
}

// login
export const loginSync = ({ user, password}) => {
    if(!user || !password) {
        return error_message('用户名或密码为空');
    }
    return dispatch => {
        axios.post('/user/login', { user, password}).then((res)=> {
            console.log(res);
            if(res.data.code === 0) {
                dispatch(auth_success(res.data.data));
            } else {
                dispatch(error_message(res.data.msg))
            }
        })
    }
}

// updata
export const updataSync = (data) => {
    return dispatch => {
        axios.post('/user/updata', data).then((res)=> {
            if(res.data.code === 0 && res.status === 200) {
                dispatch(auth_success(res.data.data));
            } else {
                dispatch(error_message(res.data.msg));
            }
        })
    }
}

// logout
export const logoutSync = () => {
    return dispatch=>{
        axios.get('/user/logout').then((res)=>{
            if(res.status === 200 && res.data.code ===0) {
                dispatch(logout());
            } else {
                dispatch(error_message('res.data.msg'));
            }
        })
    }
}