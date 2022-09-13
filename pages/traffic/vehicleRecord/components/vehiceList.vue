<template>
	<view class="content">
		<view class="search">
			<u-search shape="shape" :show-action="false" v-model="keyword" @search="search" placeholder="请输入车牌号或车主姓名"
				style="padding: 15rpx 20rpx;" bgColor="#ffffff" borderColor="#d7d7d7"></u-search>
			<!-- <u-search shape="shape" v-model="keyword" @custom="search" placeholder="请输入车牌号或车主姓名" bgColor="#ffffff"
				borderColor="#d7d7d7"></u-search> -->
			<view class="select">
				<view style="width: 30%;" @click="show = true">
					<u--input v-model="directionName" disabled disabledColor="#ffffff" suffixIcon="arrow-down"
						suffixIconStyle="color: #909399" border="none">
					</u--input>
				</view>
			</view>
		</view>
		<view class="scroll">
			<mescroll-uni :fixed="false" top="2" ref="mescrollRef" @init="mescrollInit" @down="downCallback"
				@up="upCallback" :down="downOption" :up="upOption">
				<view class="card" v-for="(item,index) of dataList" :key="index" @click="link(item)">
					<view class="header">
						<view class="title">{{item.licensePlate}}</view>
						<view>
							<text class="state">进出方向：</text>
							<text class="state">{{+item.direction?"入园":"出园"}}</text>
						</view>
					</view>
					<view class="body">
						<view class="item">
							<view class="name">车主名称：</view>
							<view class="info">{{item.ownerName}}</view>
						</view>
						<view class="item">
							<view class="name">车站电话：</view>
							<view class="info">{{item.phone}}</view>
						</view>
						<view class="item">
							<view class="name">道闸名称：</view>
							<view class="info">a区一楼门禁1</view>
						</view>
						<view class="item">
							<view class="name">道闸位置：</view>
							<view class="info">{{item.position}}</view>
						</view>
						<view class="item">
							<view class="name">通行时间：</view>
							<view class="info">{{item.passageTime}}</view>
						</view>
					</view>
				</view>
				<u-picker :show="show" closeOnClickOverlay @cancel="show = false" @close="show=false" @confirm="confirm"
					keyName="label" :columns="columns">
				</u-picker>
			</mescroll-uni>
		</view>
	</view>
</template>

<script>
	import MescrollMixin from "@/uni_modules/mescroll-uni/components/mescroll-uni/mescroll-mixins.js";
	import {
		getList
	} from "@/api/traffic/vehicleRecord.js"
	export default {
		mixins: [MescrollMixin],
		data() {
			return {
				mescroll: null,
				downOption: {},
				upOption: {
					page: {
						size: 10 // 每页数据的数量,默认10
					},
					noMoreSize: 5, // 配置列表的总数量要大于等于5条才显示'-- END --'的提示
					empty: {
						tip: '暂无相关数据'
					}
				},
				// 列表数据
				dataList: [],
				directionName: "进出方向",
				direction: null, //
				show: false,
				keyword: "",
				columns: [
					[{
							label: '进出方向',
							id: null
						},
						{
							label: '进',
							id: 1
						},
						{
							label: '出',
							id: 2
						},
					]
				],

			}
		},
		methods: {
			/*mescroll组件初始化的回调,可获取到mescroll对象 (此处可删,mixins已默认)*/
			mescrollInit(mescroll) {
				this.mescroll = mescroll;
			},
			upCallback(page) {
				let data = {
					limit: page.size,
					page: page.num,
					keyword: this.keyword,
					direction: this.direction
				}
				//联网加载数据
				// page.num, page.size
				getList(data).then(res => {
					this.mescroll.endSuccess(res.data.data.records.length);
					if (page.num == 1) this.dataList = []
					this.dataList = this.dataList.concat(res.data.data.records);
				}).catch(() => {
					//联网失败, 结束加载
					this.mescroll.endErr();
				})
			},
			reloadList() {
				this.mescroll.resetUpScroll();
			},
			//跳转
			link(item) {
				this.$Router.push({
					path: "/pages/traffic/vehicleRecord/details",
					query: {
						id: item.id,
					}
				})
			},
			// 确认
			confirm(e) {
				this.directionName = e.value[0].label
				this.direction = e.value[0].id
				this.reloadList()
				this.show = false
			},
			//搜索
			search() {
				this.reloadList()
			}
		},
		mounted() {}
	}
</script>
<style scoped lang="scss">
	.content {
		display: flex;
		flex-direction: column;
		height: 100%;

		.search {
			.select {
				background-color: #ffffff;
				padding: 15rpx 40rpx 15rpx;
				display: flex;
				flex-direction: row;
			}
		}

		.scroll {
			flex: 1;
			min-width: 0;
			min-height: 0;

			.card {
				background-color: #fff;
				font-size: 28rpx;
				margin-bottom: 30rpx;

				.header {
					display: flex;
					padding: 20rpx;
					justify-content: space-between;
					align-items: center;
					background-color: #EBF4FF;
				
					.title {
						font-size: 28rpx;
						font-family: PingFang SC;
						font-weight: 500;
						color: #1C1C1C;
						flex: 1;
						text-overflow: ellipsis;
						overflow: hidden;
						white-space: nowrap;
					}
				
					.state {
						width: 150rpx;
						text-align: right;
						font-size: 22rpx;
						font-family: PingFang SC;
						font-weight: 500;
						color: #2780FE;
					}
				}

				.body {
					padding:34rpx 32rpx;

					.item {
						display: flex;
						align-items: center;
						padding: 10rpx 0;
						font-size: 22rpx;
						font-weight: 400;

						.name {
							// width: 160rpx;
							text-align: right;
							color: #d7d7d7;
						}

						.info {
							flex: 1;
							padding-left: 20rpx;
							color: #333333;
						}
					}
				}
			}
		}
	}
</style>
