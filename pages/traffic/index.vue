<template>
	<view class="warp">
		<view class="menu">
			<u-row justify="space-between" gutter="10">
				<u-col v-for="(item,index) of menuList1" :key="index" span="3" align="center" style="padding: 10rpx 0;">
					<my-link :to="{name:item.menuUrl}">
						<view class="menuIcon">
							<u--image :showLoading="true" :src="item.menuIcon" width="92rpx" height="92rpx">
							</u--image>
							<view class="menuName">{{item.menuName}}</view>
						</view>
					</my-link>
				</u-col>
			</u-row>
		</view>
		<view class="">
			<door-echarts></door-echarts>
			<car-echarts></car-echarts>
		</view>
	</view>
</template>

<script>
	import doorEcharts from "./components/doorEcharts.vue"
	import carEcharts from "./components/carEcharts.vue"
	export default {
		components: {
			doorEcharts,
			carEcharts
		},
		data() {
			return {
				menuList1: [{
						menuIcon: "../../static/img/traffic/longRange.png",
						menuName: "远程开门",
						menuUrl: "longRange"
					},
					{
						menuIcon: "../../static/img/traffic/accessControlRecords.png",
						menuName: "门禁记录",
						menuUrl: "accessControlRecords"
					},
					{
						menuIcon: "../../static/img/traffic/vehicleRecord.png",
						menuName: "车辆记录",
						menuUrl: "vehicleRecord"
					},
				]
			}
		},
		onLoad() {

		},
		methods: {

		}
	}
</script>

<style scoped lang="scss">
	.warp {
		padding-top: 6rpx;

		.menu {
			background: #fff;
			padding: 39rpx 74rpx;

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
			}
		}

		::v-deep .u-row {
			justify-content: start !important;
		}
	}
</style>
