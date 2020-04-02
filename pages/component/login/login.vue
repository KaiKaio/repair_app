<template>
	<!-- 登录页 -->
	<view class="bg-logo">
		<view class="phone">
			<text class="font-icon color-hdsh">&#xe61e;</text>
			<text>用户名</text>
			<input type="text" value="" v-model="phone" placeholder-style="font-size: 24upx" placeholder="请输入用户名" maxlength="11" />
		</view>
		
		<view class="pwd">
			<text class="font-icon">&#xe619;</text>
			<text>密码</text>
			<input 
				type="number" 
				placeholder-style="font-size: 24upx" 
				v-model="authCode" value=""
				placeholder="请输入密码"/>
		</view>
		<view class="login-text">
			
		</view>
		<view class="login-btn bg-hdsh" @click="login" style="margin-bottom: 24upx;">
			登录
		</view>
		
		<view class="login-btn bg-hdsh" @click="register">
			注册
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
				var num_time = 60
				var timer = null
				uni.showToast({
					title: '',
					icon: 'loading',
					mask: true,
					duration: 50000
				});
				//获取验证码
				this.$base.szblPost(
					"/api/sms/mpcode?m=" + this.$DEVELOPER.szblid + 
					"&tk=" + this.$DEVELOPER.token + 
					"&state=" + this.$base.getState() + 
					"&phone=" + this.phone + 
					"&appid=" + this.$DEVELOPER.szblid + 
					"&smsid=" + this.smsid
				).then(res =>{
					uni.hideToast();
					this.num_html = num_time + '秒'
					timer = setInterval(() => {
						num_time--
						this.num_html = num_time + '秒'
						if (num_time < 1) {
							this.get_statu = true
							this.num_html = '获取验证码'
							clearInterval(timer)
						}
					}, 1000);
				}).catch(msg => {
					console.log(msg);
					uni.hideToast()
				})
			},
			login() {
				if (this.authCode.trim() == '') {
					uni.showToast({
						title: '请输入密码',
						icon: 'none',
						mask: false,
						duration: 1500
					});
					return
				}
				uni.showLoading({
					mask: true
				})
				
				this.$base.szblPost('/user/login', {
					username: this.phone,
					password: this.authCode
				}).then(res => {
					console.log(res)
					uni.hideLoading()
				}).catch(err => {
					uni.hideLoading()
					uni.showToast({
						title: err.data.message,
						icon: 'none'
					})
					
				})
				
				
			},
			// forget() {
			// 	uni.navigateTo({
			// 		url: '/pages/component/register/register?m=f',
			// 		success: res => {},
			// 		fail: () => {},
			// 		complete: () => {}
			// 	});
			// },
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
