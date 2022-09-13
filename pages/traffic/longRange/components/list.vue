<template>
	<view class="list">
		<view class="hearder">
			<view class="selectAll">
				<checkbox-group @change="selectAll">
					<checkbox :checked="allSelect.checked" />
				</checkbox-group>
				<view>全选</view>
			</view>
			<view class="select">
				<u-button text="门禁位置" type="primary" class="position" size="small" :plain="true" @click="show = true">
				</u-button>
			</view>
		</view>
		<view class="scroll">
			<mescroll-uni :fixed="false" top="20" ref="mescrollRef" @init="mescrollInit" @down="downCallback"
				@up="upCallback" :down="downOption" :up="upOption">
				<view class="uni-list">
					<checkbox-group @change="checkboxChange">
						<view class="item" v-for="(item,index) of dataList">
							<view class="info">
								<checkbox :checked="item.checked" :value="item.value" />
								<view class="title">
									<u--image :showLoading="true"
										:src="require('../../../../static/img/traffic/disable.png')" width="auto"
										height="20" mode="heightFix"></u--image>
									<view class="name">{{item.deviceName}}</view>
								</view>
							</view>
							<view style="display: flex;flex-direction: row;">
								<u-button class="button" text="开启" @click="save(item,2)"></u-button>
								<u-button type="error" style="margin-left: 20rpx;background-color: #f56c6c;color: #fff;" class="button" text="关闭" @click="save(item,1)"></u-button>
							</view>
						</view>
					</checkbox-group>
				</view>
				<USelect v-model="show" mode="mutil-column-auto" :list="columns" @confirm="confirm" value-name="id"
					label-name="name"></USelect>
			<!-- 	<u-picker :show="show" closeOnClickOverlay @cancel="show = false" @close="show=false" keyName="name"
					:columns="columns" @change="changeHandler" @confirm="confirm">
				</u-picker> -->
			</mescroll-uni>
		</view>
		<view class="footer">
			<view class="button">
				<u-button type="primary" class="primary" shape="circle" text="开启" @click="saveList(2)">
				</u-button>
				<u-button type="primary" :plain="true" shape="circle" text="关闭" @click="saveList(1)">
				</u-button>
			</view>
		</view>
		<u-toast ref="uToast"></u-toast>
	</view>
</template>
<script>
	import MescrollMixin from "@/uni_modules/mescroll-uni/components/mescroll-uni/mescroll-mixins.js";
	import USelect from "@/components/uselect/u-select.vue"
	
	import {
		spaceTree,
		getList,
		save,
		saveList
	} from "@/api/traffic/longRange.js"

	export default {
		mixins: [MescrollMixin],
		components:{
			USelect
		},
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
				allSelect: {
					value: "All",
					checked: false,
				},
				dataList: [],
				show: false,
				columns: [],
				positionId: null
			}
		},
		created() {
			this.getTree()
		},
		methods: {
			//单选操作
			checkboxChange: function(e) {
				if (e.detail.value.length == this.dataList.length) {
					this.allSelect.checked = true
				} else {
					this.allSelect.checked = false
				}
				var dataList = this.dataList,
					values = e.detail.value;
				for (var i = 0, lenI = dataList.length; i < lenI; ++i) {
					const item = dataList[i]
					if (values.includes(item.value)) {
						this.$set(item, 'checked', true)
					} else {
						this.$set(item, 'checked', false)
					}
				}
			},
			//全选操作
			selectAll(e) {
				if (e.detail.value.length > 0) {
					this.allSelect.checked = true
					this.dataList.map(item => {
						item.checked = true
					})
				} else {
					this.allSelect.checked = false
					this.dataList.map(item => {
						item.checked = false
					})
				}
			},
			//获取门禁树
			getTree() {
				spaceTree({
					projectId: this.$store.getters.projectId
				}).then(res => {
					this.columns = res.data.data
				})
			},
			confirm(e) {
				this.positionId = e[e.length-1].value
				this.reloadList()
			},
			/*mescroll组件初始化的回调,可获取到mescroll对象 (此处可删,mixins已默认)*/
			mescrollInit(mescroll) {
				this.mescroll = mescroll;
			},
			upCallback(page) {
				let data = {
					limit: page.size,
					page: page.num,
					projectId: this.$store.getters.projectId,
					businessCode: "current",
					businessType: "PedestrianGate",
					position_id: this.positionId,
					deviceName: null
				}
				getList(data).then((res) => {
					this.mescroll.endSuccess(res.data.data.records.length);
					if (page.num == 1) this.dataList = []
					res.data.data.records.map(item => {
						item["checked"] = false
					})
					this.dataList = this.dataList.concat(res.data.data.records);
				}).catch(() => {
					this.mescroll.endErr();
				})
			},
			/*若希望重新加载列表,只需调用此方法即可(内部会自动page.num=1,再主动触发up.callback)*/
			reloadList() {
				this.mescroll.resetUpScroll();
			},
			//打开
			save(item,value) {
				let requestParamList = [{
					"key": "controlType",
					"value": value
				}]
				let data = {
					serviceId: 'doorControl',
					typeCode: 'STAFF',
					typeName: '员工',
					sourceCode: 'WeChat',
					sourceName: '奇瑞企业微信',
					projectId: this.$store.getters.projectId,
					projectName: item.projectName,
					deviceId:item.deviceId,
					deviceCode:item.deviceCode,
					deviceName:item.deviceName,
					requestParamList,
				}
				console.log(data)
				save(data).then(res=>{
					console.log(res)
					if(res.data.msg === "success"){
						this.$refs.uToast.show({
							position:"top",
							type:"success",
							message:"操作成功"
						})
					}else{
						this.$refs.uToast.show({
							position:"top",
							type:"error",
							message:"操作失败"
						})
					}
				})
			},
			//批量打开
			saveList(value){
				let requestParamList = [{
					"key": "controlType",
					"value": value
				}]
				let deviceList = []
				for(let item of this.dataList){
					if(item.checked){
						deviceList.push({deviceId:item.deviceId,deviceName:item.deviceName,deviceCode:item.deviceCode})
					}
				}
				if(deviceList.length === 0){
					this.$refs.uToast.show({
						position:"top",
						type:"error",
						message:"请选择设备"
					})
				}
				let data = {
					serviceId: 'doorControl',
					typeCode: 'STAFF',
					typeName: '员工',
					sourceCode: 'WeChat',
					sourceName: '奇瑞企业微信',
					projectId: this.$store.getters.projectId,
					requestParamList,
					deviceList
				}
				saveList(data).then(res=>{
					if(res.data.msg === "success"){
						this.$refs.uToast.show({
							position:"top",
							type:"success",
							message:"操作成功"
						})
					}else{
						this.$refs.uToast.show({
							position:"top",
							type:"error",
							message:"操作失败"
						})
					}
				})
			}
		}
	}
</script>
<style scoped lang="scss">
	.list {
		display: flex;
		flex-direction: column;
		height: 100%;

		.hearder {
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			align-items: center;
			padding: 0 30rpx;

			.selectAll {
				display: flex;
				flex-direction: row;
				align-items: center;
				font-size: 24rpx;
				font-weight: 400;
				color: #999999;

				::v-deep .uni-checkbox-input {
					background-color: transparent !important;
				}
			}

			.select {
				.position {
					background-color: transparent;
					padding: 0 40rpx;
				}
			}
		}

		.scroll {
			flex: 1;
			min-width: 0;
			min-height: 0;
			padding: 0 20rpx;

			.item {
				background-color: #fff;
				padding: 30rpx;
				border-radius: 20rpx;
				display: flex;
				flex-direction: row;
				justify-content: space-between;
				align-items: center;
				margin-bottom: 20rpx;

				.info {
					display: flex;
					flex-direction: row;
					height: 45rpx;

					.title {
						margin-left: 20rpx;
						display: flex;
						flex-direction: row;

						.name {
							color: #1A1A1A;
							font-size: 28rpx;
							padding-left: 20rpx;
						}

					}

				}

				.button {
					width: 80rpx;
					height: 80rpx;
					padding: 0;
					border-radius: 50%;
					background-color: #F4F7FE;
					color: #347DF7;
				}
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

		.uni-list-cell {
			justify-content: flex-start !important
		}
		::v-deep .uni-checkbox-input{
			width: 27rpx;
			height: 27rpx;
		}
		::v-deep .uni-checkbox-input-checked{
			width: 27rpx;
			height: 27rpx;
		}
	}
</style>
