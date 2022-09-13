import http from '@/utils/request.js'

// 获取流程节点(流程发起前)
export function getAllNodeByDefkey(data) {
	return http.request({
		url: "/bpm/platform/getAllNodeByDefkey",
		data: data,
		method: "POST",
		header: {
			'Content-Type': 'application/x-www-form-urlencoded'
		}
	})
}

// 获取流程节点(流程发起后)
export function fullNodeInfo(data) {
	return http.request({
		url: "/bpm/platform/fullNodeInfo",
		data: data,
		method: "POST",
		header: {
			'Content-Type': 'application/x-www-form-urlencoded'
		}
	})
}

// 启动流程（流程发起）
export function startProcess(data) {
	return http.request({
		url: "/bpm/platform/startProcess",
		data: data,
		method: "POST",
		header: {
			'Content-Type': 'application/x-www-form-urlencoded'
		}
	})
}

// 同意（流程）
export function platformAgree(data) {
	return http.request({
		url: "/bpm/platform/agree",
		data: data,
		method: "POST",
		header: {
			'Content-Type': 'application/x-www-form-urlencoded'
		}
	})
}

// 驳回（流程）
export function platformReject(data) {
	return http.request({
		url: "/bpm/platform/reject",
		data: data,
		method: "POST",
		header: {
			'Content-Type': 'application/x-www-form-urlencoded'
		}
	})
}

// 不驳回（流程）
export function platformOppose(data) {
	return http.request({
		url: "/bpm/platform/oppose",
		data: data,
		method: "POST",
		header: {
			'Content-Type': 'application/x-www-form-urlencoded'
		}
	})
}

// 撤销	（流程）
export function platformComplete(data) {
	return http.request({
		url: "/bpm/platform/doEndProcess",
		data: data,
		method: "POST",
		header: {
			'Content-Type': 'application/x-www-form-urlencoded'
		}
	})
}