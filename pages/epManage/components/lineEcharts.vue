<template>
	<view class="content">
		<view class="title">
			<view class="left">
				<u--image :showLoading="true" src="../../static/img/manage/pie.png" width="24rpx" height="24rpx">
				</u--image>
				<view class="name">单位面积取水量趋势图</view>
			</view>
		</view>
		<view class="charts-box">
			<qiun-data-charts type="line" :opts="opts" :chartData="chartData" />
		</view>
	</view>
</template>

<script>
	import {
		spaceTree,
		positions,
		getAddress
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
			}
		},
		components: {},
		data() {
			return {
				chartData: {},
				opts: {
					color: ["#F37E4D", "#3CCFAE", "#FFBD11", "#1A7BFF", "#73C0DE", "#3CA272", "#FC8452", "#9A60B4",
						"#ea7ccc"
					],
					padding: [0, 10, 0, 15],
					legend: {},
					xAxis: {
						disableGrid: true
					},
					yAxis: {
						gridType: "dash",
						dashLength: 2
					},
					legend: {
						position: "top",
						padding: 20
					},
					extra: {
						line: {
							type: "straight",
							width: 2
						},
					},
				},
			};
		},
		mounted() {
			this.getServerData()
		},
		methods: {
			getServerData() {
				setTimeout(() => {
					let res = {
						categories: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
						series: [{
								name: "2022",
								data: [35, 8, 25, 37, 4, 20, 35, 8, 25, 37, 4, 20, 25],
								labelShow: false,
							},
							{
								name: "2021",
								data: [70, 40, 65, 100, 44, 68, 70, 40, 65, 100, 44, 68, 68]
							},
							{
								name: "2020",
								data: [100, 80, 95, 150, 112, 132, 100, 80, 95, 150, 112, 132, 132]
							}
						]
					};
					this.chartData = JSON.parse(JSON.stringify(res));
				}, 500);
			},
		}
	};
</script>

<style scoped lang="scss">
	.content {
		background-color: #fff;

		.title {
			display: flex;
			flex-direction: column;
			padding: 37rpx 35rpx 10rpx;

			.left {
				display: flex;
				flex-direction: row;
				align-items: center;

				.name {
					padding-left: 22rpx;
					font-size: 28rpx;
					font-weight: bold;
					color: #222222;
				}
			}

			.select {
				margin-top: 20rpx;
				display: flex;
				flex-direction: row;
				align-items: center;

				::v-deep .u-input {
					padding: 6rpx 9rpx !important;
				}

				.u-page {
					width: 281rpx;
				}
			}
		}

		.charts-box {
			width: 100%;
			height: 400rpx;
		}
	}

	.album {
		@include flex;
		align-items: flex-start;

		&__avatar {
			background-color: $u-bg-color;
			padding: 5px;
			border-radius: 3px;
		}

		&__content {
			margin-left: 10px;
			flex: 1;
		}
	}
</style>
