import http from '@/utils/request.js'

//空间位置树
export function spaceTree(data) {
	return http.request({
		url: "/space/space/tree",
		data: data,
		method: "GET",
	})
}

//获取门禁
export function getList(data) {
	return http.request({
		url: "/device-management/device/business/page",
		data: data,
		method: "GET",
	})
}

//远程开门
export function save(data) {
	return http.request({
		url: "/device-management/device/services/save",
		data: data,
		method: "POST",
	})
}
//远程开门批量
export function saveList(data) {
	return http.request({
		url: "/device-management/device/services/save/list",
		data: data,
		method: "POST",
	})
}