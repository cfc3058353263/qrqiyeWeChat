<template>
	<view class="warp">
		<mescroll-uni :fixed="false" ref="mescrollRef" :down="downOption" :up="upOption" class="content">
			<view class="title">基础信息</view>
			<view class="item">
				<view>标题</view>
				<view>{{data.tittle}}</view>
			</view>
			<view class="item">
				<view>申请人</view>
				<view>{{data.applicant}}</view>
			</view>
			<view class="item">
				<view>申请工号</view>
				<view>{{data.applicantCode}}</view>
			</view>
			<view class="item">
				<view>所属部门</view>
				<view>{{data.deptName}}</view>
			</view>
			<view class="item">
				<view>联系电话</view>
				<view>{{data.phone}}</view>
			</view>
			<view class="item">
				<view>流程启动人</view>
				<view>{{data.processStarter}}</view>
			</view>
			<view class="item">
				<view>申请日期</view>
				<view>{{data.applyTime}}</view>
			</view>
			<view class="item">
				<view>来访时间</view>
				<view>{{data.visitTime}}</view>
			</view>
			<view class="item">
				<view>离开时间</view>
				<view>{{data.leaveTime}}</view>
			</view>
			<view class="item">
				<view>出入门权限</view>
				<view>{{data.accessDoor}}</view>
			</view>
			<view class="item">
				<view>来访事由</view>
				<u--textarea v-model="data.visitReason" confirmType="done" placeholder="请填写来访事由" border="none" disabled
					autoHeight style="padding:4rpx;background: #fff;">
				</u--textarea>
			</view>

			<view class="title">来访人员</view>
			<view class="tags">
				<view v-for=" (item,index) of data.visitPeopleList" :key="index">
					<u-tag :text="`来访人${index + 1}`" class="tag" :plain="!item.checked" shape="circle"
						@click="peopleChecked(item.checked,index,item)"></u-tag>
				</view>
			</view>
			<view class="item">
				<view>访客姓名:</view>
				<view>{{peopleInfo.visitorName}}</view>
			</view>
			<view class="item">
				<view>性别:</view>
				<view>{{peopleInfo.sex ? '男' : '女'}}</view>
			</view>
			<view class="item">
				<view>身份证号:</view>
				<view>{{peopleInfo.idCard}}</view>
			</view>
			<view class="item">
				<view>访客电话</view>
				<view>{{peopleInfo.visitorPhone}}</view>
			</view>
			<view class="item">
				<view>访客单位</view>
				<view>{{peopleInfo.visitorCompany}}</view>
			</view>
			<view class="item">
				<view>访客单位</view>
				<view>{{peopleInfo.nature}}</view>
			</view>
			<view class="item" style="flex-direction:column">
				<view>访客照片</view>
				<view>
					<u--image :src="peopleInfo.visitorPic" width="80px" height="80px"></u--image>
				</view>
			</view>
			<view class="item" style="flex-direction:column">
				<view>行程码</view>
				<view>
					<u--image :src="peopleInfo.tourCode" width="80px" height="80px"></u--image>
				</view>
			</view>
			<view class="item" style="flex-direction:column">
				<view>安全码</view>
				<view>
					<u--image :src="peopleInfo.safeCode" width="80px" height="80px"></u--image>
				</view>
			</view>
			<view class="item" style="flex-direction:column">
				<view>核算码</view>
				<view>
					<u--image :src="peopleInfo.nucCode" width="80px" height="80px"></u--image>
				</view>
			</view>
			<view v-if="data.visitCarsList && data.visitCarsList.length !== 0">
				<view class="title">来访车辆</view>
				<view class="tags">
					<view v-for=" (item,index) of data.visitCarsList" :key="index">
						<u-tag :text="`来访车辆${index + 1}`" class="tag" :plain="!item.checked" shape="circle"
							@click="carChecked(item.checked,index,item)"></u-tag>
					</view>
				</view>
				<view class="item">
					<view>车牌号</view>
					<view>{{carInfo && carInfo.carNum}}</view>
				</view>
				<view class="item">
					<view>车牌颜色</view>
					<view>{{carInfo && carInfo.carColor}}</view>
				</view>
				<view class="item">
					<view>排放量</view>
					<view>{{carInfo &&  carInfo.emissions}}</view>
				</view>
			</view>

			<view class="title">流程</view>
			<view class="steps">
				<view class="step">
					<view class="left">
						<view class="circular"></view>
						<view class="line"></view>
					</view>
					<view class="right">
						<view class="surname">
							<text>{{$store.getters.userName.substring(0, 1)}}</text>
						</view>
						<view class="info">
							<view class="name">{{$store.getters.userName}}</view>
						</view>
					</view>
				</view>
			</view>
			<view class="steps">
				<view class="step">
					<view class="left">
						<view class="line"></view>
						<view class="circular"></view>
						<view class="line"></view>
					</view>
					<view class="right">
						<view class="surname">
							<text>{{data.approverOneName && data.approverOneName.substring(0, 1)}}</text>
						</view>
						<view class="info">
							<view class="name">{{data.approverOneName}}</view>
						</view>
					</view>
				</view>
			</view>
			<view class="steps">
				<view class="step">
					<view class="left">
						<view class="line"></view>
						<view class="circular"></view>
						<view class="line"></view>
					</view>
					<view class="right">
						<view class="surname">
							<text>{{data.approverTwoName && data.approverTwoName.substring(0, 1)}}</text>
						</view>
						<view class="info">
							<view class="name">{{data.approverTwoName}}</view>
						</view>
					</view>
				</view>
			</view>
			<view class="steps">
				<view class="step">
					<view class="left" style="justify-content: flex-start">
						<view class="line"></view>
						<view class="circular"></view>
					</view>
					<view class="right">
						<view class="surname">
							<text>{{data.approverThreeName && data.approverThreeName.substring(0, 1)}}</text>
						</view>
						<view class="info">
							<view class="name">{{data.approverThreeName}}</view>
						</view>
					</view>
				</view>
			</view>
		</mescroll-uni>
	</view>
</template>

<script>
	import MescrollMixin from "@/uni_modules/mescroll-uni/components/mescroll-uni/mescroll-mixins.js";
	import {
		getById
	} from "@/api/visitor/index.js"
	import {
		agreeApproval,
		refuseApproval
	} from "@/api/visitor/approavl.js"
	import {
		fullNodeInfo
	} from "@/api/visitor/bpm.js"
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
				data: [],
				peopleInfo: {}, //单个人员信息
				carInfo: {}, //单个车辆信息
				popupShow: false,
				opinionAgree: null, //同意意见 
				opinionRefuse: null, //驳回意见
				type: 0
			}
		},
		onLoad() {
			this.id = this.$Route.query.id
		},
		onReady() {
			this.getById()

		},
		methods: {
			//获取流程节点
			fullNodeInfo(procId) {
				fullNodeInfo({
					procId
				}).then(res => {
					res.data.nodes.map((item, index) => {
						switch (index) {
							case 1:
								this.data.approverOneName = item.auditor[0].auditorName
								break;
							case 2:
								this.data.approverTwoName = item.auditor[0].auditorName
								break;
							default:
								this.data.approverThreeName = item.auditor[0].auditorName
								break;
						}
					})
				})
			},
			getById() {
				getById({
					id: this.id
				}).then(res => {
					this.fullNodeInfo(res.data.data.procId)
					res.data.data.visitPeopleList.map((item, index) => {
						item["checked"] = index ? false : true
					})
					res.data.data.visitCarsList.map((item, index) => {
						item["checked"] = index ? false : true
					})
					this.peopleInfo = res.data.data.visitPeopleList[0]
					this.carInfo = res.data.data.visitCarsList[0]
					this.data = res.data.data;
				})
			},
			//点击人员tag切换
			peopleChecked(checked, idx, list) {
				this.data.visitPeopleList.map((item, index) => {
					if (index === idx) {
						item.checked = true
					} else {
						item.checked = false
					}
				})
				this.peopleInfo = list
			},
			//点击车辆tag切换
			carChecked(checked, idx, list) {
				this.data.visitCarsList.map((item, index) => {
					if (index === idx) {
						item.checked = true
					} else {
						item.checked = false
					}
				})
				this.carInfo = list
			},
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
				align-items: self-start;
				
				view:last-child{
					flex: 1;
					text-align: right;
				}
			}

		}

		.steps {
			padding: 0 70rpx;
			background-color: #ffffff;

			.step {
				display: flex;
				flex-direction: row;
				align-items: center;

				.left {
					height: 180rpx;
					display: flex;
					flex-direction: column;
					justify-content: flex-end;

					// text-align: center;
					.circular {
						min-width: 40rpx;
						min-height: 40rpx;
						background: #97989a;
						border-radius: 50%;
					}

					.line {
						margin: 0 auto;
						width: 2px;
						height: 50%;
						background: #ececec;
						display: flex;
						flex-direction: row;

					}
				}

				.right {
					flex: 1;
					display: flex;
					flex-direction: row;
					padding-bottom: 4rpx;
					border-bottom: 1px solid #d7d7d7;
					align-items: center;

					.surname {
						width: 90rpx;
						height: 90rpx;
						background-color: #f7f8fa;
						display: flex;
						justify-content: center;
						align-items: center;
						color: #539af2;
						margin: 0 30rpx;
					}

					.info {
						.postNames {
							font-size: 28rpx;
							font-weight: 600;
						}
					}
				}
			}
		}

		.tags {
			display: flex;
			align-items: flex-end;
			flex-wrap: wrap;
			background-color: #ffffff;
			padding: 26rpx 34rpx;
			margin-bottom: 4rpx;

			.tag {
				margin-left: 10rpx;
			}
		}


		.footer {
			background-color: #ffffff;
			border-top: 1px solid #d7d7d7;
			padding: 10rpx;

			.button {
				display: flex;
				flex-direction: row;

				.primary {
					margin-right: 40rpx;
				}
			}
		}

		.popup {
			::v-deep .u-popup__content {
				width: 90%;
				padding-bottom: 10rpx;
			}
		}
	}
</style>
