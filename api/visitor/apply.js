import http from '@/utils/request.js'

//新增预约
export function save(data) {
	return http.request({
		url: "/qrqdSafe/visit/save",
		data: data,
		method: "POST",
		header: {
			'Content-Type': 'application/x-www-form-urlencoded'
		}
	})
}

//新增邀约
export function saveInvite(data) {
	return http.request({
		url: "/qrqdSafe/visit/saveInvite",
		data: data,
		method: "POST"
	})
}

//申请人员获取
export function userPage() {
	return http.request({
		url: "/admin/user/userPage",
		data: {
			deptId: 121,
			page: 1,
			limit: 99999
		},
		method: "GET"
	})
}

//由发起人进行审核撤销
export function turnDown(data) {
	return http.request({
		url: "/qrqdSafe/visit/turnDown",
		data: data,
		method: "POST",
		header: {
			'Content-Type': 'application/x-www-form-urlencoded'
		}
	})
}

//修改
export function update(data) {
	return http.request({
		url: "/qrqdSafe/visit/update",
		data: data,
		method: "POST"
	})
}

// 审批人员查询
export function findUser(data) {
	return http.request({
		url: "/organization/staff/find/user/list",
		data: data,
		method: "GET"
	})
}

// 审批人员查询
export function userListByDeptIds(data) {
	return http.request({
		url: "/admin/user/userListByDeptIds",
		data: data,
		method: "GET"
	})
}

//获取预约状态
export function getByVisitCode(data) {
	return http.request({
		url: "/qrqdSafe/visit/getByVisitCode",
		data: data,
		method: "POST",
		header: {
			'Content-Type': 'application/x-www-form-urlencoded'
		}
	})
}

//查询历史审批人
export function getApprove(data) {
	return http.request({
		url: "/qrqdSafe/visit/getApprove",
		data: data,
		method: "POST",
		header: {
			'Content-Type': 'application/x-www-form-urlencoded'
		}
	})
}