import http from '@/utils/request.js'

//车辆列表
export function getList(data) {
	return http.request({
		url: "/qrqdSafe/vehicle/pass/page",
		data: data,
		method: "GET",
	})
}

//获取详情
export function getInfo(id) {
	return http.request({
		url: "/qrqdSafe/vehicle/pass/"+id,
		method: "GET",
	})
}

//部门
export function getByDept(data) {
	return http.request({
		url: "/qrqdSafe/vehicle/pass/getByDept",
		params: data,
		method: "POST",
	})
}

//获取道闸流量统计
export function getByPosiIn(data) {
	return http.request({
		url: "/qrqdSafe/vehicle/pass/getByPosiIn",
		params: data,
		method: "POST",
	})
}

//获取道闸流量趋势图
export function getByInOut(data) {
	return http.request({
		url: "/qrqdSafe/vehicle/pass/getByInOut",
		params: data,
		method: "POST",
	})
}