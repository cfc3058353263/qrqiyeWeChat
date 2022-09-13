<template>
	<view class="content">
		<view class="title">
			<view class="left">
				<u--image :showLoading="true" src="../../static/img/manage/pie.png" width="24rpx" height="24rpx">
				</u--image>
				<view class="name">告警地点趋势图</view>
			</view>
			<view class="select">
				<view style="flex: 1;" @click="value1 = true">
					<u--input v-model="spaceName" disabled disabledColor="#ffffff" placeholder="空间位置"
						suffixIcon="arrow-down" suffixIconStyle="color: #909399"></u--input>
				</view>
				<view style="margin: 0 10rpx;flex: 1;" @click="value2 = true">
					<u--input v-model="positionName" disabled disabledColor="#ffffff" placeholder="空间单元"
						suffixIcon="arrow-down" suffixIconStyle="color: #909399"></u--input>
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
		</view>
		<view class="charts-box">
			<qiun-data-charts type="line" :opts="opts" :chartData="chartData" />
		</view>
		<USelect v-model="value1" mode="mutil-column-auto" :list="position1" @confirm="confirm1" value-name="id"
			label-name="name"></USelect>
		<USelect v-model="value2" :list="position2" @confirm="confirm2" value-name="id" label-name="name"></USelect>
	</view>
</template>

<script>
	import USelect from "@/components/uselect/u-select.vue"
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
		components: {
			USelect
		},
		data() {
			return {
				list: ['近1天', '近7天', '近30天'],
				current: 0,
				chartData: {},
				opts: {
					color: ["#1890FF", "#91CB74", "#FAC858", "#EE6666", "#73C0DE", "#3CA272", "#FC8452", "#9A60B4",
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
						}
					}
				},
				spaceName: null,
				spaceId: null, //空间位置id
				positionId: null, //空间位置id
				positionName: null,
				value1: false,
				position1: [],
				value2: false,
				position2: [],
				days: 1,
			};
		},
		mounted() {
			this.spaceTree()
			this.getAddress()
		},
		methods: {
			change(index) {
				switch (index) {
					case 0:
						this.days = 1
						this.getAddress()
						break;
					case 1:
						this.days = 7
						this.getAddress()
						break;
					default:
						this.days = 30
						this.getAddress()
						break;
				}
				this.current = index;
			},
			confirm1(e) {
				this.position2 = []
				this.positionName = null
				this.positionId = null
				this.spaceId = e[e.length - 1].value
				this.spaceName = e[e.length - 1].label
				this.positions()
			},
			confirm2(e) {
				this.positionId = e[e.length - 1].value
				this.positionName = e[e.length - 1].label
			},
			//获取空间位置
			spaceTree() {
				spaceTree({
					projectId: this.$store.getters.projectId
				}).then(res => {
					this.position1 = res.data.data
				})
			},
			//空间单元
			positions() {
				positions({
					projectId: this.$store.getters.projectId,
					spaceId: this.spaceId
				}).then(res => {
					this.position2 = res.data.data
				})
				this.getAddress()
			},
			//统计图查询
			getAddress() {
				getAddress({
					projectId: this.$store.getters.projectId,
					days: this.days,
					startTime: this.startTime,
					endTime: this.endTime,
					spaceId: this.spaceId,
					positionId: this.positionId
				}).then(res => {
					let data = res.data.data
					setTimeout(() => {
						let res = {
							categories: data.xaxis,
							series: [{
								name: "数量",
								data: data.series
							}]
						};
						this.chartData = JSON.parse(JSON.stringify(res));
					}, 500);
				})
			}
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
