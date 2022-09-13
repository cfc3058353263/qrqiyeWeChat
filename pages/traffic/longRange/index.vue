<template>
	<view class="warp">
		<view style="padding:20rpx 20rpx 0;">
			<u--image :showLoading="true" :src="require('../../../static/img/traffic/longRangeTitle.png')" width="100%"
				height="auto" mode="widthFix"></u--image>
		</view>
		<view class="content">
			<view>
				<u-tabs :list="tabList" ref="uTabs" :current="current" @change="tabsChange"
					:activeStyle="{color: '#2E7EFF'}">
				</u-tabs>
			</view>
			<swiper :current="swiperCurrent" @change="transition">
				<swiper-item class="swiper-item" v-for="(item, index) in tabs" :key="index">
					<list v-if="!index" :popupClick="popupClick"></list>
				</swiper-item>
			</swiper>
		</view>

	</view>
</template>

<script>
	import list from "./components/list.vue"
	export default {
		components: {
			list
		},
		data() {
			return {
				status: 0,
				swiperCurrent: 0,
				current: 0,
				tabList: [{
					name: '人行门禁',
				}, {
					name: '车辆道闸'
				}],
				tabs: [{
						value: '0'
					},
					{
						value: '1'
					},
				],
				show: false
			}
		},
		methods: {
			// tabs通知swiper切换
			tabsChange(e) {
				this.swiperCurrent = e.index;
				// this.$refs.approvalList[e.index].mescroll.triggerDownScroll()
			},
			// swiper-item左右移动，通知tabs的滑块跟随移动
			transition(e) {
				this.current = e.detail.current
			},
			popupClick() {
				this.show = false
			}
		}
	}
</script>

<style scoped lang="scss">
	.warp {
		display: flex;
		flex-direction: column;

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

	}
</style>
