<template>
	<view class="warp">
		<mescroll-uni :fixed="false" ref="mescrollRef" :down="downOption" :up="upOption" class="content">
			<view class="title">基础信息</view>
			<view class="form">
				<u--form labelPosition="left" ref="form" labelAlign="right" labelWidth="auto" v-model="form">
					<u-form-item label="出入门" borderBottom>
						<span style="color:#D9001B;padding-right: 20rpx">*</span>
						<u--input v-model="form.accessDoor" inputAlign="right" placeholder="请输入出入门" border="none">
						</u--input>
					</u-form-item>
					<u-form-item label="申请人" borderBottom @click="show = true">
						<span class="required">*</span>
						<u--input v-model="form.applicant" inputAlign="right" placeholder="请选择申请人" disabled
							disabledColor="#ffffff" border="none"></u--input>
						<u-icon slot="right" name="arrow-right"></u-icon>
					</u-form-item>
					<u-form-item label="申请工号" borderBottom>
						<span class="required">*</span>
						<u--input v-model="form.applicantCode" inputAlign="right" placeholder="" disabled border="none">
						</u--input>
					</u-form-item>
					<u-form-item label="所属部门" borderBottom>
						<span class="required">*</span>
						<u--input v-model="form.deptName" inputAlign="right" placeholder="" disabled border="none">
						</u--input>
					</u-form-item>
				</u--form>
			</view>
			<!-- 流程 -->
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
							<text>{{form.approverOneName && form.approverOneName.substring(0, 1)}}</text>
						</view>
						<view class="info">
							<u-button type="warning" shape="circle" size="small" text="一级审批人选择"
								@click="popupFind(0,0,1,form.approverOneName)">
							</u-button>
							<view class="name">{{form.approverOneName}}</view>
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
							<text>{{form.approverTwoName && form.approverTwoName.substring(0, 1)}}</text>
						</view>
						<view class="info">
							<u-button type="warning" shape="circle" size="small" text="二级审批人选择"
								@click="popupFind(0,0,2,form.approverTwoName)">
							</u-button>
							<view class="name">{{form.approverTwoName}}</view>
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
							<text>{{form.approverThreeName && form.approverThreeName.substring(0, 1)}}</text>
						</view>
						<view class="info">
							<u-button type="warning" shape="circle" size="small" text="三级审批人选择"
								@click="popupFind(130,130,3,form.approverThreeName)">
							</u-button>
							<view class="name">{{form.approverThreeName}}</view>
						</view>
					</view>
				</view>
			</view>
			<!-- 申请人下来 -->
			<u-picker :show="show" :columns="columns" closeOnClickOverlay @cancel="show = false" @confirm="confirm"
				@close="show = false" keyName="userRealname"></u-picker>
			<!-- 审批人选择 -->
			<approval-Popup ref="approvalPopup" v-on:approverInfo="approverInfo"></approval-Popup>
		</mescroll-uni>
		<view class="footer">
			<view class="button">
				<u-button type="primary" class="primary" shape="circle" text="生成" @click="agree()">
				</u-button>
				<u-button type="primary" :plain="true" shape="circle" text="取消" @click="$Router.back(1)">
				</u-button>
			</view>
		</view>
		<u-toast ref="uToast" />
	</view>
</template>

<script>
	import MescrollMixin from "@/uni_modules/mescroll-uni/components/mescroll-uni/mescroll-mixins.js";
	import approvalPopup from "./components/approvalPopup.vue"
	import {
		getAllNodeByDefkey,
		startProcess
	} from "@/api/visitor/bpm.js"
	import {
		save,
		userPage,
		getApprove
	} from "@/api/visitor/apply.js"

	export default {
		mixins: [MescrollMixin],
		components: {
			approvalPopup
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
				form: {
					accessDoor: "一号门",
					approverOneName: null,
					approverOneId: null,
					approverTwoId: null,
					approverTwoName: null,
					approverThreeId: null,
					approverThreeName: null,
					approverThreeId: null,
					createBy:this.$store.getters.userId,
					applicant:this.$store.getters.userName,
					projectId:this.$store.getters.projectId,
					createdName: this.$store.getters.userName,
				},
				show: false,
				columns: [],
				//bpm流程人
				bpm: {},
				bpmNodes: null
			}
		},
		onLoad() {
			this.userPage()
			this.getAllNodeByDefkey()
		},
		methods: {
			//获取历史审批人
			getApprove() {
				getApprove({
					createBy: this.$store.getters.userId
				}).then(res => {
					let data = res.data.data
					let empno = res.data.data.approverOneId
					let e = {}
					this.columns[0].map(item => {
						if (item.empno == empno) {
							e.value = [item]
						}
					})
					this.confirm(e)
					this.form.approverOneName = data.approverOneName
					this.form.approverOneId = data.approverOneId
					this.form.approverTwoName = data.approverTwoName
					this.form.approverTwoId = data.approverTwoId
					this.form.approverThreeName = data.approverThreeName
					this.form.approverThreeId = data.approverThreeId
					this.bpm[(this.bpmNodes[1].nodeId)] = [data.approverOneId]
					this.bpm[(this.bpmNodes[2].nodeId)] = [data.approverTwoId]
					this.bpm[(this.bpmNodes[3].nodeId)] = [data.approverThreeId]
				})
			},
			//验证不通过
			errorToast(msg) {
				this.$refs.uToast.show({
					type: 'error',
					message: msg,
				})
			},
			// 提交
			save() {
				save(this.form).then(res => {
					this.$Router.push({
						path: "/pages/visitor/apply/qrCode",
						query: {
							url: res.data.data[0],
							src: res.data.data[1]
						}
					})
				})
			},
			//生成
			agree() {
					
				if(!this.form.accessDoor){
					this.$refs.uToast.show({
						type: 'error',
						message: "请输入出入门",
					})
					return
				}
				if (!this.form.applicant) {
					this.$refs.uToast.show({
						type: 'error',
						message: "请选择申请人",
					})
					return
				}
				if (!this.form.approverOneName) {
					this.errorToast("请选择一级审批人")
					return
				} else if (!this.form.approverTwoName) {
					this.errorToast("请选择二级审批人")
					return
				} else if (!this.form.approverThreeName) {
					this.errorToast("请选择三级审批人")
					return
				}
				this.startProcess()
			},
			//获取申请人
			userPage() {
				userPage().then(res => {
					this.columns = [res.data.records]
					this.getApprove()
				})
			},
			//选择申请人
			confirm(e) {
				this.show = false
				this.form.applicant = e.value[0].userRealname
				this.form.applicantCode = e.value[0].empno
				this.form.deptName = e.value[0].deptName
				this.form.deptId = e.value[0].deptId
				this.form.userId = e.value[0].userId
			},

			//bpm流程启动
			getAllNodeByDefkey() {
				getAllNodeByDefkey({
					defKey: this.$store.getters.defKey,
					searchUser: true
				}).then(res => {
					this.bpmNodes = res.data.nodes
					this.bpm[res.data.nodes[0].nodeId] = [this.$store.getters.empno]
				})
			},
			//bpm 启动				
			startProcess() {
				startProcess({
					defKey: this.$store.getters.defKey,
					empNo: this.$store.getters.empno,
					empName: this.$store.getters.userName,
					nodeUsers: JSON.stringify(this.bpm)
				}).then(res => {
					if (res.data.STATUS === "ERROR") {
						this.errorToast("审批流程启动失败")
					} else {
						this.form.procId = res.data.PROCID
						this.save()
					}
				})
			},
			popupFind(deptId, projectDeptIds, level, name) {
				this.$refs.approvalPopup.show = true
				this.$refs.approvalPopup.level = level
				this.$refs.approvalPopup.approverName = name
				this.$refs.approvalPopup.findUser(deptId, projectDeptIds)
			},
			approverInfo(value) {
				if (value.level == 1) {
					this.form.approverOneName = value.userRealname
					this.form.approverOneId = value.empno
					this.form.onedept = value.deptName
					console.log(this.bpmNodes[value.level].nodeId)
					this.bpm[(this.bpmNodes[value.level].nodeId)] = [value.empno]
				} else if (value.level == 2) {
					this.form.approverTwoName = value.userRealname
					this.form.approverTwoId = value.empno
					this.form.twodept = value.deptName
					this.bpm[(this.bpmNodes[value.level].nodeId)] = [value.empno]
				} else if (value.level == 3) {
					this.form.approverThreeName = value.userRealname
					this.form.approverThreeId = value.empno
					this.form.threedept = value.deptName
					this.bpm[(this.bpmNodes[value.level].nodeId)] = [value.empno]
				}
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

			.form {
				background-color: #ffffff;
				padding: 0 20rpx;

				.required {
					color: #D9001B;
					padding-right: 20rpx
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
	}
</style>
