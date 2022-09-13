<template>
	<view class="warp">
		<mescroll-uni :fixed="false" ref="mescrollRef" :down="downOption" :up="upOption" class="content">
			<view class="title">基础信息</view>
			<view class="form">
				<u--form labelPosition="left" ref="form" labelAlign="right" labelWidth="auto" v-model="form">
					<u-form-item label="标题" borderBottom>
						<span class="required">*</span>
						<u--input placeholder="请输入标题" :disabled="disabled" inputAlign="right" v-model="form.tittle"
							border="none"></u--input>
					</u-form-item>
					<u-form-item label="申请人" borderBottom>
						<span class="required">*</span>
						<u--input v-model="form.applicant" inputAlign="right" placeholder="" disabled border="none">
						</u--input>
					</u-form-item>
					<u-form-item label="申请工号" borderBottom>
						<span class="required">*</span>
						<u--input v-model="form.applicantCode" inputAlign="right" placeholder="" disabled border="none">
						</u--input>
					</u-form-item>
					<u-form-item label="申请日期" borderBottom>
						<span class="required">*</span>
						<u--input v-model="form.applyTime" inputAlign="right" disabled border="none"></u--input>
					</u-form-item>
					<u-form-item label="来访时间" borderBottom @click="disabled ? null : visitShow = true">
						<span class="required">*</span>
						<u--input v-model="form.visitTime" inputAlign="right" disabled
							:disabledColor="disabled ?' #f5f7fa' : '#ffffff'" border="none"></u--input>
						<u-icon slot="right" name="arrow-right"></u-icon>
					</u-form-item>
					<u-form-item label="离开时间" borderBottom @click="disabled ? null : leaveShow = true">
						<span class="required">*</span>
						<u--input v-model="form.leaveTime" inputAlign="right" disabled
							:disabledColor="disabled ?' #f5f7fa' : '#ffffff'" border="none"></u--input>
						<u-icon slot="right" name="arrow-right"></u-icon>
					</u-form-item>
					<u-form-item label="来访事由" borderBottom>
						<span class="required">*</span>
						<u--textarea v-model="form.visitReason" :disabled="disabled" confirmType="done" autoHeight
							style="padding:4rpx;" placeholder="请填写来访事由" border="none">
						</u--textarea>
					</u-form-item>
				</u--form>
			</view>
			<view class="title">来访人员</view>
			<view class="tags" style="padding-right: 100rpx;">
				<view v-for=" (item,index) of peopleList" :key="index">
					<u-tag :text="`来访人${index + 1}`" class="tag" shape="circle" :closable="index !== 0 && !disabled"
						:style="{paddingRight: index == 0 ? '20rpx' : 0}" :plain="!item.checked"
						@click="peopleClick(item.checked,index)" @close="closePeopleTag(index)">
					</u-tag>
				</view>
				<view class="add" v-if="!disabled">
					<u-tag icon="plus" class="tag" plain @click="peoplePush"></u-tag>
				</view>
			</view>
			<view class="form">
				<u--form labelPosition="left" ref="form" labelAlign="left" labelWidth="auto"
					v-model="visitPeopleList[peopleCurrent]">
					<u-form-item label="访客姓名" borderBottom>
						<span class="required">*</span>
						<u--input v-model="visitPeopleList[peopleCurrent]['visitorName']" inputAlign="right"
							:disabled="disabled" placeholder="请输入访客姓名" border="none"></u--input>
					</u-form-item>
					<u-form-item label="性别" borderBottom @click="disabled ? null : sexShow = true">
						<span class="required">*</span>
						<u--input v-model="visitPeopleList[peopleCurrent]['sexName']" inputAlign="right"
							placeholder="请选择性别" border="none" disabled
							:disabledColor="disabled ?' #f5f7fa' :  '#ffffff'"></u--input>
						<u-icon slot="right" name="arrow-right"></u-icon>
					</u-form-item>
					<u-form-item label="身份证号" borderBottom>
						<span class="required">*</span>
						<u--input v-model="visitPeopleList[peopleCurrent]['idCard']" inputAlign="right"
							:disabled="disabled" placeholder="请输入身份证号" border="none">
						</u--input>
					</u-form-item>
					<u-form-item label="访客电话" borderBottom>
						<span class="required">*</span>
						<u--input v-model="visitPeopleList[peopleCurrent]['visitorPhone']" inputAlign="right"
							:disabled="disabled" placeholder="填输入访客电话" border="none"></u--input>
					</u-form-item>
					<u-form-item label="访客单位" borderBottom>
						<span class="required">*</span>
						<u--input v-model="visitPeopleList[peopleCurrent]['visitorCompany']" inputAlign="right"
							:disabled="disabled" placeholder="填输入访客单位" border="none"></u--input>
					</u-form-item>
					<u-form-item label="访客照片">
						<span class="required">*</span>
					</u-form-item>
					<u-upload :fileList="visitPeopleList[peopleCurrent].visitorPicFile" :deletable="!disabled"
						@afterRead="(e)=>afterRead(e,'visitorPicFile','visitorPic')"
						@delete="(e)=>deletePic(e,'visitorPicFile','visitorPic')" :maxCount="1">
					</u-upload>
					<view class="line"></view>
					<u-form-item label="行程码">
						<span class="required">*</span>
					</u-form-item>
					<u-upload :fileList="visitPeopleList[peopleCurrent].tourCodeFile" :deletable="!disabled"
						@afterRead="(e)=>afterRead(e,'tourCodeFile','tourCode')"
						@delete="(e)=>deletePic(e,'tourCodeFile','tourCode')" :maxCount="1">
					</u-upload>
					<view class="line"></view>
					<u-form-item label="安全码">
						<span class="required">*</span>
					</u-form-item>
					<u-upload :fileList="visitPeopleList[peopleCurrent].safeCodeFile" :deletable="!disabled"
						@afterRead="(e)=>afterRead(e,'safeCodeFile','safeCode')"
						@delete="(e)=>deletePic(e,'safeCodeFile','safeCode')" :maxCount="1">
					</u-upload>
					<view class="line"></view>
					<u-form-item label="核酸码">
						<span class="required">*</span>
					</u-form-item>
					<u-upload :fileList="visitPeopleList[peopleCurrent].nucCodeFile" :deletable="!disabled"
						@afterRead="(e)=>afterRead(e,'nucCodeFile','nucCode')"
						@delete="(e)=>deletePic(e,'nucCodeFile','nucCode')" :maxCount="1">
					</u-upload>
					<view class="line"></view>
				</u--form>
			</view>
			<view class="title">来访车辆</view>
			<view class="tags">
				<view v-for=" (item,index) of carList" :key="index">
					<u-tag :text="`来访车辆${index + 1}`" class="tag" shape="circle" :closable="!disabled"
						:style="{paddingRight: index == 0 ? '20rpx' : 0}" :plain="!item.checked"
						@click="carChecked(item.checked,index)" @close="closeCarTag(index)">
					</u-tag>
				</view>
				<view class="add" v-if="!disabled">
					<u-tag icon="plus" class="tagAdd" plain @click="pushCar"></u-tag>
				</view>
			</view>
			<view class="form" v-if="visitCarsList.length > 0">
				<u--form labelPosition="left" ref="form" labelAlign="right" labelWidth="auto"
					v-model="visitCarsList[carCurrent]">
					<u-form-item label="车牌号" borderBottom @click="disabled ? null :  carInputClick()">
						<u--input v-model="visitCarsList[carCurrent].carNum" inputAlign="right" placeholder="请输入车牌号"
							disabled :disabledColor="disabled ? '#f5f7fa' : '#ffffff'" border="none">
						</u--input>
					</u-form-item>
					<u-form-item label="车辆颜色" borderBottom>
						<u--input v-model="visitCarsList[carCurrent].carColor" inputAlign="right" placeholder="请输入车辆颜色"
							:disabled="disabled" border="none">
						</u--input>
					</u-form-item>
					<u-form-item label="排放量" borderBottom @click="disabled ? null : emissionsShow = true">
						<u--input v-model="visitCarsList[carCurrent].emissions" inputAlign="right" placeholder="请输入排放量"
							border="none" disabled :disabledColor="disabled ?' #f5f7fa' :  '#ffffff'"></u--input>
						<u-icon slot="right" name="arrow-right"></u-icon>
					</u-form-item>
				</u--form>
			</view>
			<!-- 来访时间 -->
			<u-datetime-picker :show="visitShow" closeOnClickOverlay @confirm="(e)=>confirmTime(e,'visit')"
				@cancel="visitShow = false" @close="visitShow = false" v-model="visitTime" mode="datetime"
				:minDate="+moment()">
			</u-datetime-picker>
			<!-- 离开时间 -->
			<u-datetime-picker :show="leaveShow" closeOnClickOverlay @confirm="(e)=>confirmTime(e,'leave')"
				@cancel="leaveShow = false" @close="leaveShow = false" v-model="visitTime" mode="datetime"
				:minDate="+moment()">
			</u-datetime-picker>
			<!-- 性别 -->
			<u-picker :show="sexShow" :columns="sex" closeOnClickOverlay @cancel="sexShow = false" @confirm="confirmSex"
				@close="sexShow=false" keyName="label"></u-picker>
			<!-- 排放量 -->
			<u-picker :show="emissionsShow" :columns="emissions" closeOnClickOverlay @cancel="emissionsShow = false"
				@confirm="confirmEmissions" @close="emissionsShow=false"></u-picker>
		</mescroll-uni>
		<view class="footer">
			<view class="button" v-if="code === 1">
				<u-button type="primary" class="primary" shape="circle" text="确认" @click="submit()">
				</u-button>
			</view>
			<view class="button" v-if="code === 0 &&  +this.form.status === 3">
				<u-button type="primary" class="primary" shape="circle" text="修改" @click="submit()">
				</u-button>
			</view>
		</view>
		<plate-number ref="plate" v-model="visitCarsList.length > 0 && visitCarsList[carCurrent].carNum"></plate-number>
		<u-toast ref="uToast" />
	</view>
</template>

<script>
	import MescrollMixin from "@/uni_modules/mescroll-uni/components/mescroll-uni/mescroll-mixins.js";
	import plateNumber from '@/components/plate-number/plateNumber.vue';
	import {
		Base64
	} from 'js-base64';

	import {
		saveInvite,
		getByVisitCode,
		update
	} from "@/api/visitor/apply.js"
	import {
		upLoadImg
	} from "@/api/common.js"
	export default {
		mixins: [MescrollMixin],
		components: {
			plateNumber
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
					applyTime: this.moment().format("YYYY-MM-DD HH:MM:SS"),
					visitTime: this.moment().format("YYYY-MM-DD HH:MM:SS"),
					leaveTime: this.moment().add(8, 'hours').format("YYYY-MM-DD HH:MM:SS"),
					appType: "预约",
					projectId: this.$store.getters.projectId,
					tittle: null,
					applicant: null,
					applicantCode: null,
					userId: null,
					procId: null,
					visitCode: null,
					deptId: null,
					createBy: this.$store.getters.userId,
					createdName: this.$store.getters.uesrName
				},
				show: false,
				visitShow: false,
				leaveShow: false,
				visitTime: this.moment().format("YYYY-MM-DD HH:MM:SS"),
				leaveTime: this.moment().add(8, 'hours').format("YYYY-MM-DD HH:MM:SS"),
				close1: true,
				// 人员初始值
				peopleList: [{
					checked: true,
					id: 0
				}],
				// 人员显示
				peopleCurrent: 0,
				// 车辆显示
				carCurrent: 0,
				//车辆初始值:
				carList: [],
				//来访人员信息集合
				visitPeopleList: [{
					visitorName: null,
					sex: null,
					idCard: null,
					visitorPhone: null,
					visitorCompany: null,
					nature: null,
					visitorPic: null,
					visitorPicFile: [],
					tourCode: null,
					tourCodeFile: [],
					safeCode: null,
					safeCodeFile: [],
					nucCode: null,
					nucCodeFile: []
				}],
				//来访车辆集合
				visitCarsList: [],
				//申请人
				columns: [],
				//性别
				sexShow: false,
				sex: [
					[{
						label: "男",
						id: 0
					}, {
						label: "女",
						id: 1
					}]
				],
				// loading
				loading: false,
				popupShow: false,
				//bpm流程人
				bpm: {},
				bpmNodes: null,
				code: null,
				disabled: false,
				//排放量
				emissionsShow: false,
				emissions: [
					['国0', '国Ⅰ', '国Ⅱ', '国Ⅲ', '国Ⅳ', '国Ⅵ', '电动']
				],
			}
		},
		onReady() {
			this.form.accessDoor = Base64.decode(this.$Route.query.accessDoor.replace(/\s/g, '+'))
			this.form.applicant = Base64.decode(this.$Route.query.applicant)
			this.form.applicantCode = Base64.decode(this.$Route.query.empNo)
			this.form.userId = Base64.decode(this.$Route.query.userId)
			this.form.procId = Base64.decode(this.$Route.query.procId)
			this.form.visitCode = Base64.decode(this.$Route.query.visitCode)
			this.form.deptId = Base64.decode(this.$Route.query.deptId)
			this.form.deptName = Base64.decode(this.$Route.query.deptName)
			this.form.empNo = Base64.decode(this.$Route.query.empNo)
			this.form.createBy = Base64.decode(this.$Route.query.createBy)
			this.form.createdName = Base64.decode(this.$Route.query.createdName)
			this.form.approverOneId = Base64.decode(this.$Route.query.approverOneId)
			this.form.approverOneName = Base64.decode(this.$Route.query.approverOneName)
			this.form.approverThreeId = Base64.decode(this.$Route.query.approverThreeId)
			this.form.approverThreeName = Base64.decode(this.$Route.query.approverThreeName)
			this.form.approverTwoId = Base64.decode(this.$Route.query.approverTwoId)
			this.form.approverTwoName = Base64.decode(this.$Route.query.approverTwoName)

			this.getByVisitCode()
		},
		methods: {
			//获取详情信息
			getByVisitCode() {
				getByVisitCode({
					visitCode: this.form.visitCode
				}).then(res => {
					this.code = res.data.code

					if (!this.code) {
						res.data.data.visitPeopleList.map((item, index) => {
							item.visitorPicFile = [{
								url: item.visitorPic,
								deletable: false
							}]
							item.tourCodeFile = [{
								url: item.tourCode,
								deletable: false
							}]
							item.safeCodeFile = [{
								url: item.safeCode,
								deletable: false
							}]
							item.nucCodeFile = [{
								url: item.nucCode,
								deletable: false
							}]
							item["sexName"] = item.sexName ? "女" : "男"
							index && this.peopleList.push({
								checked: false
							})
						})
						this.visitPeopleList = res.data.data.visitPeopleList
						this.visitCarsList = res.data.data.visitCarsList
						this.visitCarsList.map((item, index) => {
							this.carList.push({
								checked: !index ? true : false
							})
						})

						this.form = res.data.data;

						if (+this.form.status !== 3) {
							this.disabled = true
						}
					}
				})
			},
			//选择性别
			confirmSex(e) {
				this.visitPeopleList[this.peopleCurrent].sex = e.value[0].id
				this.visitPeopleList[this.peopleCurrent].sexName = e.value[0].label
				this.sexShow = false
			},
			//时间选择
			confirmTime(e, index) {
				if (index === 'visit') {
					this.visitTime = this.moment(e.value).format("YYYY-MM-DD HH:MM:SS")
					this.form.visitTime = this.visitTime
					this.visitShow = false
				} else if (index == 'leave') {
					this.leaveTime = this.moment(e.value).format("YYYY-MM-DD HH:MM:SS")
					this.form.leaveTime = this.leaveTime
					this.leaveShow = false
				}
			},
			// 添加tag标签
			peoplePush() {
				this.peopleList.push({
					checked: false,
				})
				this.visitPeopleList.push({
					visitorName: null,
					sex: null,
					idCard: null,
					visitorPhone: null,
					visitorCompany: null,
					nature: null,
					visitorPic: null,
					visitorPicFile: [],
					tourCode: null,
					tourCodeFile: [],
					safeCode: null,
					safeCodeFile: [],
					nucCode: null,
					nucCodeFile: []
				})
			},
			// 关闭人员标签
			closePeopleTag(index) {
				if (this.peopleList[index].checked) {
					this.peopleList[0].checked = true
				}
				this.peopleList.splice(index, 1)
				this.visitPeopleList.splice(index, 1)
				this.peopleCurrent = 0
			},
			// 点击人员标签
			peopleClick(checked, idx) {
				this.peopleCurrent = idx
				this.peopleList.map((item, index) => {
					if (index === idx) {
						item.checked = true
					} else {
						item.checked = false
					}
				})
			},
			//点击车辆tag切换
			carChecked(checked, idx) {
				this.carCurrent = idx
				this.carList.map((item, index) => {
					if (index === idx) {
						item.checked = true
					} else {
						item.checked = false
					}
				})
			},
			// 关闭车辆标签
			closeCarTag(index) {
				let checked = this.carList[index].checked
				this.carList.splice(index, 1)
				this.visitCarsList.splice(index, 1)
				if (checked) {
					this.carList.length > 0 && (this.carList[0].checked = true)
				}
				this.carCurrent = 0
			},
			//新增车辆
			pushCar() {
				if (this.carList.length == 0) {
					this.carList.push({
						checked: true
					})
				} else {
					this.carList.push({
						checked: false
					})
				}
				this.visitCarsList.push({
					carNum: null,
					carColor: null,
					emissions: null
				})
			},

			//上传图片
			afterRead(e, name1, name2) {
				this.visitPeopleList[this.peopleCurrent][name1] = [{
					...e.file,
					deletable: false
				}]
				upLoadImg(e.file.url).then(res => {
					this.visitPeopleList[this.peopleCurrent][name2] = res.data.data[0].attUrl
				}).catch(err => {
					this.visitPeopleList[this.peopleCurrent][name1] = []
					this.visitPeopleList[this.peopleCurrent][name2] = null
				})
			},
			//删除图片
			deletePic(e, name1, name2) {
				this.visitPeopleList[this.peopleCurrent][name1] = []
				this.visitPeopleList[this.peopleCurrent][name2] = null
			},
			//验证不通过
			errorToast(msg) {
				this.$refs.uToast.show({
					type: 'error',
					message: msg,
				})
			},
			//提交审核
			saveInvite() {
				saveInvite({
					...this.form,
					visitPeopleList: this.visitPeopleList,
					visitCarsList: this.visitCarsList
				}).then(res => {
					this.code = 0
					this.disabled = true
					this.$refs.uToast.show({
						type: 'success',
						message: res.data.data
					})
				})
			},
			// 排放量确认选择
			confirmEmissions(e) {
				this.visitCarsList[this.carCurrent].emissions = e.value[0]
				this.emissionsShow = false
			},
			//修改
			update() {
				update({
					...this.form,
					visitPeopleList: this.visitPeopleList,
					visitCarsList: this.visitCarsList
				}).then(res => {
					this.code = 10
					this.disabled = true
					if (!res.data.data) {
						this.$refs.uToast.show({
							type: 'error',
							message: "修改失败"
						})
					} else {
						this.$refs.uToast.show({
							type: 'success',
							message: "修改成功"
						})
					}
				})
			},
			// 表单提交
			submit() {
				// 基础信息
				if (!this.form.tittle) {
					this.errorToast("请输入标题")
					return
				} else if (!this.form.visitReason) {
					this.errorToast("请填写来访事由")
					return
				}
				// 来访人员
				let phoneReg = /^[1][3,4,5,7,8,9][0-9]{9}$/;
				let idCardReg =
					/(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$)/;
				let nameList = this.visitCarsList.map(item => {
					return item.visitorName
				})
				let idCardList = this.visitCarsList.map(item => {
					return item.idCard
				})
				let phoneList = this.visitCarsList.map(item => {
					return item.visitorPhone
				})

				for (let item of this.visitPeopleList) {
					if (!item.visitorName) {
						this.errorToast("请输入访客姓名")
						return
					} else if (this.visitPeopleList.length > 1 && nameList.indexOf(item.visitorName)) {
						this.errorToast("访客姓名不可重复")
						return
					} else if (this.visitPeopleList.length > 1 && idCardList.indexOf(item.idCard)) {
						this.errorToast("访客电话不可重复")
						return
					} else if (this.visitPeopleList.length > 1 && phoneList.indexOf(item.visitorPhone)) {
						this.errorToast("访客姓名不可重复")
						return
					} else if (!item.sexName) {
						this.errorToast("请选择性别")
						return
					} else if (!item.idCard) {
						this.errorToast("请输入身份证号")
						return
					} else if (!idCardReg.test(item.idCard)) {
						this.errorToast("身份证格式不正确")
						return
					} else if (!item.visitorPhone) {
						this.errorToast("请输入访客电话")
						return
					} else if (!phoneReg.test(item.visitorPhone)) {
						this.errorToast("访客电话格式不正确")
						return
					} else if (!item.visitorCompany) {
						this.errorToast("填输入访客单位")
						return
					} else if (!item.visitorPic) {
						this.errorToast("请上传访客照片")
						return
					} else if (!item.tourCode) {
						this.errorToast("请上传行程码")
						return
					} else if (!item.safeCode) {
						this.errorToast("请上传安全码")
						return
					} else if (!item.nucCode) {
						this.errorToast("请上传核酸码")
						return
					}
				}
				// 来访车辆
				for (let item of this.visitCarsList) {
					let reg = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领][A-HJ-NP-Z][A-HJ-NP-Z0-9]{4,5}[A-HJ-NP-Z0-9挂学警港澳]$/
					if (!item.carNum) {
						this.errorToast("请输入车牌号")
						return
					} else if (!reg.test(item.carNum)) {
						this.errorToast("车牌号格式错误")
						return
					}
				}

				if (+this.form.status == 3) {
					this.update()
				} else {
					this.saveInvite()
				}
			},
			carInputClick() {
				this.$refs.plate.show();
				let plateNumber = this.visitCarsList[+this.carCurrent]['carNum'] ? this.visitCarsList[+this.carCurrent][
					'carNum'
				] : ''
				this.$refs.plate.plateNumber = plateNumber;
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

			.form {
				background-color: #ffffff;
				padding: 0 33rpx;

				.required {
					color: #D9001B;
					padding-right: 20rpx
				}

				.u-form {
					::v-deep .u-form-item:last-child {
						.u-form-item__body {
							align-items: flex-start;
						}

						.u-form-item__body__right__content__slot {
							align-items: flex-start;

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
			padding-right: 50rpx;
			margin-bottom: 4rpx;

			.tag {
				margin-left: 10rpx;

			}

			.add {
				margin-left: 10rpx;
				padding-bottom: 6rpx;

				::v-deep .u-tag {
					width: 45rpx;
					height: 45rpx;
					line-height: 26rpx;
					border-radius: 50%;
					padding: 0;
					margin: 0;

					.u-tag__icon {
						margin: 0 auto;
					}
				}
			}
		}

		.footer {
			background-color: #ffffff;
			border-top: 1px solid #d7d7d7;

			.button {
				display: flex;
				flex-direction: row;
				padding: 0 80rpx;
				margin: 10rpx;

				.primary {}
			}
		}

		.line {
			width: 100%;
			border-bottom: 1rpx solid rgb(214, 215, 217);
			transform: scaleY(0.5);
		}

		::v-deep .u-upload__wrap {
			padding: 4rpx;
		}
	}
</style>
