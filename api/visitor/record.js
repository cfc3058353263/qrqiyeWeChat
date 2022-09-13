import http from '@/utils/request.js'

//查询
export function selectByStatus(data) {
	return http.request({
		url: "/qrqdSafe/visit/selectByStatus",
		data: data,
		method: "POST",
		header: {
			'Content-Type': 'application/x-www-form-urlencoded'
		}
	})
}
