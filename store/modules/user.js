import {
	login,
	getInfo
}
from "@/api/login"
import {
	encryption,
} from "@/utils/encryption.js"
import {
	setToken
} from "@/utils/auth.js";

const user = {
	state: {
		token: null,
		projectId: 242,
		userName: null, //登录人姓名
		empno: null, //工号
		userId: null, //id
		avatar: null, //头像url
		sex: null, //性别
		email: null, //邮箱
		phone: null, //手机号
		defKey: "Process_1eb7pge" //审批流程使用的
	},

	mutations: {
		SET_TOKEN: (state, token) => {
			state.token = token
		},
		SET_EMPNO: (state, empno) => {
			state.empno = empno
		},
		SET_USERNAME: (state, userName) => {
			state.userName = userName
		},
		SET_USERID: (state, userId) => {
			state.userId = userId
		},
		SET_AVATAR: (state, avatar) => {
			state.avatar = avatar
		},
		SET_SEX: (state, sex) => {
			state.sex = sex
		},
		SET_EMAIL:(state, email) => {
			state.email = email
		},
		SET_PHONE: (state, phone) => {
			state.phone = phone
		}
	},

	actions: {
		//用户登录
		LoginByUsername({
			commit,
			state,
			dispatch
		}, userInfo) {
			return new Promise((resolve, reject) => {
				//加密
				const user = encryption({
					data: userInfo,
					key: 'TunnyTunnyTunnyTunny',
					param: ['password', 'username']
				})
				login(user)
					.then(response => {
						const data = response.data
						setToken(data.access_token)
						resolve(data)
					})
					.catch(error => {
						reject(error)
					})
			})
		},
		//获取员工信息
		GetUserInfo({
			commit,
			state,
			dispatch
		}) {
			return new Promise((resolve, reject) => {
				getInfo()
					.then(response => {
						const data = response.data.data
						commit('SET_EMPNO', data.sysUser.empno)
						commit('SET_USERID', data.sysUser.userId)
						commit('SET_USERNAME', data.sysUser.userRealname)
						commit('SET_AVATAR', data.sysUser.avatar)
						commit('SET_SEX', data.sysUser.sex)
						commit('SET_EMAIL', data.sysUser.email)
						commit('SET_PHONE', data.sysUser.phone)
						resolve(data)
					})
					.catch(error => {
						reject(error)
					})
			})
		},
	}
}

export default user
