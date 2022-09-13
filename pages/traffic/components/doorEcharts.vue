<template>
	<view class="warp">
		<view class="title">
			<view class="top">门禁TOP10</view>
		</view>
		<view class="charts-box">
			<qiun-data-charts type="bar" :opts="opts" :chartData="chartData" />
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				chartData: {
					categories: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
					series: [{
						name: "",
						format: 'doorTop',
						nameList: ["消防", "陌生人", "故障", "黑名单", "监控", "人员", "环保", "环境", "卫生", "电梯"],
						textColor: "#333333",
						textSize: 14,
						textOffset: -25,
						data: [{
							"value": 10,
							"color": "#045FB3",
							"name": "消防",
						}, {
							"value": 9,
							"color": "#FFB97B",
							"name": "消防"
						}, {
							"value": 8,
							"color": "#82E7B7",
							"name": "消防"
						}, {
							"value": 7,
							"color": "#A1CAFD",
							"name": "消防"
						}, {
							"value": 6,
							"color": "#A1CAFD",
							"name": "消防"
						}, {
							"value": 5,
							"color": "#A1CAFD",
							"name": "消防"
						}, {
							"value": 4,
							"color": "#A1CAFD",
							"name": "消防"
						}, {
							"value": 3,
							"color": "#A1CAFD",
							"name": "消防"
						}, {
							"value": 2,
							"color": "#A1CAFD",
							"name": "消防"
						}, {
							"value": 1,
							"color": "#A1CAFD",
							"name": "消防"
						}]
					}],
				},
				opts: {
					// fontSize: 14,
					// fontColor: "#333333",
					color: ["#1890FF", "#91CB74", "#FAC858", "#EE6666", "#73C0DE", "#3CA272", "#FC8452", "#9A60B4",
						"#ea7ccc"
					],
					padding: [15, 15, 0, 5],
					enableMarkLine: true,
					legend: {},
					xAxis: {
						boundaryGap: "justify",
						disableGrid: true,
						disabled: true,
						axisLine: false,
						min: 0,
						max: 11.2
					},
					yAxis: {
						data: [{
							type: "categories",
							axisLineColor: "#fff",
						}]
					},
					extra: {
						bar: {
							width: 16,
							// categoryGap: ,
						},
					},
					legend: {
						show: false
					}
				}
			};
		},
		mounted() {
			this.getServerData();
		},
		methods: {
			getServerData() {
				setTimeout(() => {
					// this.chartData = JSON.parse(JSON.stringify(res));
				}, 500);
			},
		}
	};
</script>

<style scoped lang="scss">
	/* 请根据实际需求修改父元素尺寸，组件自动识别宽高 */
	.warp {
		margin-top: 18rpx;
		background-color: #fff;
		padding-bottom: 37rpx;

		.title {
			padding: 37rpx 37rpx 0;
			display: flex;
			flex-direction: row;

			.top {
				font-size: 28rpx;
				font-weight: 600;
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
