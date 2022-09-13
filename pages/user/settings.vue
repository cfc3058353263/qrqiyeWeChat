<template>
	<view class="warp">
		<mescroll-uni :fixed="false" top="4" ref="mescrollRef" :down="downOption" :up="upOption" class="content">
			<view class="form">
				<u--form labelPosition="left" ref="form" labelAlign="right" labelWidth="auto" v-model="form">
					<u-form-item label="头像" borderBottom>
						<span class="required">*</span>
						<u-upload :fileList="form.fileList" @afterRead="(e)=>afterRead(e)" @delete="(e)=>deletePic(e)"
							:maxCount="1">
						</u-upload>
					</u-form-item>
					<u-form-item label="姓名" borderBottom>
						<span class="required">*</span>
						<u--input placeholder="请输入姓名" inputAlign="right" v-model="form.userName" border="none">
						</u--input>
					</u-form-item>
					<u-form-item label="工号" borderBottom>
						<span class="required">*</span>
						<u--input placeholder="请输入工号" inputAlign="right" v-model="form.empno" border="none">
						</u--input>
					</u-form-item>
					<u-form-item label="性别" borderBottom>
						<span class="required">*</span>
						<u--input placeholder="请输入性别" inputAlign="right" v-model="form.sex" border="none">
						</u--input>
					</u-form-item>
					<u-form-item label="邮箱" borderBottom>
						<span class="required">*</span>
						<u--input placeholder="请输入邮箱" inputAlign="right" v-model="form.email" border="none">
						</u--input>
					</u-form-item>
					<u-form-item label="手机号" borderBottom>
						<span class="required">*</span>
						<u--input placeholder="请输入手机号" inputAlign="right" v-model="form.phone" border="none">
						</u--input>
					</u-form-item>
				</u--form>
			</view>
			<view class="logout">
				<u-button type="primary" size="large" text="提交" @click="null"></u-button>
			</view>
			<u-modal :show="show" content="是否退出当前账号,重新登陆" closeOnClickOverlay :showCancelButton="true"
				@cancel="show = false" @confirm="logout"></u-modal>
		</mescroll-uni>
		<view class="logout">
			<u-button type="primary" size="large" text="退出登录" @click="show = true"></u-button>
		</view>
	</view>
</template>

<script>
	import MescrollMixin from "@/uni_modules/mescroll-uni/components/mescroll-uni/mescroll-mixins.js";
	import {
		logout
	} from "@/api/login/index.js"
	import {
		removeToken
	} from "@/utils/auth.js"
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
				show: false,
				form: {
					userName: this.$store.getters.userName,
					empno: this.$store.getters.empno,
					sex: this.$store.getters.sex ? '女' : '男',
					email: this.$store.getters.email,
					phone: this.$store.getters.phone,
					fileList: [{
						url: 'https://cdn.uviewui.com/uview/swiper/1.jpg',
					}]

				}
			}
		},
		methods: {
			//退出登录
			logout() {
				logout().then(res => {
					removeToken()
					this.$Router.replaceAll('/pages/login/index')
				})
			},
			//上传
			afterRead(e) {
				this.form.fileList = [e.file]
			},
			//删除
			deletePic() {
				this.form.fileList = []
			}
		}
	}
</script>

<style scoped lang="scss">
	.warp {
		display: flex;
		flex-direction: column;

		.content {
			flex: 1;
			min-width: 0;
			min-height: 0;
			padding: 20rpx;

			.form {
				background-color: #ffffff;
				padding: 0 20rpx;

				.required {
					color: #D9001B;
					padding-right: 20rpx
				}
			}

			// .info {
			// 	border-radius: 40rpx;

			// 	.item {
			// 		display: flex;
			// 		flex-direction: row;
			// 		justify-content: space-between;
			// 		align-items: center;
			// 		background-color: #ffffff;
			// 		border-bottom: 1rpx solid #EEEEEE;
			// 		min-height: 83rpx;
			// 		padding: 20rpx;
			// 		font-size: 28rpx;
			// 		font-weight: 400;
			// 		color: #333333;
			// 	}
			// }
		}

		.logout {
			width: 100%;
			padding: 40rpx 40rpx;
		}
	}

	::v-deep .u-upload__wrap {
		justify-content: flex-end;
	}
</style>
