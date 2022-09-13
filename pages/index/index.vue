<template>
	<view class="warp">
		<u-navbar title="首页" safeAreaInsetTop fixed placeholder rightIcon="bell" @rightClick="notice">
			<view slot="left"></view>
		</u-navbar>
		<view class="environment">
			<view class="header">
				<view class="zhiliang">
					<u--image :showLoading="true" src="../../static/img/menu/kqzl.png" width="28rpx" height="28rpx">
					</u--image>
					<view style="margin-left: 10rpx;">空气质量100 优</view>
				</view>
			</view>
			<view class="weather">
				<u--image :showLoading="true" src="../../static/img/menu/cloudy.png" width="80rpx" height="80rpx">
				</u--image>
				<u-row justify="space-between" gutter="10" style="flex:1;padding-left: 10rpx;">
					<u-col span="4" align="start">
						<view class="item">
							<u--image :showLoading="true" src="../../static/img/menu/temperature.png" width="28rpx"
								height="28rpx">
							</u--image>
							<view class="company">气温</view>
							<view class="index">26℃</view>
						</view>
					</u-col>
					<u-col span="4" align="start">
						<view class="item">
							<u--image :showLoading="true" src="../../static/img/menu/humidity.png" width="28rpx"
								height="28rpx">
							</u--image>
							<view class="company">湿度</view>
							<view class="index">100</view>
						</view>
					</u-col>
					<u-col span="4" align="start">
						<view class="item">
							<u--image :showLoading="true" src="../../static/img/menu/windSpeed.png" width="28rpx"
								height="28rpx">
							</u--image>
							<view class="company">风速</view>
							<view class="index">2</view>
							<view style="font-size: 34rpx;font-weight: 500;">m/s</view>
						</view>
					</u-col>
				</u-row>
			</view>
			<view class="weather" style="margin-top: 40rpx;">
				<view class="item">
					<view class="company">舒适度评分</view>
					<view class="company" style="margin-left: 20rpx;">70/100</view>
				</view>
				<view class="item" style="margin-left: 30rpx;">
					<view class="company">卫生评分</view>
					<view class="company" style="margin-left: 20rpx;">80</view>
				</view>
			</view>
		</view>
		<view class="agency">
			<view class="title">待办事项</view>
			<u-row justify="space-between" gutter="10">
				<u-col span="4">
					<view class="notice" :style="{backgroundImage:`url(${kjbackground})`}">
						<u--image :showLoading="true" src="../../static/img/menu/xiaoxi.png" width="28rpx"
							height="28rpx"></u--image>
						<view class="noticeType">告警通知
							<view class="index">70</view>
						</view>
					</view>
				</u-col>
				<u-col span="4">
					<view class="notice" :style="{backgroundImage:`url(${xxbackground})`}">
						<u--image :showLoading="true" src="../../static/img/menu/xiaoxi.png" width="28rpx"
							height="28rpx"></u--image>
						<view class="noticeType">消息通知
							<view class="index">10</view>
						</view>
					</view>
				</u-col>
				<u-col span="4">
					<view class="notice" :style="{backgroundImage:`url(${gdbackground})`}">
						<u--image :showLoading="true" src="../../static/img/menu/gongdan.png" width="28rpx"
							height="28rpx"></u--image>
						<view class="noticeType">待办工单
							<view class="index">4</view>
						</view>
					</view>
				</u-col>
			</u-row>
		</view>
		<view class="menu">
			<u-row justify="space-between" gutter="10">
				<u-col v-for="(item,index) of menuList1" :key="index" span="3" align="center" style="padding: 10rpx 0;">
					<my-link :to="{name:item.menuUrl}">
						<view class="menuIcon">
							<u--image :showLoading="true" :src="item.menuIcon" width="90rpx" height="90rpx">
							</u--image>
							<view class="menuName">{{item.menuName}}</view>
						</view>
					</my-link>
				</u-col>
			</u-row>
			<u-row justify="space-between" gutter="10" style="margin-top: 20rpx;">
				<u-col v-for="(item,index) of menuList2" :key="index" span="3" align="center" style="padding: 10rpx 0;">
					<my-link :to="{name:item.menuUrl}">
						<view class="menuIcon">
							<u--image :showLoading="true" :src="item.menuIcon" width="90rpx" height="90rpx">
							</u--image>
							<view class="menuName">{{item.menuName}}</view>
						</view>
					</my-link>
				</u-col>
			</u-row>
		</view>
		<view style="padding:20rpx;">
			<u--image :showLoading="true" src="../../static/img/menu/qirui.png" width="100%" mode="widthFix"></u--image>
		</view>
	</view>
</template>

<script>
	let gdbackground = require("../../static/img/menu/gdbackground.png");
	let xxbackground = require("../../static/img/menu/xxbackground.png");
	let kjbackground = require("../../static/img/menu/kjbackground.png");
	export default {
		data() {
			return {
				gdbackground,
				xxbackground,
				kjbackground,
				menuList1: [{
						menuIcon: "../../static/img/menu/zonghe.png",
						menuName: "综合管理",
						menuUrl: "manage"
					},
					{
						menuIcon: "../../static/img/menu/fangke.png",
						menuName: "访客管理",
						menuUrl: "visitor"
					},
					{
						menuIcon: "../../static/img/menu/jiaotong.png",
						menuName: "交通保卫",
						menuUrl: "traffic"
					},
					{
						menuIcon: "../../static/img/menu/zhiye.png",
						menuName: "职业卫生",
						menuUrl: "manage"
					},
				],
				menuList2: [{
						menuIcon: "../../static/img/menu/xiaofang.png",
						menuName: "消防安全",
						menuUrl: "manage"
					},
					{
						menuIcon: "../../static/img/menu/shuangchong.png",
						menuName: "双重预防监控",
						menuUrl: "manage"
					},
					{
						menuIcon: "../../static/img/menu/huanbao.png",
						menuName: "环保管理",
						menuUrl: "epManage"
					},
					{
						menuIcon: "../../static/img/menu/kaoqin.png",
						menuName: "考勤数据 ",
						menuUrl: "manage"
					},
				]
			}
		},
		onLoad() {

		},
		methods: {
			notice() {
				this.$Router.push({
					name: "notice"
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.warp {
		.environment {
			border-radius: 10rpx;
			background: linear-gradient(250deg, #4678FA, #6791FE);
			padding: 30rpx 30rpx;
			margin: 20rpx;
			color: #fff;
			font-weight: bold;

			.header {
				display: flex;
				flex-direction: row;
				justify-content: space-between;
				align-items: center;

				.title {
					font-size: 30rpx;
				}

				.zhiliang {
					font-size: 24rpx;
					font-weight: 500;
					color: #FFFFFF;
					display: flex;
					flex-direction: row;
					align-items: center;
				}
			}

			.weather {
				display: flex;
				flex-direction: row;
				align-items: center;

				.item {
					display: flex;
					flex-direction: row;
					align-items: center;

					.company {
						font-size: 26rpx;
						font-weight: 500;
					}

					.index {
						font-size: 38rpx;
						font-weight: 500;
					}
				}

			}
		}

		.agency {
			padding: 0 20rpx;

			::v-deep .u-row {
				align-items: flex-start !important;
			}

			.title {
				font-size: 28rpx;
				font-weight: bold;
				margin-bottom: 10rpx;
				color: #222222;
			}



			.notice {
				padding: 20rpx 20rpx;
				display: flex;
				flex-direction: row;
				background-size: cover;
				background-repeat: no-repeat;

				.noticeType {
					z-index: 10;
					padding-left: 10rpx;
					font-size: 24rpx;
					font-weight: 500;
					color: #333333;

					.index {
						margin-top: 10rpx;
						font-size: 34rpx;
						font-weight: bold;
						color: #333333;
					}
				}

			}
		}

		.menu {
			background: #fff;
			margin-top: 20rpx;
			padding: 20rpx;

			.menuIcon {
				display: flex;
				align-items: center;
				flex-direction: column;
			}

			.menuName {
				font-size: 24rpx;
			}
		}
	}
</style>
