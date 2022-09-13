import Request from 'luch-request'
import baseUrl from "./config.js"
import {
	getToken
} from "./auth.js"
import {
	removeToken
} from "./auth.js";

const http = new Request()
http.setConfig((config) => {
	config.baseURL = baseUrl;
	config.header['Content-Type'] = 'application/json;charset=utf-8';
	return config
})
//请求拦截器
http.interceptors.request.use((config) => { // 可使用async await 做异步操作
	const token = getToken();
	if (token) {
		config.header["Authorization"] = 'Bearer ' + token;
	}
	return config
}, error => {
	return Promise.resolve(error)
})
//响应拦截器
http.interceptors.response.use((response) => {
	/* 对响应成功做点什么 可使用async await 做异步操作*/
	if (response.data.code === 500) {
		uni.showToast({
			icon: "error",
			title: response.data.msg,
			duration: 2000,
		});
	} else {
		return response
	}
}, (response) => {
	/*  对响应错误做点什么 （statusCode !== 200）*/
	if (response.data.code === 401) { //token 跳转至登录页
		uni.redirectTo({
			url: "pages/loading/index"
		})
		removeToken()
	}
	return Promise.reject(response)
})
export default http
