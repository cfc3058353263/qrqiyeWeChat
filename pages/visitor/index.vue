<template>
	<view class="warp">
		<view class="bulletinBoard">
			<view class="title">访客统计</view>
			<u-row justify="space-between" gutter="10">
				<u-col span="4" align="center">
					<view class="item">
						<u--image :showLoading="true" src="../../static/img/visitor/applicant.png" width="63rpx"
							height="63rpx">
						</u--image>
						<view class="number">
							<view class="type">申请人数</view>
							<view class="index">100</view>
						</view>
					</view>
				</u-col>
				<u-col span="4" align="center">
					<view class="item">
						<u--image :showLoading="true" src="../../static/img/visitor/enter.png" width="63rpx"
							height="63rpx">
						</u--image>
						<view class="number">
							<view class="type">已入园</view>
							<view class="index"
								style="background: linear-gradient(0deg, #FF7D7D 0%, #FF6969 100%);-webkit-background-clip: text;-webkit-text-fill-color: transparent;">
								70</view>
						</view>
					</view>
				</u-col>
				<u-col span="4" align="center">
					<view class="item">
						<u--image :showLoading="true" src="../../static/img/visitor/out.png" width="63rpx"
							height="63rpx">
						</u--image>
						<view class="number">
							<view class="type">已出园</view>
							<view class="index"
								style="background: linear-gradient(0deg, #6CDE80 0%, #3BCD97 100%);-webkit-background-clip: text;- webkit-text-fill-color: transparent;">
								30</view>
						</view>
					</view>
				</u-col>
			</u-row>
		</view>
		<view class="menu">
			<u-row justify="space-between" gutter="10">
				<u-col v-for="(item,index) of menuList" :key="index" span="4" align="center" style="padding: 10rpx 0;">
					<my-link :to="{name:item.menuUrl}">
						<view class="menuIcon">
							<u--image :showLoading="true" :src="item.menuIcon" width="37px" height="37px">
							</u--image>
							<view class="menuName">{{item.menuName}}</view>
						</view>
					</my-link>
				</u-col>
			</u-row>
		</view>
		<view style="padding: 28rpx 35rpx;font-weight: bold;font-size: 28rpx;color:#222222">待审批</view>
		<view class="approval">
			<mescroll-uni :fixed="false" bottom="20" ref="mescrollRef" @init="mescrollInit" @down="downCallback" @up="upCallback">
				<view class="card" v-for="(item,index) of dataList" :key="index" @click="link(item)">
					<view class="header">
						<view class="title">{{item.tittle}}</view>
						<!-- <view class="state">{{recordStatus[item.status]}}</view> -->
						<u-tag v-if="item.status == '1'" :text="recordStatus[item.status]" plain size="mini" type="primary">
						</u-tag>
						<u-tag v-else-if="item.status == '2'" :text="recordStatus[item.status]" plain size="mini"
							type="success"></u-tag>
						<u-tag v-else-if="item.status == '3'" :text="recordStatus[item.status]" plain size="mini" type="error">
						</u-tag>
						<u-tag v-else-if="item.status == '4'" :text="recordStatus[item.status]" plain size="mini"
							type="warning"></u-tag>
					</view>
					<view class="body">
						<view class="item">
							<view class="name">申请人：</view>
							<view class="info">{{item.applicant}}</view>
						</view>
						<view class="item">
							<view class="name">访客姓名：</view>
							<view class="info">{{item.visitorName}}</view>
						</view>
						<view class="item">
							<view class="name">来访原因：</view>
							<view class="info">{{item.visitReason}}</view>
						</view>
						<view class="item">
							<view class="name">下节点审批人：</view>
							<view class="info">{{item.processStarter}}</view>
						</view>
						<view class="item">
							<view class="name">申请时间：</view>
							<view class="info">{{item.applyTime}}</view>
						</view>
						<view class="item">
							<view class="name">预计到访时间：</view>
							<view class="info">{{item.visitTime}}</view>
						</view>
					</view>
				</view>
			</mescroll-uni>
		</view>
	</view>
</template>

<script>
	import MescrollMixin from "@/uni_modules/mescroll-uni/components/mescroll-uni/mescroll-mixins.js";
	import {
		getPending
	} from "@/api/visitor/index.js"
	export default {
		mixins: [MescrollMixin],
		data() {
			return {
				menuList: [{
						menuIcon: "../../static/img/visitor/apply.png",
						menuName: "访客申请",
						menuUrl: "visitorApply"
					},
					{
						menuIcon: "../../static/img/visitor/approval.png",
						menuName: "访客审批",
						menuUrl: "approval"
					},
					{
						menuIcon: "../../static/img/visitor/record.png",
						menuName: "访客记录",
						menuUrl: "record"
					},
				],
				dataList: [],
				canReset: false,
				// stutas
				recordStatus: {
					"1": "待审核",
					"2": "审核通过",
					"3": "审批驳回",
					"4": "已撤回",
				}
			}
		},
		onShow() {
			this.getRefresh() && this.mescroll.resetUpScroll();
			this.getRefresh() && this.mescroll.scrollTo(0, 0);
			this.refreshF(false)
		},
		methods: {
			upCallback(page) {
				getPending({
					limit: page.size,
					page: page.num,
				}).then((res) => {
					this.mescroll.endSuccess(res.data.data.records.length);
					if (page.num == 1) this.dataList = []
					this.dataList = this.dataList.concat(res.data.data.records);
				}).catch(() => {
					this.mescroll.endErr();
				})
			},
			link(item) {
				this.$Router.push({
					path: '/pages/visitor/details',
					query: {
						id: item.id
					}
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.warp {
		// padding: 20rpx 20rpx 0 20rpx;
		display: flex;
		flex-direction: column;

		.bulletinBoard {
			margin-top: 4rpx;
			padding: 36rpx 34rpx;
			background-color: #ffffff;

			.title {
				font-size: 28rpx;
				font-family: PingFang SC;
				font-weight: bold;
				color: #222222;
				padding-bottom: 48rpx;
			}

			.item {
				display: flex;
				flex-direction: row;
				align-items: center;

				.number {
					padding-left: 20rpx;

					.type {
						font-size: 22rpx;
						font-family: Microsoft YaHei;
						font-weight: 400;
						color: #333333;
						opacity: 0.5;
					}

					.index {
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

		.menu {
			background: #fff;
			padding: 20rpx 0;
			margin-top: 8rpx;
			.menuIcon {
				display: flex;
				align-items: center;
				flex-direction: column;
			}

			.menuName {
				font-size: 24rpx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #333333;
				margin-top: 14rpx;
			}
		}

		.approval {
			flex: 1;
			min-width: 0;
			min-height: 0;
			padding: 0 35rpx;

			.card {
				background-color: #fff;
				margin-bottom: 30rpx;

				.header {
					display: flex;
					padding: 20rpx;
					justify-content: space-between;
					background-color: #EBF4FF;
					font-size: 25rpx;
					font-weight: 500;
					color: #333333;

					.title {
						flex: 1;
						text-overflow: ellipsis;
						overflow: hidden;
						white-space: nowrap;
					}

					.state {
						width: 150rpx;
						text-align: right;
						color: #70B603;
					}
				}

				.body {
					padding: 20rpx;

					.item {
						display: flex;
						align-items: center;
						padding: 10rpx 0;
						font-size: 22rpx;
						font-weight: 500;

						.name {
							width: 180rpx;
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
