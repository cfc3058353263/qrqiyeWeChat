import http from '@/utils/request.js'

//查询待审请
export function selectPage(data) {
	return http.request({
		url: "/qrqdSafe/visit/selectPage",
		data: data,
		method: "POST",
		header: {
			'Content-Type': 'application/x-www-form-urlencoded'
		}
	})
}

//查看详情
export function getById(data) {
	return http.request({
		url: "/qrqdSafe/visit/getById",
		data: data,
		method: "POST",
		header: {
			'Content-Type': 'application/x-www-form-urlencoded'
		}
	})
}

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
export function rejectApproval(data) {
	return http.request({
		url: "/qrqdSafe/visit/rejectApproval",
		data: data,
		method: "POST",
		header: {
			'Content-Type': 'application/x-www-form-urlencoded'
		}
	})
}

//不同意
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