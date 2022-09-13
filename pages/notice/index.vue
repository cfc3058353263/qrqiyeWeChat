<template>
	<view class="warp">
		<view class="">
			<view class="top">
				<u--image :showLoading="true" src="../../static/img/notice/noticeIcon.png" width="29rpx" height="29rpx">
				</u--image>
				<view style="margin-left: 9rpx;">未读/已读(1/3)</view>
			</view>
		</view>
		<mescroll-uni :fixed="false" top="13rpx" ref="mescrollRef" :down="downOption" :up="upOption" class="content">
			<view class="item">
				<u--image :showLoading="true" src="../../static/img/notice/gaojing.png" width="69rpx" height="69rpx">
				</u--image>
				<view class="info">
					<view>
						<view class="title">这里输入待审批的标题这里输入待审批的标题这里输入待审批的标题这里输入待审批的标题</view>
						<view class="time">今天12:23:42</view>
					</view>
				</view>
				<u--image :showLoading="true" src="../../static/img/notice/jiantou.png" width="16rpx" height="29rpx">
				</u--image>
			</view>
			<view class="item">
				<u--image :showLoading="true" src="../../static/img/notice/xiaoxi.png" width="69rpx" height="69rpx">
				</u--image>
				<view class="info">
					<view>
						<view class="title">这里输入待审批的标题这里输入待审批的标题这里输入待审批的标题这里输入待审批的标题</view>
						<view class="time">今天12:23:42</view>
					</view>
				</view>
				<u--image :showLoading="true" src="../../static/img/notice/jiantou.png" width="16rpx" height="29rpx">
				</u--image>
			</view>
			<view class="item">
				<u--image :showLoading="true" src="../../static/img/notice/xinxi.png" width="69rpx" height="69rpx">
				</u--image>
				<view class="info">
					<view>
						<view class="title">这里输入待审批的标题这里输入待审批的标题这里输入待审批的标题这里输入待审批的标题</view>
						<view class="time">今天12:23:42</view>
					</view>
				</view>
				<u--image :showLoading="true" src="../../static/img/notice/jiantou.png" width="16rpx" height="29rpx">
				</u--image>
			</view>
		</mescroll-uni>
	</view>
</template>

<script>
	import MescrollMixin from "@/uni_modules/mescroll-uni/components/mescroll-uni/mescroll-mixins.js";
	export default {
		mixins: [MescrollMixin],
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
			}
		}
	}
</script>

<style scoped lang="scss">
	.warp {
		display: flex;
		flex-direction: column;
		padding: 0 20rpx;

		.top {
			padding-top: 25rpx;
			display: flex;
			flex-direction: row;
			font-size: 25rpx;
			font-weight: 400;
			color: #474747;
		}


		.content {
			flex: 1;
			min-width: 0;
			min-height: 0;

			.item {
				margin: 13rpx 0;
				display: flex;
				flex-direction: row;
				background-color: #fff;
				padding: 36rpx 27rpx;
				align-items: center;

				.info {
					flex: 1;
					display: flex;
					flex-direction: column;
					justify-content: space-between;
					padding-left: 27rpx;
					overflow: hidden;

					.title {
						font-size: 31rpx;
						font-weight: 500;
						color: #222222;
						overflow: hidden;
						white-space: nowrap;
						text-overflow: ellipsis;
					}

					.time {
						font-size: 25rpx;
						font-weight: 400;
						color: #7A7A7A;
					}
				}
			}
		}
	}
</style>
