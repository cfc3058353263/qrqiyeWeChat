<template>
	<view class="warp">
		<view class="shiping">
			<view class="title">视频告警统计</view>
			<view class="Statistics">
				<view class="item">
					<u--image :showLoading="true" src="../../static/img/manage/gaojing.png" width="63rpx"
						height="63rpx">
					</u--image>
					<view class="text">
						<view class="name">今日告警</view>
						<view class="index">100</view>
					</view>
				</view>
				<view class="item" style="justify-content: center;">
					<u--image :showLoading="true" src="../../static/img/manage/yichuli.png" width="63rpx"
						height="63rpx">
					</u--image>
					<view class="text">
						<view class="name">已处理</view>
						<view class="index"
							style="background: linear-gradient(0deg, #FF7D7D 0%, #FF6969 100%);-webkit-background-clip: text;-webkit-text-fill-color: transparent;">
							70</view>
					</view>
				</view>
				<view class="item" style="justify-content: flex-end;">
					<u--image :showLoading="true" src="../../static/img/manage/weichuli.png" width="63rpx"
						height="63rpx">
					</u--image>
					<view class="text">
						<view class="name">未处理</view>
						<view class="index"
							style="background: linear-gradient(0deg, #6CDE80 0%, #3BCD97 100%);-webkit-background-clip: text;-webkit-text-fill-color: transparent;">
							30</view>
					</view>
				</view>
			</view>
		</view>
		<view style="padding: 10rpx 20rpx; 10rpx">
			<uni-datetime-picker v-model="range" type="daterange" @change="change" />
		</view>
		<mescroll-uni :top="10" :fixed="false" ref="mescrollRef" :down="downOption" :up="upOption" class="content">
			<pie-echarts></pie-echarts>
			<bar-echarts></bar-echarts>
			<column-echarts ref="columnEcharts" :startTime="startTime" :endTime="endTime"></column-echarts>
			<line-echarts ref="lineEcharts" :startTime="startTime" :endTime="endTime"></line-echarts>
		</mescroll-uni>
	</view>
</template>

<script>
	import MescrollMixin from "@/uni_modules/mescroll-uni/components/mescroll-uni/mescroll-mixins.js";
	import PieEcharts from "./components/pieEcharts.vue"
	import BarEcharts from "./components/barEcharts.vue"
	import ColumnEcharts from "./components/columnEcharts.vue"
	import LineEcharts from "./components/lineEcharts.vue"

	export default {
		mixins: [MescrollMixin],
		components: {
			PieEcharts,
			BarEcharts,
			ColumnEcharts,
			LineEcharts,
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
				startTime: "",
				endTime: "",
				range: null,
			}
		},
		methods: {
			change(e) {
				this.startTime = this.moment(e[0]).format("YYYY-MM-DD HH:mm:ss")
				this.endTime = this.moment(e[1]).format("YYYY-MM-DD HH:mm:ss")
				this.$nextTick(() => {
					this.$refs.columnEcharts.getColumnData()
					this.$refs.lineEcharts.getAddress()
				})
			},
		}
	}
</script>

<style scoped lang="scss">
	.warp {
		padding-top: 4rpx;
		display: flex;
		flex-direction: column;

		.title {
			font-size: 28rpx;
			font-weight: bold;
			color: #222222;
		}

		.shiping {
			padding: 36rpx 34rpx;
			background-color: #fff;

			.Statistics {
				display: flex;
				flex-direction: row;
				padding: 30rpx 12rpx 0;

				.item {
					flex: 1;
					display: flex;
					flex-direction: row;
					align-items: center;

					.text {
						padding-left: 20rpx;

						.name {
							font-size: 22rpx;
							font-weight: 400;
							color: #333333;
							opacity: 0.5;
						}

						.index {
							padding-top: 4rpx;
							font-size: 42rpx;
							font-family: DIN;
							font-weight: 600;
							color: #0374D3;
							background: linear-gradient(0deg, #59C2FF 0%, #4FA4FF 100%);
							-webkit-background-clip: text;
							-webkit-text-fill-color: transparent;
						}
					}
				}
			}
		}

		.content {
			flex: 1;
			min-height: 0;
			min-width: 0;
		}
	}
</style>
