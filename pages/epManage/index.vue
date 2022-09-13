<template>
	<view class="warp">
		<view class="search">
			<view style="flex:4" @click="show1 = true">
				<u--input v-model="wearter" color="#888888" fontSize="21rpx" suffixIcon="arrow-down"
					suffixIconStyle="color: #909399" disabled>
				</u--input>
			</view>
			<view class="name">年份</view>
			<view style="flex:3;" @click="show2 = true">
				<u--input v-model="year" color="#888888" fontSize="21rpx" suffixIcon="arrow-down"
					suffixIconStyle="color: #909399" disabled>
				</u--input>
			</view>
			<u-tag text="查询" type="primary" style="padding-left: 30rpx;"></u-tag>
		</view>
		<mescroll-uni :top="0" :fixed="false" ref="mescrollRef" :down="downOption" :up="upOption" class="content">
			<line-echarts ref="lineEcharts"></line-echarts>
			<u-picker :show="show1" :columns="columns1" closeOnClickOverlay @cancel="show1 = false" @close="show1=false"
				@confirm="confirm"></u-picker>
			<u-picker :show="show2" :columns="columns2" closeOnClickOverlay @cancel="show2 = false" @close="show2=false"
				@confirm="confirm"></u-picker>
		</mescroll-uni>
	</view>
</template>

<script>
	import MescrollMixin from "@/uni_modules/mescroll-uni/components/mescroll-uni/mescroll-mixins.js";
	import LineEcharts from "./components/lineEcharts.vue"

	export default {
		mixins: [MescrollMixin],
		components: {
			LineEcharts,
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
				startTime: "",
				endTime: "",
				range: null,
				wearter: "单位面积取水量",
				show1: false,
				columns1: [
					['单位面积取水量', '单位面积取水量', '单位面积取水量']
				],
				year: "5年趋势图",
				show2: false,
				columns2: [
					['5年趋势图', '5年趋势图', '5年趋势图']
				],
			}
		},
		methods: {

		}
	}
</script>


<style scoped lang="scss">
	.warp {
		padding-top: 4rpx;
		display: flex;
		flex-direction: column;

		.search {
			padding: 25rpx 30rpx;
			display: flex;
			flex-direction: row;
			align-items: center;

			.name {
				padding-left: 30rpx;
				padding-right: 14rpx;
				font-size: 21rpx;
				font-weight: 500;
				color: #666666;
			}

			::v-deep .u-input {
				padding: 6rpx !important;
				font-size: 21rpx;
			}

			::v-deep .uni-input-placeholder {
				font-size: 21rpx;
			}
		}

		.content {
			flex: 1;
			min-height: 0;
			min-width: 0;
			background-color: #ffffff;
		}
	}
</style>
