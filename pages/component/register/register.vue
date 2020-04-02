<template>
	<!-- 登录页 -->
	<view class="bg-logo">
		<view class="phone" style="margin-bottom: 24upx;">
			<text class="font-icon color-hdsh">&#xe61e;</text>
			<text>手机号</text>
			<input type="number" value="" v-model="phone" placeholder-style="font-size: 24upx" placeholder="请输入手机号" maxlength="11" />
		</view>
		
		<view class="phone">
			<text class="font-icon color-hdsh">&#xe65c;</text>
			<text>用户名</text>
			<input type="text" value="" v-model="username" placeholder-style="font-size: 24upx" placeholder="请输入用户名" maxlength="11" />
		</view>
		
		<view class="pwd">
			<text class="font-icon color-hdsh">&#xe619;</text>
			<text>密码</text>
			<input
				type="number" 
				placeholder-style="font-size: 24upx" 
				v-model="authCode" 
				value=""
				placeholder="请输入密码"/>
		</view>
		<view class="login-text">
			
		</view>
		<view class="login-btn bg-hdsh" @click="submitRegister">
			注册账户
		</view>
	</view>
</template>

<script>
	import {
		mapGetters, mapActions
	} from 'vuex';
	export default {
		data() {
			return {
				showPwd: true,
				username: '',
				phone: '',
				pwd: '',
				authCode: '',
				isRegistered: true,
				isLogin: false,
				button: '登录',
				num_html: '获取验证码',
				page: '',
				smsid: '15826210430701267284594'
			};
		},
		computed: {
			...mapGetters(['get_page_data'])
		},
		onLoad(obj) {
			if (obj.m != "null") {
				this.phone = obj.m
			}
			this.page = this.get_page_data.page
		},
		methods: {
			...mapActions({
			    getCartList: "getCartList"
			}),
			
			// 提交注册信息
			submitRegister() {
				uni.showModal({
					content: "是否确定注册信息？",
					showCancel: true,
					confirmColor: this.$PROP.hdsh_color,
					success: res => {
						if (res.confirm) {
							
							uni.request({
								url: this.$base.urlPrex + '/user/register',
								method: 'POST',
								header:{
									"Content-Type":"application/x-www-form-urlencoded;charset=UTF-8",
									"Cache-Control":"no-cache"
								},
								data: {
									username: this.username,
									password: this.authCode,
									phone: this.phone
								},
								dataType: 'json',
								success: (res) => {
									if(res.data.message ===  "注册成功") {
										uni.showToast({
											icon: 'success',
											title: '注册成功',
										})
										setTimeout(() => {
											uni.reLaunch({
												url: '/pages/tabBar/member/member'
											})
										}, 1000)
									}
								},
								fail: (err) => {
									console.log(err)
								}
							});
						}
						if (res.cancel) {
							return
						}
					}
				})
			},
			
			// 进入注册页面
			register() {
				uni.navigateTo({
					url: '/pages/component/register/register'
				})
			},
			
			getAuthCode() {
				if (!(/^1\d{10}$/).test(this.phone)) {
					uni.showToast({
						title: '请输入正确的手机号',
						icon: 'none',
						mask: false,
						duration: 1500
					});
					return false;
				}
			},
			
			login() {},
		}
	}
</script>

<style>
.bg-logo {
	height: 100vh;
	width: 750upx;
	/* background: #fff url(~@/static/icon/hdsh/logo.png) no-repeat 50% 13.3881%; */
	background-size: 30%;
	position: relative;
}


</style>
