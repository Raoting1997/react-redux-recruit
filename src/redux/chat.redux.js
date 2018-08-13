import axios from 'axios';
import io from 'socket.io-client';

// 前端的端口是 3000， 后端的端口是 3003，要跨域，所以我们就需要手动设置一下.如果不需要跨域，就直接 io 就可以了
const socket = io("ws://localhost:3003");

// 与聊天相关的数据在这里
const GET_USER_LIST = 'GET_USER_LIST';

// 聊天信息
const CHAT_LIST = 'CHAT_LIST';
const RECE_MSG = 'RECE_MSG';
const UPDATA_UNREAD = 'UPDATA_UNREAD';


// reducer
export const chat = (state={userList: [], chatList: [], users: {}, unread: 0}, action) => {
    switch(action.type) {
        case GET_USER_LIST: 
            return {...state, userList: action.payload};
            // 初始化聊天信息的时候，把来自 from 是自己的过滤掉
        case CHAT_LIST:
            console.log(state);
            return {...state, chatList: action.payload, users: action.users, unread: action.payload.filter(x=>(!x.read && x.from !== action.user._id)).length};
        case RECE_MSG:
            const n = action.payload.from === action.user._id ? 0:1;
            return {...state, chatList: [...state.chatList, action.payload ], unread: state.unread + n};
        case UPDATA_UNREAD:
            return { ...state, chatList: state.chatList.map((v)=>({...v, read: v.from === action.from ? true : v.read})), unread: state.unread - action.num}
        default: 
            return state
    }
}

// 聊天列表
const get_user_list = (data) => {
    return {
        type: GET_USER_LIST,
        payload: data
    }
}

const chatList = (data, users, user) => {
    return {
        type: CHAT_LIST,
        payload: data,
        users,
        user
    }
}
const receMsg = (data, user) => {
    return {
        type: RECE_MSG,
        payload: data, 
        user
    }
}

const updataUnread = (from, num) => {
    return {
        type: UPDATA_UNREAD,
        from,
        num
    }
} 

// 获取聊天列表
export const getUserListSync = (type) => {
    return dispatch => {
        axios.get('/user/list?type='+ type).then((res)=> {
            console.log(res);
            if(res.status === 200 && res.data.code ===0) {
                dispatch(get_user_list(res.data.data));
            }
        })
    }
}

// 获取信息列表
export const getChatListSync = () => {
    return (dispatch, getState) => {
        axios.get('/user/chatList').then((res)=>{
            if(res.status === 200 && res.data.code ===0) {
                dispatch(chatList(res.data.data, res.data.users, getState().user));
            }
        })
    }
}

// 添加全局的监听。是否有新的消息，有新的消息的时候判断 from 是不是自己发送的。
export const newMsgListener = () => {
    return (dispatch, getState)=> {
        socket.on('globalMsg', (data)=> {
            dispatch(receMsg(data, getState().user));
        })
    }
}

// 发送消息
export const sendNewMsg = ({ from, to, content}) => {
    return dispatch => {
        socket.emit('oneMsg', { from, to, content});
    }
}

// 标记已读
// 逻辑：发送消息的时候都是 from-》发送者 to=》接受者
//      修改未读消息就是要在 接受者的页面中 把 发送者给接受者的消息改为已读
//      发送者：在接受者页面的 url 可以获得。接受者：在后端根据 cookies 可以 获取。前端可以通过 redux 获取
export const readMsgSync = (from)=> {
    return dispatch => {
        axios.post('user/readMsg', { from }).then((res)=>{
            if(res.status === 200 && res.data.code ===0) {
                dispatch(updataUnread(from, res.data.num));
            }
        })
    }
}