<template>
	<view class="warp">
		<view>
			<u--image :showLoading="true" src="../../static/img/login/bannner.png" width="100%"></u--image>
		</view>
		<view class="logo">
			<u--image :showLoading="true" src="../../static/img/login/logo.png" width="100rpx" height="67rpx">
			</u--image>
			<view class="title">奇瑞智慧园区APP</view>
		</view>
		<view class="form">
			<u--form labelPosition="left" :model="form" ref="uForm">
				<u-form-item label="" prop="username">
					<u--input prefixIcon="account" prefixIconStyle="font-size: 25px;color: #adafb1" placeholder="用户名"
						v-model="form.username" clearable shape="circle"></u--input>
				</u-form-item>
				<u-form-item label="" prop="password">
					<u--input prefixIcon="lock" password prefixIconStyle="font-size: 25px;color: #adafb1"
						placeholder="密码" v-model="form.password" clearable shape="circle"></u--input>
				</u-form-item>
			</u--form>
			<u-button style="margin-top: 38rpx;" @click="login" type="primary" shape="circle" size="large"
				:loading="loading" text="登 录"></u-button>
		</view>
		<u-toast ref="uToast"></u-toast>
	</view>
</template>

<script>
	import Request from 'luch-request'
	import qs from 'qs'
	import {
		setToken
	} from "@/utils/auth.js";
	export default {
		data() {
			return {
				form: {
					username: null,
					password: null,
				},
				send: true,
				loading: false
			}
		},
		methods: {
			login() {
				if (!this.form.username) {
					this.$refs.uToast.show({
						type: "error",
						message: "请输入用户名"
					})
					return
				}
				if (!this.form.password) {
					this.$refs.uToast.show({
						type: "error",
						message: "请输入密码"
					})
					return
				}
				this.$store.dispatch("LoginByUsername", this.form).then(res => {
					this.$Router.pushTab({
						path: '/pages/index/index'
					})
				}).catch(err => {
					this.$refs.uToast.show({
						type: "error",
						message: err.data.error_description
					})
				})
			},
		}
	}
</script>
<style>
	page {
		height: 100% !important;
		background-color: #fff;
	}
</style>
<style scoped lang="scss">
	.warp {
		background-color: #f6f8fa;

		.logo {
			display: flex;
			flex-direction: row;
			align-items: center;
			justify-content: center;
			padding: 63rpx 0;

			.title {
				padding-left: 20rpx;
				font-size: 30rpx;
				font-family: Microsoft YaHei;
				font-weight: bold;
				color: #333333;
			}
		}

		.form {
			padding: 0 74rpx;

			.sendCodeBtn {
				width: 190rpx;
				text-align: right;
				color: #409EFF;
			}

			::v-deep .u-button__text {
				font-size: 32rpx !important;
			}
		}

		.u-input--circle {
			height: 104rpx;
		}
	}
</style>
