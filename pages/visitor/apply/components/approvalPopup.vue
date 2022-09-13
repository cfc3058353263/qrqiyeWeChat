<template>
	<u-popup :show="show" @close="show = false">
		<view class="popup">
			<view class="u-page__tag-item">
				<u-search v-model="userRealname" @custom="findUser(deptId,projectDeptIds)"></u-search>
			</view>
			<mescroll-uni :fixed="false" ref="mescrollRef" :down="downOption" :up="upOption" class="popupContent">
				<view class="u-page__radio-item">
					<u-radio-group v-model="approverName" :borderBottom="true" placement="column" iconPlacement="right">
						<u-radio :customStyle="{marginBottom: '16px'}" v-for="(item, index) in userList" :key="index"
							:label="item.deptName + ' / ' + item.userRealname " :name="item.userRealname"
							@change="(name)=>{change(name,item)}">
						</u-radio>
					</u-radio-group>
				</view>
			</mescroll-uni>
			<view class="button">
				<u-button type="primary" class="primary" shape="circle" text="确认" @click="confirm"></u-button>
				<u-button type="error" :plain="true" shape="circle" text="取消" @click="show = false"></u-button>
			</view>
		</view>
	</u-popup>
</template>

<script>
	import MescrollMixin from "@/uni_modules/mescroll-uni/components/mescroll-uni/mescroll-mixins.js";
	import {
		findUser,
		userListByDeptIds
	} from "@/api/visitor/apply.js"
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
				userList: [],
				userRealname: '',
				show: false,
				approverName: "",
				approverInfo: null,
				level: null,
				deptId: null,
				projectDeptIds: null
			}
		},
		created() {

		},
		mounted() {},
		methods: {
			findUser(deptId, projectDeptIds) {
				this.deptId = deptId
				this.projectDeptIds = projectDeptIds
				if (deptId == 0) {
					findUser({
						deptId: deptId,
						projectId: this.$store.getters.projectId,
						projectDeptIds: projectDeptIds,
						userRealname: this.userRealname
					}).then(res => {
						res.data.data.map((item, index) => {
							item["disabled"] = false
						})
						this.userList = res.data.data
					})
				}else{
					userListByDeptIds({deptIds:deptId}).then(res=>{
						res.data.map((item, index) => {
							item["disabled"] = false
						})
						this.userList = res.data
					})
				}
			},
			change(name, item) {
				this.approverInfo = item
			},
			//
			confirm() {
				this.$emit('approverInfo', {
					...this.approverInfo,
					level: this.level
				});
				this.show = false
			}
		}
	}
</script>

<style scoped lang="scss">
	.popup {
		height: 900rpx;
		display: flex;
		flex-direction: column;
		padding: 20rpx;

		.popupContent {
			flex: 1;
			min-width: 0;
			min-height: 0;
			padding: 20rpx;
		}

		.button {
			display: flex;
			flex-direction: row;
			padding-top: 20rpx;

			.primary {
				margin-right: 40rpx;
			}
		}
	}
</style>
