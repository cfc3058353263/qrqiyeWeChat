<template>
	<view class="warp">
		<view class="search">
			<u-search shape="shape" :show-action="false" v-model="tittle" @search="search" placeholder="请输入标题"
				bgColor="#ffffff" border="none"></u-search>
		</view>
		<view class="content">
			<approval-list :tittle="tittle" ref="approvalList"></approval-list>
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
					name: '待审核',
				}, {
					name: '全部'
				}]
			}
		},
		onLoad() {

		},
		methods: {
			search() {
				this.$refs.approvalList.mescroll.triggerDownScroll()
			}
		}
	}
</script>
<style scoped lang="scss">
	.warp {
		display: flex;
		flex-direction: column;

		.search {
			padding: 22rpx 20rpx 18rpx;
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
			display: flex;
			flex-direction: row;
			text-align: center;
			border-top: 1px solid #d7d7d7;

			.agree {
				padding: 30rpx 0;
				flex: 1;
				color: #02A7F0;
				border-right: 1px solid #d7d7d7;
			}

			.agree:hover {
				background-color: #007aff;
				color: #ffffff;
			}

			.reject {
				padding: 30rpx 0;
				flex: 1;
				color: #007aff;
			}

			.reject:hover {
				background-color: #007aff;
				color: #ffffff;
			}
		}
	}
</style>
