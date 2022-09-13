<template>
	<view class="warp">
		<view class="content">
			<view class="bg"></view>
			<u-navbar title="我的" safeAreaInsetTop fixed placeholder bgColor="rgba(255, 255, 255, 0.0)"
				:titleStyle="{color:'#fff'}">
				<view slot="left"></view>
			</u-navbar>
			<view class="avatar">
				<!-- 	<u--image :showLoading="true"
					:src="$store.getters.avatar?$store.getters.avatar:'../../static/img/user/defaultAvatar.png'"
					width="97rpx" height="97rpx">
				</u--image> -->
				<u--image :showLoading="true" src="../../static/img/user/defaultAvatar.png" width="97rpx"
					height="97rpx">
				</u--image>
				<view class="name">{{$store.getters.userName?$store.getters.userName: "您好！请登录"}}</view>
			</view>
			<view class="items">
				<view class="u-page__item">
					<u-cell-group>
						<u-cell-group>
							<u-cell class="cell" :clickable="true" title="消费充值" icon="../../static/img/user/wallet.png"
								:border="false" isLink :titleStyle="titleStyle" :iconStyle="iconStyle"></u-cell>
							<u-cell class="cell" :clickable="true" title="设置" icon="../../static/img/user/setup.png"
								:border="false" isLink :titleStyle="titleStyle" :iconStyle="iconStyle" url="/pages/user/settings"></u-cell>
						</u-cell-group>
					</u-cell-group>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				titleStyle:{
					color:"#000000",
					fontSize: "28rpx",
					fontWeight: 500,
					paddingLeft:"20rpx"
				},
				iconStyle:{
					width:"29rpx",
					height:"29rpx"
				}
			}
		},
		onReady() {
			console.log(this.$store);
		},
		computed: {
			// //状态栏高度
			// statusHeight() {
			// 	return uni.getSystemInfoSync().statusBarHeight + 132 || 200; //如果没有获取到高度，那么指定10px；
			// }
		},
		methods: {

		}
	}
</script>

<style scoped lang="scss">
	.warp {

		// position: relative;
		.content {
			height: 100%;
			width: 100%;
			position: relative;
			display: flex;
			flex-direction: column;

			.bg {
				width: 100%;
				height: 400rpx;
				background: linear-gradient(0deg, #5B83F7, #59A9FF);
				position: absolute;
			}

			.avatar {
				position: relative;
				z-index: 11;
				display: flex;
				flex-direction: row;
				align-items: center;
				padding: 40rpx 0 40rpx 33rpx;

				.name {
					font-size: 32rpx;
					font-family: PingFang SC;
					font-weight: 500;
					color: #FFFFFF;
					margin-left: 20rpx;
				}
			}

			.items {
				margin: 0 16rpx;
				flex: 1;
				z-index: 11;
				position: relative;
				background-color: #f7f7f7;

				.cell {
					background-color: #FFFFFF;
					padding: 20rpx 0;
					border-bottom: 3rpx solid #DFDFDF;
				}
				::v-deep .u-line{
					border: none !important;
				}
			}
		}
	}
</style>
