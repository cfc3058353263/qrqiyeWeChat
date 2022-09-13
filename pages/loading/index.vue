<template>
</template>

<script>
	import {
		wechatLogin,
		authorize
	} from "@/api/login/index.js"
	import {
		encryption,
	} from "@/utils/encryption.js"
	import {
		setToken
	} from "@/utils/auth.js";
	export default {
		data() {
			return {}
		},
		onLoad(option) {
			/*加密*/
			const user = encryption({
				data: {
					"password": "123456",
					"mobile":option.openId + "@" + option.tenantId
				},
				key: 'TunnyTunnyTunnyTunny',
				param: ['password','mobile']
			})
			/*加密*/
			console.log(option)
			var arr = Object.keys(option);
			if (arr.length > 0) {
			console.log(arr)
				/* 判断是否有信息，若没有就去登录页登录*/
				if (!option.userId && !option.phone && !option.tenantId) {
					this.$Router.pushTab({
						path: '/pages/login/index'
					})
				} else {
					wechatLogin({
						...user
					}).then(res => {
						let token = res.data.access_token
						setToken(token)
						this.$Router.pushTab({
							path: '/pages/index/index'
						})
					})
				}
			} else {
				// this.$Router.pushTab({
				// 	path: '/pages/login/index'
				// })
				window.location.href = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=ww385d69cd8d1506bb&redirect_uri=http://thingshive.com.cn/work-wechat/auth/userinfo&response_type=code&scope=snsapi_privateinfo&state=0&agentid=1000004#wechat_redirect";
			}
		},
	}
</script>

<style>
</style>
