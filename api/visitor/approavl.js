import http from '@/utils/request.js'

//同意
export function agreeApproval(data) {
	return http.request({
		url: "/qrqdSafe/visit/agreeApproval",
		data: data,
		method: "POST",
		header: {
			'Content-Type': 'application/x-www-form-urlencoded'
		}
	})
}

//驳回
export function refuseApproval(data) {
	return http.request({
		url: "/qrqdSafe/visit/refuseApproval",
		data: data,
		method: "POST",
		header: {
			'Content-Type': 'application/x-www-form-urlencoded'
		}
	})
}

//查询待办接口
export function getPending(data) {
	return http.request({
		url: "/qrqdSafe/visit/getPending",
		data: data,
		method: "POST",
		header: {
			'Content-Type': 'application/x-www-form-urlencoded'
		}
	})
}
//查询已办接口
export function getHandle(data) {
	return http.request({
		url: "/qrqdSafe/visit/getHandle",
		data: data,
		method: "POST",
		header: {
			'Content-Type': 'application/x-www-form-urlencoded'
		}
	})
}