<template>
	<view class="warp">
		<view class="content">
			<view class="u-demo-block__content">
				<u-tabs :list="list1" ref="uTabs" :current="current" @change="tabsChange" :scrollable="false">
				</u-tabs>
			</view>
			<swiper :current="swiperCurrent" @change="transition">
				<swiper-item class="swiper-item" v-for="(item, index) in tabs" :key="index">
					<vehice-list v-if="!index"></vehice-list>
					<vehicle-echarts v-if="index"></vehicle-echarts>
				</swiper-item>
			</swiper>
		</view>
	</view>
</template>
<script>
	import VehiceList from "./components/vehiceList.vue"
	import vehicleEcharts from "./components/vehicleEcharts.vue"
	export default {
		components: {
			VehiceList,
			vehicleEcharts
		},
		data() {
			return {
				downOption: {
					use: false,
					auto: false,
				},
				upOption: {
					use: false,
					auto: false,
				},
				tittle: null,
				status: 0,
				swiperCurrent: 0,
				current: 0,
				tabs: [{
						value: '0'
					},
					{
						value: '1'
					},
				],
				list1: [{
					name: '列表',
				}, {
					name: '统计图'
				}],
				canReset:false
			}
		},
		onLoad() {},
		onShow() {
			this.getRefresh() && this.$refs.approvalList[this.swiperCurrent].mescroll.triggerDownScroll() 
			this.getRefresh() && this.$refs.approvalList[this.swiperCurrent].mescroll.scrollTo(0,0) 
			this.refreshF(false)
		},
		methods: {
			// tabs通知swiper切换
			tabsChange(e) {
				this.swiperCurrent = e.index;
			},
			// swiper-item左右移动，通知tabs的滑块跟随移动
			transition(e) {
				this.current = e.detail.current
			},
			//预约
			make() {
				this.$Router.push({
					name: "visitorApplyMake"
				})
			},
			//邀约
			invitation() {
				this.$Router.push({
					name: "visitorApplyInvitation"
				})
			},
			//查询按钮
			search() {
				this.$refs.approvalList[this.swiperCurrent].mescroll.triggerDownScroll()
			}
		}
	}
</script>
<style scoped lang="scss">
	.warp {
		padding-top: 4rpx;
		display: flex;
		flex-direction: column;
		
		.search {
			background-color: #ffffff;
			padding: 20rpx;

			::v-deep .u-search__action {
				width: 110rpx;
				height: 64rpx;
				line-height: 64rpx;
				border: 1px solid #d7d7d7;
				border-radius: 10rpx;
			}
		}

		.content {
			flex: 1;
			display: flex;
			flex-direction: column;

			.u-demo-block__content {
				background-color: #fff;
			}

			::v-deep uni-swiper {
				flex: 1;
			}
		}

		.footer {
			background-color: #ffffff;
			display: flex;
			flex-direction: row;
			text-align: center;
			border-top: 1px solid #d7d7d7;

			.agree {
				padding: 30rpx 0;
				flex: 1;
				color: #02A7F0;
				border-right: 1px solid #d7d7d7;
			}

			.agree:hover {
				background-color: #007aff;
				color: #ffffff;
			}

			.reject {
				padding: 30rpx 0;
				flex: 1;
				color: #007aff;
			}

			.reject:hover {
				background-color: #007aff;
				color: #ffffff;
			}
		}
	}
</style>
