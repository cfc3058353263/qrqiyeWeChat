import http from '@/utils/request.js'

//登录
export function login(params) {
	return http.request({
		url: "/auth/oauth/token",
		params: {
			...params,
			grant_type: "password",
			scope: "server",
			randomStr: "no",
			code: "no"
		},
		method: "POST",
		header: {
			'Authorization': 'Basic dHVubnk6YUNkcVlXWUgjUmVCNE9qWA=='
		}
	})
}

//获取人员信息
export function getInfo(params) {
	return http.request({
		url: "/admin/user/info",
		method: "GET",
	})
}

//退出登录
export function logout() {
	return http.request({
		url: "/auth/oauth/removeToken",
		method: "GET",
	})
}

//获取openid的地址
export function authorize() {
	return http.request({
		url: "/work-wechat/auth/authorize",
		method: "GET",
	})
}

//企业微信登录
export function wechatLogin(params) {
	return http.request({
		url: "/auth/mobile/token",
		params: {
			...params,
			randomStr: "no",
			code: "no",
			grant_type: "password",
			scope: "server",
			appType: "work-wechat"
		},
		method: "POST",
		header: {
			'Authorization': 'Basic dHVubnk6YUNkcVlXWUgjUmVCNE9qWA=='
		}
	})
}

