<template>
	<view class="warp">
		<mescroll-uni :fixed="false" ref="mescrollRef" :down="downOption" :up="upOption" class="content">
			<view class="title">基础信息</view>
			<view class="item">
				<view>车牌号</view>
				<view>{{data.licensePlate}}</view>
			</view>
			<view class="item">
				<view>车牌号</view>
				<view>{{data.licensePlate}}</view>
			</view>
			<view class="item">
				<view>道闸位置</view>
				<view>{{data.position}}</view>
			</view>
			<view class="item">
				<view>车辆类型</view>
				<view>{{data.vehicleType}}</view>
			</view>
			<view class="item">
				<view>车辆颜色</view>
				<view>{{data.vehicleColor}}</view>
			</view>
			<view class="item">
				<view>体温</view>
				<view>{{data.temperature}}</view>
			</view>
			<view class="item">
				<view>排放量</view>
				<view>{{data.vehicleEmissions}}</view>
			</view>
			<view class="item">
				<view>车主姓名</view>
				<view>{{data.ownerName}}</view>
			</view>
			<view class="item">
				<view>车主电话</view>
				<view>{{data.phone}}</view>
			</view>
			<view class="item">
				<view>所属单位</view>
				<view>{{data.department}}</view>
			</view>
			<view class="item">
				<view>通行方向</view>
				<view>{{data.direction}}</view>
			</view>
			<view class="item">
				<view>通行时间</view>
				<view>{{data.passageTime}}</view>
			</view>
		</mescroll-uni>
	</view>
</template>

<script>
	import MescrollMixin from "@/uni_modules/mescroll-uni/components/mescroll-uni/mescroll-mixins.js";
	import {
		getInfo
	} from "@/api/traffic/vehicleRecord.js"
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
				id: null,
				data: {}
			}
		},
		onLoad() {
			this.id = this.$Route.query.id
		},
		onReady() {
			this.getInfo()
		},
		methods: {
			getInfo() {
				getInfo(this.id).then(res => {
					this.data = res.data.data
					console.log(this.data)
				})
			}
		}
	}
</script>
<style scoped lang="scss">
	.warp {
		display: flex;
		flex-direction: column;

		.title {
			padding: 15rpx 33rpx;
		}

		.content {
			flex: 1;
			min-width: 0;
			min-height: 0;

			.item {
				display: flex;
				flex-direction: row;
				justify-content: space-between;
				align-items: center;
				background-color: #ffffff;
				border-bottom: 1rpx solid #EEEEEE;
				min-height: 83rpx;
				padding: 20rpx;
				font-size: 28rpx;
				font-weight: 400;
				color: #333333;
			}
		}

	}
</style>
