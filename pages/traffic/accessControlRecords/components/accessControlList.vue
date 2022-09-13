<template>
	<view class="content">
		<view class="search">
			<u-search shape="shape" :show-action="false" v-model="keyword" @search="search" placeholder="请输入姓名或工号"
				style="padding: 15rpx 20rpx;" bgColor="#ffffff" borderColor="#d7d7d7"></u-search>
			<view class="select">
				<view @click="show1 = true">
					<u--input v-model="identityName" disabled disabledColor="#ffffff" suffixIcon="arrow-down"
						suffixIconStyle="color: #909399" border="none">
					</u--input>
				</view>
				<view @click="show2 = true" style="padding-left: 20rpx;">
					<u--input v-model="temperatureName" disabled disabledColor="#ffffff" suffixIcon="arrow-down"
						suffixIconStyle="color: #909399" border="none">
					</u--input>
				</view>
				<view @click="show3 = true" style="padding-left: 20rpx;">
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
						<view class="title">{{item.name}}</view>
						<view>
							<text class="state" :style="{color:+item.temperature>37?'#E53C3C':'#2780FE'}">体温：</text>
							<text class="state" :style="{color:+item.temperature>37?'#E53C3C':'#2780FE'}">{{item.temperature}}℃</text>
						</view>
					</view>
					<view class="body">
						<view style="height: 100%;">
							<u--image :showLoading="true" :src="item.snapFace" width="110"
								height="130" mode="aspectFit"></u--image>
						</view>
						<view style="padding-left: 20rpx;">
							<view class="item">
								<view class="name">身份：</view>
								<view class="info">{{item.identity}}</view>
							</view>
							<view class="item">
								<view class="name">进/出：</view>
								<view class="info">{{+item.direction ? '出' : '进'}}</view>
							</view>
							<view class="item">
								<view class="name">工号：</view>
								<view class="info">{{item.empNo}}</view>
							</view>
							<view class="item">
								<view class="name">门禁位置：</view>
								<view class="info">{{item.position}}</view>
							</view>
							<view class="item">
								<view class="name">通行时间：</view>
								<view class="info">{{item.passageTime}}</view>
							</view>
						</view>
					</view>
				</view>
				<u-picker :show="show1" closeOnClickOverlay @cancel="show1 = false" @close="show1=false"
					@confirm="(e)=>confirm(e,1)" keyName="label" :columns="columns1">
				</u-picker>
				<u-picker :show="show2" closeOnClickOverlay @cancel="show2 = false" @close="show2=false"
					@confirm="(e)=>confirm(e,2)" keyName="label" :columns="columns2">
				</u-picker>
				<u-picker :show="show3" closeOnClickOverlay @cancel="show3 = false" @close="show3=false"
					@confirm="(e)=>confirm(e,3)" keyName="label" :columns="columns3">
				</u-picker>
			</mescroll-uni>
		</view>
	</view>
</template>

<script>
	import MescrollMixin from "@/uni_modules/mescroll-uni/components/mescroll-uni/mescroll-mixins.js";
	import {
		getList
	} from "@/api/traffic/accessControlRecords.js"
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
				keyword: null,
				// 列表数据
				dataList: [],
				directionName: "进出方向",
				direction: null,
				identityName: "身份",
				identity: null,
				temperatureName: "体温",
				temperature: null,
				show1: false,
				show2: false,
				show3: false,
				tittle: "",
				columns3: [
					[{
							label: '进出方向',
							id: null
						},
						{
							label: '进',
							id: 0
						},
						{
							label: '出',
							id: 1
						},
					]
				],
				columns2: [
					[{
							label: '体温',
							id: null
						},
						{
							label: '< 37℃',
							id: "37"
						},
						{
							label: '>37℃',
							id: "36"
						},
					]
				],
				columns1: [
					[{
							label: '身份',
							id: null
						},
						{
							label: '访客',
							id: '访客'
						},
						{
							label: '员工',
							id: '员工'
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
					identity: this.identity,
					direction: this.direction,
					temperature: this.temperature,
				}
				//联网加载数据
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
					path: "/pages/traffic/accessControlRecords/details",
					query: {
						id: item.id,
					}
				})
			},
			// 确认
			confirm(e, index) {
				switch (index) {
					case 1:
						console.log(e, index)
						this.identityName = e.value[0].label
						this.identity = e.value[0].id
						this.show1 = false
						this.reloadList()
						break;
					case 2:
						this.temperatureName = e.value[0].label
						this.temperature = e.value[0].id
						this.show2 = false
						this.reloadList()
						break;
					default:
						this.directionName = e.value[0].label
						this.direction = e.value[0].id
						this.show3 = false
						this.reloadList()
						break;
				}
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
					// border: bot;tom: 1px solid #d7d7d7;

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
					padding:0 20rpx;
					display: flex;
					flex-direction: row;

					.item {
						display: flex;
						align-items: center;
						padding: 10rpx 0;
						font-size: 22rpx;
						font-weight: 500;

						.name {
							width: 120rpx;
							text-align: right;
							color: #9B9B9B;
						}

						.info {
							flex: 1;
							padding-left: 20rpx;
							color: #474747;
						}
					}
				}
			}
		}
	}
</style>
