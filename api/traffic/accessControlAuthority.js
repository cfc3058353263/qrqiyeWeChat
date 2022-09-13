import http from '@/utils/request.js'

//获取
export function getList(data) {
	return http.request({
		url: "/qrqdSafe/pedestrian/gate/group/list",
		data: data,
		method: "GET",
	})
}

//新增
export function save(data) {
	return http.request({
		url: "/qrqdSafe/pedestrian/gate/group/save",
		data: data,
		method: "POST",
	})
}

//删除
export function del(id) {
	return http.request({
		url: "/qrqdSafe/pedestrian/gate/group/del/" + id,
		method: "POST",
	})
}

//修改
export function updata(data) {
	return http.request({
		url: "/qrqdSafe/pedestrian/gate/group/renew",
		data: data,
		method: "POST",
	})
}
