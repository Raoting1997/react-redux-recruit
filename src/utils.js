// 工具函数
export const getRedirectPath = ({ type, avator}) => {
    // 根据用户信息，返回跳转地址
    // user.type  Boss/Genius 根据 type 判断是牛人还是Boss
    // user.avator  bossInfo/geniusInfo 根据 avator 判断是否完善了信息，因为如果完善了信息就一定会有 avator ，所以只要有 avator 就可以判断已经完善了信息
    let url = (type==='boss') ? '/boss' : '/genius';
    if(!avator) {
        url += 'Info';
    }
    return url;
}

export const getChatId = (from, to) => {
    // 排序的目的是 不管 from 和 to 是双方的谁，生成的 Id 都是一样的
    const chatId = [from, to].sort().join('_');
    return chatId;
}