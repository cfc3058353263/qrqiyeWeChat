import http from '@/utils/request.js'

//告警top10
export function fireCount(data) {
	return http.request({
		url: "/qrqdSafe/statistics/fireCount",
		data: data,
		method: "POST",
		header: {
			'Content-Type': 'application/x-www-form-urlencoded'
		}
	})
}

//告警类型统计_柱状图
export function getColumnData(data) {
	return http.request({
		url: "/qrqdSafe/event/statistic/type",
		data: data,
		method: "GET"
	})
}
//空间位置树
export function spaceTree(data) {
	return http.request({
		url: "/space/space/tree",
		data: data,
		method: "GET",
	})
}

//空间位置树
export function positions(data) {
	return http.request({
		url: "/space/position/positions",
		data: data,
		method: "GET",
	})
}

//告警地点趋势_折线图
export function getAddress(data) {
	return http.request({
		url: "/qrqdSafe/event/statistic/trend/address",
		data: data,
		method: "GET"
	})
}