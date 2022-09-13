import http from '@/utils/request.js'

//人员列表
export function getList(data) {
	return http.request({
		url: "/qrqdSafe/traffic/record/page",
		data: data,
		method: "GET",
	})
}

//查询
export function getInfo(id) {
	return http.request({
		url: "/qrqdSafe/traffic/record/"+id,
		method: "GET",
	})
}

//获取身份统计
export function getByIdent(data) {
	return http.request({
		url: "/qrqdSafe/traffic/record/getByIdent",
		params: data,
		method: "POST",
	})
}

//获取流量统计
export function getByPosiIn(data) {
	return http.request({
		url: "/qrqdSafe/traffic/record/getByPosition",
		params: data,
		method: "POST",
	})
}

//获取流量趋势图
export function getByType(data) {
	return http.request({
		url: "/qrqdSafe/traffic/record/getByType",
		params: data,
		method: "POST",
	})
}