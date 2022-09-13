<template>
	<view class="content">
		<view class="title">
			<u--image :showLoading="true" src="../../static/img/manage/pie.png" width="24rpx" height="24rpx">
			</u--image>
			<view class="name">告警统计</view>
		</view>
		<view class="charts-box">
			<qiun-data-charts type="column" :opts="opts" :chartData="chartData" />
		</view>
	</view>
</template>

<script>
	import {
		getColumnData
	} from "@/api/manage/index.js"
	export default {
		props: {
			startTime: {
				type: String,
				default: ""
			},
			endTime: {
				type: String,
				default: ""
			},
		},
		data() {
			return {
				chartData: {
					categories: [],
					series: [],
				},
				opts: {
					color: ["#2C8AFF", "#91CB74", "#FAC858", "#EE6666", "#73C0DE", "#3CA272", "#FC8452", "#9A60B4",
						"#ea7ccc"
					],
					padding: [0, 15, 0, 5],
					legend: {},
					xAxis: {
						disableGrid: true
					},
					yAxis: {
						data: [{
							min: 0
						}]
					},
					extra: {
						column: {
							type: "group",
							width: 30,
							activeBgColor: "#000000",
							activeBgOpacity: 0.08
						}
					},
					legend: {
						position: "top",
					}
				}
			};
		},
		mounted() {
			this.getColumnData()
		},
		methods: {
			getColumnData() {
				getColumnData({
					startTime: this.startTime,
					endTime: this.endTime
				}).then(res => {
					let dataList = res.data.data
					setTimeout(() => {
						let data = {
							categories: dataList.xaxis,
							series: [{
								name: "数量",
								data: dataList.series
							}]
						};
						this.chartData = JSON.parse(JSON.stringify(data));
					}, 500);
				})
			}
		}
	};
</script>

<style scoped lang="scss">
	/* 请根据实际需求修改父元素尺寸，组件自动识别宽高 */
	.content {
		background-color: #fff;
		margin-top: 19rpx;

		.title {
			display: flex;
			align-items: center;
			padding: 37rpx 35rpx;

			.name {
				padding-left: 22rpx;
				font-size: 28rpx;
				font-weight: bold;
				color: #222222;
			}
		}

		.charts-box {
			width: 100%;
			/* 	background-color: #fff;
			padding: 37rpx;
			margin-top: 18rpx;
			padding-bottom: 20rpx; */

		}
	}
</style>
