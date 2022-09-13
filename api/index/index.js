import http from '@/utils/request.js'

export function userMenu(){
	return http.request({
		url:"/admin/menu/userMenu",
		params:{appId:741,modelMenu:1},
		method:"GET"
	})
}