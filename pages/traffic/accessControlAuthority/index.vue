<template>
	<view class="warp">
		<view>
			<u--image :showLoading="true" :src="require('../../../static/img/traffic/longRangeTitle.png')" width="100%"
				height="auto" mode="widthFix"></u--image>
		</view>
		<view style="padding-top:20rpx ;">
			<u--image :showLoading="true" :src="require('../../../static/img/traffic/authorityAdd.png')" width="88rpx"
				height="88rpx" @click="show = true,name = null,id = null"></u--image>
		</view>
		<mescroll-uni :fixed="false" ref="mescrollRef" :down="downOption" :up="upOption" class="content">
			<view class="item" v-for="(item,index) of this.dataList" :key="index">
				<u-swipe-action>
					<u-swipe-action-item :options="options" @click="(e)=>{click(e,item)}" :show="true"
						ref="swipeAction">
						<view class="swipe-action u-border-top u-border-bottom">
							<view class="swipe-action__content">
								<view class="iconName">
									<u--image :showLoading="true"
										:src="require('../../../static/img/traffic/disable.png')" width="auto"
										height="20" mode="heightFix"></u--image>
									<u--input style="margin-left: 20rpx;" disabled disabledColor="#ffffff" border="none"
										v-model="item.name">
									</u--input>
								</view>
								<u--image :showLoading="true" :src="require('../../../static/img/traffic/modify.png')"
									width="auto" height="20" mode="heightFix"
									@click="show = true,name = item.name,id= item.id">
								</u--image>
							</view>
						</view>
					</u-swipe-action-item>
				</u-swipe-action>
			</view>
		</mescroll-uni>
		<view class="popup">
			<u-popup :show="show" @close="show = false" mode="center">
				<view class="popup">
					<u--form labelPosition="left" ref="form" labelAlign="right" labelWidth="80">
						<u-form-item label="门禁名称" style="padding-right: 10rpx;">
							<u--input v-model="name" confirmType="done" placeholder="请填写门禁名称">
							</u--input>
						</u-form-item>
						<u-button text="确认" style="width:80%" type="primary" @click="id ?updata() : add()"></u-button>
					</u--form>
				</view>
				<u-toast ref="uToast" />
			</u-popup>
		</view>
		<u-toast ref="uToast2" />
	</view>
</template>

<script>
	import MescrollMixin from "@/uni_modules/mescroll-uni/components/mescroll-uni/mescroll-mixins.js";
	import {
		getList,
		save,
		del,
		updata
	} from "@/api/traffic/accessControlAuthority.js"
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
				options: [{
					text: '删除',
					style: {
						width: '70px',
						height: '42px',
						backgroundColor: '#f56c6c',
						borderRadius: '0rpx',
					}
				}],
				show: false,
				name: null,
				id: null,
				dataList: [],
			}
		},

		onReady() {
			this.getList()
		},
		methods: {
			getList() {
				getList({
					projectId: this.$store.getters.projectId
				}).then(res => {
					// console.log(res)
					this.dataList = res.data.data
				})
			},
			update(index) {
				this.dataList[index].disabled = !this.dataList[index].disabled
			},
			//删除
			click(e, item) {
				uni.showModal({
					title: '温馨提示',
					content: '确定要删除吗？',
					success: res => {
						if (res.confirm) {
							del(item.id).then(res => {
								if (res.data.msg = "success") {
									this.getList()
									this.$refs.uToast2.show({
										type: 'success',
										message: "删除成功",
									})
								} else {
									this.$refs.uToast2.show({
										type: 'error',
										message: "删除失败",
									})
								}
							})
						}
					}
				})
			},
			//新增
			add() {
				if (!this.name) {
					this.$refs.uToast.show({
						type: 'error',
						message: "请填写组织门禁名称",
					})
					return
				}
				save({
					projectId: this.$store.getters.projectId,
					name: this.name,
				}).then(res => {
					if (res.data.msg == "success") {
						this.$refs.uToast2.show({
							type: 'success',
							message: "修改成功",
						})
						this.show = false
						this.getList()
					} else {
						this.$refs.uToast.show({
							type: 'error',
							message: "修改失败",
						})
					}
				})
			},
			// 修改
			updata() {
				if (!this.name) {
					this.$refs.uToast.show({
						type: 'error',
						message: "请填写组织门禁名称",
					})
					return
				}
				updata({
					projectId: this.$store.getters.projectId,
					name: this.name,
					id: this.id
				}).then(res => {
					if (res.data.msg == "success") {
						this.$refs.uToast.show({
							type: 'success',
							message: "新增成功",
						})
						this.show = false
						this.getList()
					} else {
						this.$refs.uToast.show({
							type: 'error',
							message: "新增失败",
						})
					}
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.warp {
		display: flex;
		flex-direction: column;
		padding: 20rpx;

		.content {
			flex: 1;
			min-width: 0;
			min-height: 0;
			padding-top: 20rpx;

			.item {
				padding-bottom: 28rpx;

				.u-border-bottom {
					border: none;
				}

				.swipe-action__content {
					padding-left: 40rpx;
					padding-right: 40rpx;
					display: flex;
					flex-direction: row;
					justify-content: space-between;
					align-items: center;
				}

				.iconName {
					display: flex;
					flex-direction: row;
					justify-content: flex-start;
					align-items: center;
				}
			}


			.swipe-action {
				&__content {
					padding: 25rpx 0;

					&__text {
						font-size: 15px;
						color: $u-main-color;
						padding-left: 30rpx;
					}
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
