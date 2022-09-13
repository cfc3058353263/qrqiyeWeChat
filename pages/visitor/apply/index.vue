<template>
	<view class="warp">
		<view class="content">
			<view class="u-demo-block__content">
				<u-tabs :list="list1" ref="uTabs" :current="current" @change="tabsChange" :scrollable="false"
					:activeStyle="{color: '#2E7EFF'}">
				</u-tabs>
			</view>
			<view class="search">
				<u-search shape="shape" :show-action="false" v-model="tittle" @search="search" placeholder="请输入标题"
					bgColor="#ffffff" borderColor="#d7d7d7"></u-search>
			</view>
			<swiper :current="swiperCurrent" @change="transition">
				<swiper-item class="swiper-item" v-for="(item, index) in tabs" :key="index">
					<approval-list :tittle="tittle" ref="approvalList" :status="index"></approval-list>
				</swiper-item>
			</swiper>
		</view>
		<view class="footer">
			<view class="button">
				<u-button type="primary" class="primary" shape="circle" text="新建预约" @click="make">
				</u-button>
				<u-button type="primary" :plain="true" shape="circle" text="邀请预约" @click="invitation">
				</u-button>
			</view>
		</view>
	</view>
</template>
<script>
	import ApprovalList from "./components/approvalList.vue"
	export default {
		components: {
			ApprovalList
		},
		data() {
			return {
				downOption: {
					use: false,
					auto: false,
				},
				upOption: {
					use: false,
					auto: false,
				},
				tittle: null,
				status: 0,
				swiperCurrent: 0,
				current: 0,
				tabs: [{
						value: '0'
					},
					{
						value: '1'
					},
				],
				list1: [{
					name: '全部',
				}, {
					name: '审核中'
				}]
			}
		},
		onShow() {
			this.getRefresh() && this.$refs.approvalList[this.status].mescroll.triggerDownScroll();
			this.getRefresh() && this.$refs.approvalList[this.status].mescroll.scrollTo(0, 0);
			this.refreshF(false)
		},
		methods: {
			// tabs通知swiper切换
			tabsChange(e) {
				this.swiperCurrent = e.index;
				this.status = e.index
				this.$refs.approvalList[e.index].mescroll.triggerDownScroll()
			},
			// swiper-item左右移动，通知tabs的滑块跟随移动
			transition(e) {
				this.current = e.detail.current
				this.status = e.detail.current
			},
			//预约
			make() {
				this.$Router.push({
					name: "visitorApplyMake"
				})
			},
			//邀约
			invitation() {
				this.$Router.push({
					name: "visitorApplyInvitation"
				})
			},
			//查询按钮
			search() {
				console.log(this.status)
				this.$refs.approvalList[this.status].mescroll.triggerDownScroll()
			}
		}
	}
</script>
<style scoped lang="scss">
	.warp {
		display: flex;
		flex-direction: column;
		padding-top: 4rpx;

		.search {
			padding: 20rpx 18rpx;
		}

		.content {
			flex: 1;
			display: flex;
			flex-direction: column;

			.u-demo-block__content {
				background-color: #fff;
			}

			::v-deep uni-swiper {
				flex: 1;
			}
		}

		.footer {
			background-color: #ffffff;
			border-top: 1px solid #d7d7d7;
			padding: 10rpx;
		
			.button {
				display: flex;
				flex-direction: row;
				padding: 10rpx 20rpx;
		
				.primary {
					margin-right: 40rpx;
				}
			}
		}
	}
</style>
