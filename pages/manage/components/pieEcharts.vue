<template>
	<view class="content">
		<view class="title">
			<u--image :showLoading="true" src="../../static/img/manage/pie.png" width="24rpx" height="24rpx">
			</u--image>
			<view class="name">告警处理</view>
		</view>
		<view class="charts-box">
			<qiun-data-charts type="ring" :opts="opts" :chartData="chartData" />
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				chartData: {},
				opts: {
					color: ["#1890FF", "#43D5FA", "#82E7B7"],
					dataLabel: false,
					padding: [5, 5, 5, 5],
					title: {
						name: "告警总数",
						fontSize: 15,
						color: "#666666"
					},
					subtitle: {
						name: "13",
						fontSize: 25,
						color: "#7cb5ec"
					},
					legend: {
						fontColor:"#666666",
						fontSize:15,
						padding: 20
					},
					extra: {
						ring: {
							ringWidth: 20,
							activeOpacity: 0.5,
							activeRadius: 10,
							offsetAngle: 0,
							labelWidth: 15,
							border: false,
							borderWidth: 3,
							borderColor: "#FFFFFF",
						}
					},
				},
			};
		},
		mounted() {
			this.getServerData();
		},
		methods: {
			getServerData() {
				//模拟从服务器获取数据时的延时
				setTimeout(() => {
					//模拟服务器返回数据，如果数据格式和标准格式不同，需自行按下面的格式拼接
					let res = {
						series: [{
							data: [{
								"name": "待处理        50%",
								"value": 50
							}, {
								"name": "已处理        23%",
								"value": 23
							}, {
								"name": "已关闭        26%",
								"value": 26
							}, ]
						}]
					};
					this.chartData = JSON.parse(JSON.stringify(res));
				}, 500);
			},
		}
	};
</script>

<style scoped lang="scss">
	.content {
		background-color: #fff;

		.title {
			display: flex;
			align-items: center;
			padding: 37rpx 35rpx;

			.name {
				padding-left: 22rpx;
				font-size: 28rpx;
				font-weight: bold;
				color: #222222;
			}
		}

		.charts-box {
			width: 100%;
			height: 400rpx;
		}
	}
</style>
