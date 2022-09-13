<template>
	<mescroll-uni :fixed="false" top="0" ref="mescrollRef" @init="mescrollInit" @down="downCallback" @up="upCallback"
		style="padding: 0 20rpx;" :down="downOption" :up="upOption">
		<view class="card" v-for="(item,index) of dataList" :key="index" @click="link(item)">
			<view class="header">
				<view class="title">{{item.tittle}}</view>
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
					<view class="info">{{item.tittle}}</view>
				</view>
				<view class="item">
					<view class="name">访客姓名：</view>
					<view class="info">{{item.visitorName}}</view>
				</view>
				<view class="item">
					<view class="name">来访原因：</view>
					<view class="info">{{item.applicant}}</view>
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
</template>

<script>
	import MescrollMixin from "@/uni_modules/mescroll-uni/components/mescroll-uni/mescroll-mixins.js";
	import {
		selectPage
	} from "@/api/visitor/index.js"
	import {
		apiSearch
	} from "@/api/mock.js"
	export default {
		props: {
			status: {
				type: Number | null,
				default: null
			},
			tittle: {
				type: String | null,
				default: null
			}
		},
		mixins: [MescrollMixin],
		data() {
			return {
				mescroll: null, // mescroll实例对象 (此行可删,mixins已默认)
				// 下拉刷新的配置(可选, 绝大部分情况无需配置)
				downOption: {},
				// 上拉加载的配置(可选, 绝大部分情况无需配置)
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
				// stutas
				recordStatus: {
					"1": "待审核",
					"2": "审核通过",
					"3": "审批驳回",
					"4": "已撤回",
					"5": "不同意",
				}

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
					projectId: 242,
				}
				if (this.status) {
					data["status"] = this.status
				}
				this.tittle && (data["tittle"] = this.tittle)
				selectPage(data).then((res) => {
					this.mescroll.endSuccess(res.data.data.records.length);
					if (page.num == 1) this.dataList = []
					this.dataList = this.dataList.concat(res.data.data.records);
				}).catch(() => {
					this.mescroll.endErr();
				})
			},
			/*若希望重新加载列表,只需调用此方法即可(内部会自动page.num=1,再主动触发up.callback)*/
			reloadList() {
				this.mescroll.resetUpScroll();
			},
			link(item) {
				this.$Router.push({
					path: "/pages/visitor/apply/details",
					query: {
						id: item.id,
						status: item.status
					}
				})
			}
		},
		mounted() {}
	}
</script>
<style scoped lang="scss">
	.card {
		background-color: #fff;
		font-size: 28rpx;
		margin-bottom: 30rpx;

		.header {
			display: flex;
			padding: 20rpx;
			justify-content: space-between;
			border-bottom: 1px solid #d7d7d7;
			background-color: #EBF4FF;

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
</style>
