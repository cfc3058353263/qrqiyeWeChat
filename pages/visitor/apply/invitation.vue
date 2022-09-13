<template>
	<view class="warp">
		<mescroll-uni :fixed="false" ref="mescrollRef" :down="downOption" :up="upOption" class="content">
			<view class="title">基础信息</view>
			<view class="form">
				<u--form labelPosition="left" ref="form" labelAlign="right" labelWidth="auto" v-model="form">
					<u-form-item label="标题" borderBottom>
						<span class="required">*</span>
						<u--input placeholder="请输入标题" inputAlign="right" v-model="form.tittle" border="none"></u--input>
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
					<u-form-item label="流程启动人" borderBottom>
						<span class="required">*</span>
						<u--input v-model="form.processStarter" inputAlign="right" placeholder="" disabled
							border="none"></u--input>
					</u-form-item>
					<u-form-item label="申请日期" borderBottom>
						<span class="required">*</span>
						<u--input v-model="form.applyTime" inputAlign="right" disabled border="none"></u--input>
					</u-form-item>
					<u-form-item label="联系电话" borderBottom>
						<span class="required">*</span>
						<u--input v-model="form.phone" inputAlign="right" placeholder="请输入手机号" border="none">
						</u--input>
					</u-form-item>
					<u-form-item label="来访时间" borderBottom @click="visitShow = true">
						<span class="required">*</span>
						<u--input v-model="form.visitTime" inputAlign="right" disabled disabledColor="#ffffff"
							border="none"></u--input>
						<u-icon slot="right" name="arrow-right"></u-icon>
					</u-form-item>
					<u-form-item label="离开时间" borderBottom @click="leaveShow = true">
						<span class="required">*</span>
						<u--input v-model="form.leaveTime" inputAlign="right" disabled disabledColor="#ffffff"
							border="none"></u--input>
						<u-icon slot="right" name="arrow-right"></u-icon>
					</u-form-item>
					<u-form-item label="出入门权限" borderBottom>
						<span class="required" style="margin-left: 12.75rpx;"></span>
						<u--input v-model="form.accessDoor" inputAlign="right" border="none"></u--input>
					</u-form-item>
					<u-form-item label="来访事由" borderBottom>
						<span class="required">*</span>
						<u--textarea v-model="form.visitReason" confirmType="done" placeholder="请填写来访事由" border="none"
							autoHeight style="padding:4rpx;">
						</u--textarea>
					</u-form-item>
				</u--form>
			</view>
			<view class="title">来访人员</view>
			<view class="tags" style="padding-right: 100rpx;">
				<view v-for=" (item,index) of peopleList" :key="index">
					<u-tag :text="`来访人${index + 1}`" class="tag" shape="circle" :closable="index !== 0"
						:style="{paddingRight: index == 0 ? '20rpx' : 0}" :plain="!item.checked"
						@click="peopleClick(item.checked,index)" @close="closePeopleTag(index)">
					</u-tag>
				</view>
				<view class="add">
					<u-tag icon="plus" class="tag" plain @click="peoplePush"></u-tag>
				</view>
			</view>
			<view class="form">
				<u--form labelPosition="left" ref="form" labelAlign="left" labelWidth="auto"
					v-model="visitPeopleList[peopleCurrent]">
					<u-form-item label="访客姓名" borderBottom>
						<span class="required">*</span>
						<u--input v-model="visitPeopleList[peopleCurrent]['visitorName']" inputAlign="right"
							placeholder="请输入访客姓名" border="none"></u--input>
					</u-form-item>
					<u-form-item label="性别" borderBottom @click="sexShow = true">
						<span class="required">*</span>
						<u--input v-model="visitPeopleList[peopleCurrent]['sexName']" inputAlign="right"
							placeholder="请选择性别" border="none" disabled disabledColor="#ffffff"></u--input>
						<u-icon slot="right" name="arrow-right"></u-icon>
					</u-form-item>
					<u-form-item label="身份证号" borderBottom>
						<span class="required">*</span>
						<u--input v-model="visitPeopleList[peopleCurrent]['idCard']" inputAlign="right"
							placeholder="请输入身份证号" border="none">
						</u--input>
					</u-form-item>
					<u-form-item label="访客电话" borderBottom>
						<span class="required">*</span>
						<u--input v-model="visitPeopleList[peopleCurrent]['visitorPhone']" inputAlign="right"
							placeholder="填输入访客电话" border="none"></u--input>
					</u-form-item>
					<u-form-item label="访客单位" borderBottom>
						<span class="required">*</span>
						<u--input v-model="visitPeopleList[peopleCurrent]['visitorCompany']" inputAlign="right"
							placeholder="填输入访客单位" border="none"></u--input>
					</u-form-item>
					<u-form-item label="访客照片">
						<span class="required">*</span>
					</u-form-item>
					<u-upload :fileList="visitPeopleList[peopleCurrent].visitorPicFile"
						@afterRead="(e)=>afterRead(e,'visitorPicFile','visitorPic')"
						@delete="(e)=>deletePic(e,'visitorPicFile','visitorPic')" :maxCount="1">
					</u-upload>
					<view class="line"></view>
					<u-form-item label="行程码">
						<span class="required">*</span>
					</u-form-item>
					<u-upload :fileList="visitPeopleList[peopleCurrent].tourCodeFile"
						@afterRead="(e)=>afterRead(e,'tourCodeFile','tourCode')"
						@delete="(e)=>deletePic(e,'tourCodeFile','tourCode')" :maxCount="1">
					</u-upload>
					<view class="line"></view>
					<u-form-item label="安全码">
						<span class="required">*</span>
					</u-form-item>
					<u-upload :fileList="visitPeopleList[peopleCurrent].safeCodeFile"
						@afterRead="(e)=>afterRead(e,'safeCodeFile','safeCode')"
						@delete="(e)=>deletePic(e,'safeCodeFile','safeCode')" :maxCount="1">
					</u-upload>
					<view class="line"></view>
					<u-form-item label="核酸码">
						<span class="required">*</span>
					</u-form-item>
					<u-upload :fileList="visitPeopleList[peopleCurrent].nucCodeFile"
						@afterRead="(e)=>afterRead(e,'nucCodeFile','nucCode')"
						@delete="(e)=>deletePic(e,'nucCodeFile','nucCode')" :maxCount="1">
					</u-upload>
					<view class="line"></view>
				</u--form>
			</view>
			<view class="title">来访车辆</view>
			<view class="tags">
				<view v-for=" (item,index) of carList" :key="index">
					<u-tag :text="`来访车辆${index + 1}`" class="tag" shape="circle" closable :plain="!item.checked"
						@click="carChecked(item.checked,index)" @close="closeCarTag(index)">
					</u-tag>
				</view>
				<view class="add">
					<u-tag icon="plus" class="tagAdd" plain @click="pushCar"></u-tag>
				</view>
			</view>
			<view class="form" v-if="visitCarsList.length > 0">
				<u--form labelPosition="left" ref="form" labelAlign="right" labelWidth="auto"
					v-model="visitCarsList[carCurrent]">
					<u-form-item label="车牌号" borderBottom @click="carInputClick">
						<span class="required">*</span>
						<u--input v-model="visitCarsList[carCurrent].carNum" disabled disabledColor=" #ffffff"
							inputAlign="right" placeholder="请输入车牌号" border="none">
						</u--input>
					</u-form-item>
					<u-form-item label="车辆颜色" borderBottom>
						<u--input v-model="visitCarsList[carCurrent].carColor" inputAlign="right" placeholder="请输入车辆颜色"
							border="none">
						</u--input>
					</u-form-item>
					<u-form-item label="排放量" borderBottom @click="emissionsShow = true">
						<u--input v-model="visitCarsList[carCurrent].emissions" inputAlign="right" placeholder="请输入排放量"
							border="none" disabled disabledColor=" #ffffff">
						</u--input>
						<u-icon slot="right" name="arrow-right"></u-icon>
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
			<!-- 审批人选择 -->
			<approval-Popup ref="approvalPopup" v-on:approverInfo="approverInfo"></approval-Popup>
			<!-- 排放量 -->
			<u-picker :show="emissionsShow" :columns="emissions" closeOnClickOverlay @cancel="emissionsShow = false"
				@confirm="confirmEmissions" @close="emissionsShow=false"></u-picker>

		</mescroll-uni>
		<view class="footer">
			<view class="button">
				<u-button type="primary" class="primary" shape="circle" text="确认" @click="submit()">
				</u-button>
				<u-button type="primary" :plain="true" shape="circle" text="取消" @click="$Router.back(1)"></u-button>
			</view>
		</view>
		<plate-number ref="plate" v-model="visitCarsList.length > 0 && visitCarsList[carCurrent].carNum"></plate-number>
		<u-toast ref="uToast" />
	</view>
</template>

<script>
	import MescrollMixin from "@/uni_modules/mescroll-uni/components/mescroll-uni/mescroll-mixins.js";
	import plateNumber from '@/components/plate-number/plateNumber.vue';
	import approvalPopup from "./components/approvalPopup.vue"
	import {
		getAllNodeByDefkey,
		startProcess
	} from "../../../api/visitor/bpm.js"
	import {
		userPage,
		saveInvite,
		getApprove
	} from "@/api/visitor/apply.js"
	import {
		upLoadImg
	} from "@/api/common.js"
	export default {
		mixins: [MescrollMixin],
		components: {
			approvalPopup,
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
					appType: "邀约",
					projectId: this.$store.getters.projectId,
					approverOneName: "申请人",
					approverOneId: null,
					approverTwoId: null,
					approverTwoName: null,
					approverThreeId: null,
					approverThreeName: null,
					approverThreeId: null,
					onedept: "",
					twodept: "",
					threedept: "",
					accessDoor: "1号门"
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
				//排放量
				emissionsShow: false,
				emissions: [
					['国0', '国Ⅰ', '国Ⅱ', '国Ⅲ', '国Ⅳ', '国Ⅵ', '电动']
				],
				plateNum: '', //输入的车牌号
			}
		},
		onReady() {
			this.userPage()
			this.getAllNodeByDefkey()
			this.plateNum = '';
			this.$refs.plate.init();
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
						this.saveInvite()
					}
				})
			},
			//选择性别
			confirmSex(e) {
				this.visitPeopleList[this.peopleCurrent].sex = e.value[0].id
				this.visitPeopleList[this.peopleCurrent].sexName = e.value[0].label
				this.sexShow = false
			},
			//选择申请人
			confirm(e) {
				this.show = false
				this.form.applicant = e.value[0].userRealname
				this.form.applicantCode = e.value[0].empno
				this.form.deptName = e.value[0].deptName
				// this.form.phone = e.value[0].phone
				// 登录完成之后需要修改
				this.form.processStarter = this.$store.getters.userName
				this.form.approverOneName = e.value[0].userRealname
				this.form.approverOneId = e.value[0].empno
				this.bpm[(this.bpmNodes[1].nodeId)] = [e.value[0].empno]
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
			// 排放量确认选择
			confirmEmissions(e) {
				this.visitCarsList[this.carCurrent].emissions = e.value[0]
				this.emissionsShow = false
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
			//获取申请人
			userPage() {
				userPage().then(res => {
					this.columns = [res.data.records]
					this.getApprove()
				})
			},
			//上传图片
			afterRead(e, name1, name2) {
				this.visitPeopleList[this.peopleCurrent][name1] = [e.file]
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
					this.$refs.uToast.show({
						type: 'success',
						message: res.data.data
					})
					this.$Router.back(1)
					this.refreshT(true)
				})
			},
			// 表单提交
			submit() {
				// 来访人员
				let phoneReg = /^[1][3,4,5,7,8,9][0-9]{9}$/;
				// 基础信息
				if (!this.form.tittle) {
					this.errorToast("请输入标题")
					return
				} else if (!this.form.phone) {
					this.errorToast("请输入联系电话")
					return
				} else if (!phoneReg.test(this.form.phone)) {
					this.errorToast("联系电话格式不正确")
					return
				} else if (!this.form.applicant) {
					this.errorToast("请选择申请人")
					return
				} else if (!this.form.visitReason) {
					this.errorToast("请填写来访事由")
					return
				}

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
				//审批流程验证
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
			popupFind(deptId, projectDeptIds, level, name) {
				this.$refs.approvalPopup.show = true
				this.$refs.approvalPopup.level = level
				this.$refs.approvalPopup.approverName = name
				this.$refs.approvalPopup.userList = null
				this.$refs.approvalPopup.findUser(deptId, projectDeptIds)
			},
			approverInfo(value) {
				if (value.level == 1) {
					this.form.approverOneName = value.userRealname
					this.form.approverOneId = value.empno
					this.form.onedept = value.deptName
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
				padding: 0 20rpx;

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
			padding: 26rpx 50rpx 26rpx 34rpx;
			margin-bottom: 4rpx;

			.tag {
				margin-left: 10rpx;

			}

			.add {
				margin-left: 10rpx;
				padding-bottom: 4rpx;

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

				.primary {
					margin-right: 40rpx;
				}
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
