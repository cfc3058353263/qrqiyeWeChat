<template>
	<view class="warp">
		<view style="padding: 10rpx 20rpx; 10rpx">
			<uni-datetime-picker v-model="range" type="daterange" @change="change" />
		</view>
		<mescroll-uni :fixed="false" ref="mescrollRef" :down="downOption" :up="upOption" class="content">
			<view class="item">
				<view class="title">
					<view class="name">所属部门统计</view>
					<u--image :showLoading="true" :src="identSwitch?ring:column" width="40rpx" height="40rpx"
						@click="identSwitch = !identSwitch">
					</u--image>
				</view>
				<view class="charts-box">
					<qiun-data-charts ref="charts" type="ring" :opts="opts" :chartData="pieIdent" v-if="identSwitch" />
					<qiun-data-charts type="column" :opts="opts" :chartData="lineIdent" v-if="!identSwitch" />
				</view>
			</view>
			<view class="item">
				<view class="title">
					<view class="name">道闸流量统计(进)</view>
					<!-- <u-tag :text="enterSwitch?'饼状':'柱状'" size="large" @click="enterSwitch = !enterSwitch"></u-tag> -->
					<u--image :showLoading="true" :src="enterSwitch?ring:column" width="40rpx" height="40rpx"
						@click="enterSwitch = !enterSwitch">
					</u--image>
				</view>
				<view class="charts-box">
					<qiun-data-charts ref="charts" type="ring" :opts="opts" :chartData="pieEnter1" v-if="enterSwitch" />
					<qiun-data-charts type="column" :opts="opts" :chartData="lineEnter1" v-if="!enterSwitch" />
				</view>
			</view>

			<view class="item">
				<view class="title">
					<view class="name">道闸流量统计(出)</view>
					<!-- <u-tag :text="outerSwitch?'饼状':'柱状'" size="large" @click="outerSwitch = !outerSwitch"></u-tag> -->
					<u--image :showLoading="true" :src="outerSwitch?ring:column" width="40rpx" height="40rpx"
						@click="outerSwitch = !outerSwitch">
					</u--image>
				</view>
				<view class="charts-box">
					<qiun-data-charts type="ring" :opts="opts" :chartData="pieOuter1" v-if="outerSwitch" />
					<qiun-data-charts type="column" :opts="opts" :chartData="lineOuter1" v-if="!outerSwitch" />
				</view>
			</view>
			<view class="item">
				<view class="title">
					<view class="name">流量统计(进)</view>
					<view class="select">
						<view @click="showTime = true" style="width:220rpx">
							<u--input v-model="device" disabled disabledColor="#ffffff" suffixIcon="arrow-down"
								suffixIconStyle="color: #909399">
							</u--input>
						</view>
						<view @click="showTime = true" style="width:220rpx;margin-left:20rpx">
							<u--input v-model="days" disabled disabledColor="#ffffff" suffixIcon="arrow-down"
								suffixIconStyle="color: #909399">
							</u--input>
						</view>
					</view>
				</view>
				<view class="charts-box">
					<qiun-data-charts type="area" :chartData="brokenLine1" />
				</view>
				<view class="title">
					<view class="name">流量统计(出)</view>
				</view>
				<view class="charts-box">
					<qiun-data-charts type="area" :chartData="brokenLine2" />
				</view>
			</view>
			<u-picker :show="showTime" closeOnClickOverlay @cancel="showTime = false" @close="showTime=false"
				@confirm="(e)=>confirm(e)" keyName="label" :columns="dayList">
			</u-picker>
		</mescroll-uni>
	</view>
</template>

<script>
	import MescrollMixin from "@/uni_modules/mescroll-uni/components/mescroll-uni/mescroll-mixins.js";

	import {
		getByPosiIn,
		getByIdent,
		getByType
	} from "@/api/traffic/accessControlRecords.js"
	let ring = require("../../../../static/img/traffic/ring.png")
	let column = require("../../../../static/img/traffic/column.png")
	export default {
		data() {
			return {
				ring: ring,
				column: column,
				downOption: {
					use: false,
					auto: false,
				},
				upOption: {
					use: false,
					auto: false,
				},
				identSwitch: true,
				enterSwitch: true,
				outerSwitch: true,
				pieIdent: {
					series: [{
						data: []
					}]
				},
				lineIdent: {
					categories: [],
					series: [{
						name: "流量",
						data: []
					}, ]
				},
				// 门禁饼图进
				pieEnter1: {
					series: [{
						data: []
					}]
				},
				//门禁饼图出
				pieOuter1: {
					series: [{
						data: []
					}]
				},
				// 门禁柱状进
				lineEnter1: {
					categories: [],
					series: [{
						name: "流量",
						data: []
					}, ]
				},
				//门禁柱状出
				lineOuter1: {
					categories: [],
					series: [{
						name: "流量",
						data: []
					}, ]
				},
				//流量折线图
				brokenLine1: {
					categories: ["2016", "2017", "2018", "2019", "2020", "2021"],
					xAxis: {
						formatter: function(value) {
							return ""
						}
					},
					series: [{
						name: "流量",
						data: [35, 8, 25, 37, 4, 20],
					}, ]
				},
				brokenLine2: {
					categories: ["2016", "2017", "2018", "2019", "2020", "2021"],
					xAxis: {
						formatter: function(value) {
							return ""
						}
					},
					series: [{
						name: "流量",
						data: [35, 8, 25, 37, 4, 20],
					}, ]
				},
				//饼状图opts配置
				opts: {
					color: ["#6CF4C9", "#0398EA", "#015EAC", "#49439A", "#A8519A", "#E0390E", "#E87113", "#F7DB19",
						"#F3A01C", "#F7DB19", "#00951A", "#019376", "#019376"
					],
					dataLabel: false,
					padding: [5, 5, 5, 5],
					title: {
						name: "",
					},
					subtitle: {
						name: "",
					},
					extra: {
						ring: {
							ringWidth: 20,
							activeOpacity: 0.5,
							activeRadius: 10,
							offsetAngle: 0,
							labelWidth: 15,
							border: false,
							borderWidth: 3,
							borderColor: "#FFFFFF",
						}
					},
				},
				startTime: null,
				endTime: null,
				range: null,
				device: "测试门禁1",

				showTime: false,
				days: "15天",
				dayList: [
					[{
							label: "自定义",
							value: null,
						},
						{
							label: "7天",
							value: 7,
						},
						{
							label: "15天",
							value: 15,
						},
					]
				]
			};
		},
		mounted() {
			this.getByIdent() //身份统计
			this.getByPosiIn(0) //门禁统计进
			this.getByPosiIn(1) //门禁统计出
			this.getByType(null, null, 15) //流量
		},
		methods: {
			//道闸位置流量统计
			getByPosiIn(direction) {
				getByPosiIn({
					projectId: this.$store.getters.projectId,
					direction: direction,
					startTime: this.startTime,
					endTime: this.endTime
				}).then((res) => {
					setTimeout(() => {
						let categories = []
						let lineData = []
						res.data.data.map(item => {
							item['name'] = item.position
							item['value'] = (+item.positionCount)
							categories.push(item.position)
							lineData.push(+item.positionCount)
						})
						if (!direction) {
							this.lineEnter1.categories = categories
							this.lineEnter1.series[0].data = lineData
							this.pieEnter1.series[0].data = JSON.parse(JSON.stringify(res.data.data))
						} else {
							this.lineOuter1.categories = categories
							this.lineOuter1.series[0].data = lineData
							this.pieOuter1.series[0].data = JSON.parse(JSON.stringify(res.data.data))
						}
					}, 500);
				})
			},
			//身份统计
			getByIdent() {
				getByIdent({
					projectId: this.$store.getters.projectId,
					startTime: this.startTime,
					endTime: this.endTime
				}).then((res) => {
					setTimeout(() => {
						let categories = []
						let lineData = []
						res.data.data.map(item => {
							item['name'] = item.identity
							item['value'] = (+item.identityCount)
							categories.push(item.identity)
							lineData.push(+item.identityCount)
						})
						this.lineIdent.categories = categories
						this.lineIdent.series[0].data = lineData
						this.pieIdent.series[0].data = JSON.parse(JSON.stringify(res.data.data))
					}, 500);
				})
			},
			//流量趋势
			getByType(startTime, endTime, days) {
				getByType({
					startTime: startTime,
					endTime: endTime,
					days: days
				}).then(res => {
					setTimeout(() => {
						this.brokenLine1.categories = res.data.data.data.xaxis
						this.brokenLine2.categories = res.data.data.data.xaxis
						this.brokenLine1.series[0].data = res.data.data.data.in
						this.brokenLine2.series[0].data = res.data.data.data.out
					}, 500);
				})
			},
			//选择时间
			change(e) {
				this.startTime = this.moment(e[0]).format("YYYY-MM-DD HH:mm:ss")
				this.endTime = this.moment(e[1]).format("YYYY-MM-DD HH:mm:ss")

				this.getByPosiIn(0) //门禁统计进
				this.getByPosiIn(1) //门禁统计出
				this.getByIdent()
				this.getByType(this.startTime, this.endTime, null)
			},
			confirm(e) {
				this.days = e.value[0].label
				this.showTime = false
				if (e.value[0].value) {
					this.getByType(null, null, e.value[0].value)
				}
			}
		}
	};
</script>

<style scoped lang="scss">
	.warp {
		.content {
			flex: 1;
			min-height: 0;
			min-width: 0;

			.item {
				padding: 36rpx 34rpx 0;
				background-color: #ffffff;

				.title {
					display: flex;
					flex-direction: row;
					justify-content: space-between;
					font-weight: bold;
					font-size: 28rpx;
					color: #222222;
					align-items: center;
					padding-bottom: 40rpx;

					.select {
						display: flex;
						flex-direction: row;

						::v-deep .u-input {
							padding: 6rpx 10rpx !important;
						}
					}
				}

				/* 请根据实际需求修改父元素尺寸，组件自动识别宽高 */
				.charts-box {
					width: 100%;
					height: 350rpx;
				}

				@media screen and (max-width:330px) {
					.charts-box {
						width: 100%;
						height: 300px;
					}
				}
			}
		}
	}
</style>
