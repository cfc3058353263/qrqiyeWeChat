<template>
	<view class="warp">
		<view class="title">二维码&链接</view>
		<view class="content">
			<u--image class="image" :src="src" width="300rpx" height="300rpx"></u--image>
			<view class="buttons">
				<!-- <u-button text="复制" type="primary" :plain="true" size="small" class="copy"></u-button>
				<u-button text="下载" type="primary" :plain="true" size="small" class="upload"></u-button> -->
			</view>
			<view class="copyLink">
				<view class="link">
					<u--input v-model="link" prefixIcon="attach" disabled>
					</u--input>
				</view>
				<view class="button">
					<u-button text="复制" type="primary" :plain="true" size="small" class="copy" @click="copyLink"></u-button>
					<!-- <u-button text="打开" type="primary" :plain="true" size="small" class="upload" @click="openLink"></u-button> -->
				</view>

			</view>
		</view>
	</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				link: "https:www.baidu.com",
				src:null
			}
		},
		methods: {
			copyLink() {
				uni.setClipboardData({
					data: this.link, //要被复制的内容
					success: () => { //复制成功的回调函数
						uni.showToast({ //提示
							title: '复制成功'
						})
					}
				});
			},
			openLink(){
			}
		},
		onLoad(){
			this.link = this.$Route.query.url;
			this.src = this.$Route.query.src
		}
	}
</script>

<style scoped lang="scss">
	.warp {
		padding: 0 20rpx;

		.title {
			padding: 20rpx 0;
		}

		.content {
			text-align: center;

			.image {
				align-items: center;
				margin-bottom: 20rpx;
			}

			.buttons {
				display: flex;
				flex-direction: row;
				align-items: center;
				justify-content: center;

				.copy {
					padding: 2rpx 50rpx;
					width: 150rpx;
					margin: 0;
					margin-right: 20rpx;
				}

				.upload {
					padding: 0rpx 50rpx;
					width: 150rpx;
					margin: 0;
				}
			}

			.copyLink {
				width: 100%;
				background-color: #fff;
				display: flex;
				flex-direction: row;
				padding: 8rpx 8rpx;
				margin-top: 20rpx;
				align-items: center;

				.link {
					flex: 1;
					background-color: #d7d7d7;
				}

				.button {
					display: flex;
					flex-direction: row;

					.u-button--small {
						min-width: 0rpx;
					}

					.copy {
						padding: 2rpx 10rpx;
						width: 100rpx;
						margin: 0;
						margin-right: 5rpx;
					}

					.upload {
						padding: 0rpx 10rpx;
						width: 100rpx;
						margin: 0;
					}
				}
			}
		}
	}
</style>

<!-- <template>
	<view class="content">
		<image class="logo" src="/static/logo.png"></image>
		<view class="text-area">
			<text class="title">{{title}}</text>
			<u-tag text="标签" plain ></u-tag>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: 'Hello'
			}
		},
		onLoad() {

		},
		methods: {

		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
</style> -->
