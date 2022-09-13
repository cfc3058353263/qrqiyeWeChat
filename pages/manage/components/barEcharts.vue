<template>
	<view class="content">
		<view class="title">
			<view class="left">
				<u--image :showLoading="true" src="../../static/img/manage/pie.png" width="24rpx" height="24rpx">
				</u--image>
				<view class="name">告警TOP10</view>
			</view>
			<view class="u-page">
				<view class="u-demo-block">
					<view class="u-demo-block__content">
						<u-subsection :list="list" mode="subsection" :current="current" @change="change">
						</u-subsection>
					</view>
				</view>
			</view>
		</view>
		<view class="charts-box">
			<qiun-data-charts type="bar" :opts="opts" :chartData="chartData" @getIndex="showMyTooltip" />
		</view>
	</view>
</template>

<script>
	import {
		fireCount
	} from "@/api/manage/index.js"
	import uCharts from '@/uni_modules/qiun-data-charts/js_sdk/u-charts/config-ucharts.js';

	export default {
		data() {
			return {
				list: ['类型', '区域'],
				current: 0,
				chartData: {
					categories: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
					series: [{
						name: "",
						format: 'doorTop',
						nameList: [],
						textColor: "#333333",
						textSize: 14,
						textOffset: -25,
						data: []
					}],
				},
				opts: {
					padding: [15, 15, 0, 5],
					enableMarkLine: true,
					legend: {},
					xAxis: {
						boundaryGap: "justify",
						disableGrid: true,
						disabled: true,
						axisLine: false,
						min: 0,
						max: 100
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
						},
						tooltip: {
							yAxisLabel: false
						},
					},
					legend: {
						show: false
					}
				}
			};
		},
		mounted() {
			this.fireCount()

		},
		methods: {
			showMyTooltip(e) {
				//从option（opts）中获取数据
				let categories = uCharts.option[e.id].categories;
				let series = uCharts.option[e.id].series;
				//注意v2.1.2版本后，e.currentIndex是对象，而e.currentIndex.index是索引值，如果是时间轴图表，index在多个series的情况下会是数组
				let index = e.currentIndex.index;
				// 如果之前做了截取 可以通过text: this.topName[index]展示完整信息
				if (index > -1) {
					
					let textList = [{
						text: series[0].nameList[index] + ":" + series[0].data[index].value,
						color: series[0].data[index].color
					}];
					uCharts.instance[e.id].showToolTip({
						changedTouches: [e.event], // changedTouches:点击的坐标值, 可自定义位置[{x: 100, y: 10}]
					}, {
						textList: textList
					});
				}

			},
			change(index) {
				this.current = index;
				this.fireCount()
			},
			fireCount() {
				fireCount({
					type: this.current
				}).then(res => {
					let data = res.data.data
					let nameList = []
					let dataList = []
					// let color = ["#045FB3", "#FFB97B", "#82E7B7", "#A1CAFD", "#A1CAFD", "#A1CAFD",
					// 	"#A1CAFD","#A1CAFD", "#A1CAFD", "#A1CAFD"
					// ]
					let color = ["#A1CAFD", "#045FB3", "#FFB97B", "#82E7B7", "#A1CAFD", "#A1CAFD",
						"#A1CAFD", "#A1CAFD", "#A1CAFD", "#A1CAFD", "#A1CAFD",
					]
					let index = 0
					let max = 0
					for (let item in data) {
						data[item] > max && (max = data[item])
						index++
						nameList.push(item)
						dataList.push({
							"value": data[item],
							"color": color[index]
						})
					}
					setTimeout(() => {
						this.opts.xAxis.max = (max + 50)
						this.chartData.series[0].nameList = nameList
						this.chartData.series[0].data = dataList
					}, 500);
				})
			}
		}
	};
</script>

<style scoped lang="scss">
	.content {
		background-color: #fff;
		margin-top: 19rpx;


		.title {
			display: flex;
			align-items: center;
			padding: 37rpx 35rpx 10rpx;
			justify-content: space-between;

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

			.u-page {
				width: 241rpx;
			}
		}

		.charts-box {
			width: 100%;
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
