const tokenKey = 'token';
//它们都是将数据存储在本地缓存指定的key中，单个key最大数据长度为 1MB，所有数据存储上限为 10MB
//以下皆是同步缓存
export function setToken(token){ //读取
    return uni.setStorageSync(tokenKey,token);
};
export function getToken(){ //修改
    return uni.getStorageSync(tokenKey);  
};
export function removeToken(){ //删除
    return uni.removeStorageSync(tokenKey);
}