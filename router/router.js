// router.js
import {
	RouterMount,
	createRouter
} from 'uni-simple-router';
import {
	getToken
} from "@/utils/auth.js"
import store from '../store'
const whiteList = ['register', '', 'login']

const router = createRouter({
	platform: process.env.VUE_APP_PLATFORM,
	routes: [...ROUTES]
});
//全局路由前置守卫
router.beforeEach((to, from, next) => {
	if (getToken()) { //token判断是否跳转登录页
		store.dispatch('GetUserInfo').then(res => {
			if (to.name === 'loading') {
				next({
					name: 'index'
				})
			} else {
				next()
			}
		})
	} else {
		if (whiteList.indexOf(to.name) !== -1) {
			// 在免登录白名单，直接进入
			next()
		} else {
			if (to.name !== 'loading') {
				next({
					name: 'loading'
				})
			} else {
				next()
			}
		}
	}
});
// 全局路由后置守卫
router.afterEach((to, from) => {
	// console.log('跳转结束')
})

export {
	router,
	RouterMount
}
