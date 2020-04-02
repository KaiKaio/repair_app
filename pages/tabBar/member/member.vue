<template>
	<!-- 我的 -->
	<view>
		<view class="member" @click="isLogin('my')">
			<view class="member-pic">
				<image v-if="loginFlag === true && wxAvatar === false" :src="$base.urlPrex + userDetail.kw16" mode="aspectFit" />
				</image>
				<image v-if="loginFlag === true && wxAvatar === true" :src="userDetail.kw16" mode="aspectFit" />
				</image>
				<image v-if="loginFlag === false" :src="default_photo" mode="aspectFit" />
				</image>
			</view>
			<view class="member-name" v-if="loginFlag">{{userDetail.kw12}}</view>
			<view class="member-name" v-else>请登录</view>
			
			<view class="member-info" v-if="loginFlag">
				<view v-if="userDetail.kw15 !== ''"><text class="font-icon">&#xe6c2;</text> 生日：{{ userDetail.kw15 ? userDetail.kw15.substring(5, userDetail.kw15.length) : '' }}</view>
				<view v-else><text class="font-icon">&#xe6c2;</text>生日：暂无</view>
				<view  v-if="userDetail.kw3 !== ''"><text class="font-icon">&#xe664;</text>性别：{{ userDetail.kw3 }}</view>
				<view v-else><text class="font-icon">&#xe664;</text>性别：暂无</view>
			</view>
		</view>
		
		<view class="kuai" style="margin-top: 16upx;" @click="isLogin('order', {}, '')">
			<h2 class="memtit" style="display: flex; justify-content: space-between; border-bottom: 0upx;">
				<text>我的订单</text>
				<text style="color: #a9a9a9; font-size: 24upx;">
					<text>查看全部</text>
					<text class="font-icon" style="font-size: 24upx;">&#xe642;</text>
				</text>
				
			</h2>
		</view>
		
		<view class="kuai icon" style="margin-top: 16upx;">
			<view @click="isLogin('order', {}, 0)">
				<text class="font-icon">&#xe678;</text>
				<text>已下单</text>
			</view>
			<view @click="isLogin('order', {}, 1)">
				<text class="font-icon">&#xe628;</text>
				<text>已付款</text>
			</view>
			<view @click="isLogin('order', {}, 2)">
				<text class="font-icon">&#xe703;</text>
				<text>已派送</text>
			</view>
			<!-- <view @click="isLogin('order', {}, 0)">
				<text class="font-icon">&#xe677;</text>
				<text>已送达</text>
			</view> -->
			<view @click="isLogin('order', {}, 4)">
				<text class="font-icon">&#xe679;</text>
				<text>已完成</text>
			</view>
		</view>
		
		<view class="kuai icon" style="flex-wrap: wrap;">
			<view v-if="loginFlag" @click="toShopCart">
				<text class="font-icon">&#xe66c;</text>
				<text>购物车</text>
			</view>
			<view @click="isLogin('address')">
				<text class="font-icon">&#xe69a;</text>
				<text>收货地址</text>
			</view>
			
			<view @click="isLogin('shop')" v-if="shopRoleShow === true">
				<text class="font-icon">&#xe681;</text>
				<text>店铺管理</text>
			</view>
			
			<view @click="isLogin('Delivery')" v-if="delevePersonShow === true">
				<text class="font-icon">&#xe680;</text>
				<text>配送管理</text>
			</view>
			
			<view v-if="delevePersonShow === true" @click="delPersonDelive">
				<text class="font-icon">&#xe67f;</text>
				<text>解除配送</text>
			</view>
		</view>
		
		
		<view class="kuai icon" style="flex-wrap: wrap;"  v-if="loginFlag">
			<view @click="logout">
				<text class="font-icon">&#xe675;</text>
				<text>退出登录</text>
			</view>
		</view>
		
		
		<view @click="cancel" class="shop-cart-shadow" v-show="shopCartShow === true" ></view>
		<view class="bottom-pop" :class="{ 'show': shopCartShow === true  }">
			<shopCartModel />
		</view>
		
	</view>
</template>

<script>
	import shopCartModel from '@/components/shop-cart-model.vue'
	
	import {
		mapMutations,
		mapState
	} from "vuex";
	export default {
		components: {
			shopCartModel
		},
		
		data() {
			return {
				wxAvatar: false,
				shopCartShow: false,
				b_hint: '到底啦~',
				dai_num: 0, //带付款商品数
				pj_num: 0, //待评价商品数
				userDetail: '', //用户信息
				default_photo: require("@/static/icon/default.png"),
				placeholder_photo: require("@/static/images/my-02.png"),
				df_num: 0, //待发货商品数
				ds_num: 0, //待收货商品数
				collect_num: 0, //收藏数
				shopPath: '/api/scdsc',
				shopList: [],
				user: null, //用户信息
				balance: 0.00, //智慧卡余额
				integral: 0,
				loginFlag: false,
				
				roleList: [], // 权限列表
				shopRoleShow: false,
				delevePersonShow: false
			};
		},
		
		computed: {
			...mapState({
			    unit_data: state => state.zhsq.unit_data
			})
		},
		
		onLoad() {
			uni.setNavigationBarTitle({
				title: this.unit_data.name
			})
		},
		onReachBottom() {
			
		},
		onShow() {
			// if (this.$userMsg.userid === null) {
			// 	this.loginFlag = false // 未登录
			// } else {
			// 	this.loginFlag = true // 已登录
				
			// 	this.fetchRole('15844995780021847546239') // 查询店铺权限
			// 	this.fetchRole('15844996086031044545059') // 查询配送员权限
				
			// 	this.getUserMsg()
				
			// }
		},
		methods: {
			// 解除配送员角色
			delPersonDelive() {
				uni.showLoading({
					mask: true
				})
				
				uni.showModal({
					content: `确认解除与本店的配送员关系吗？`,
					showCancel: true,
					confirmColor: this.$PROP.hdsh_color,
					success: res => {
						if (res.confirm) {
							this.$base.szblGet("/api/users/qbur", {
								m: this.$userMsg.userid,
								tk: this.$userMsg.token,
								state: this.$base.getState(),
								appid: this.$DEVELOPER.szblid,
								g_ifdr: '0',
								uid: this.$userMsg.userid,
								rid: '15844996086031044545059',
								oid: this.unit_data.id // 店铺ID
							}).then(res => {
								let r = this.$base.strResToJson(res.data)
								
								return this.$base.szblDel(
									"/api/user/unr/" + r[0].id + 
									'?m=' + this.$userMsg.userid +
									'&tk=' + this.$userMsg.token +
									'&state=' + this.$base.getState()
								)
							}).then(res => {
								if(res.msg === '编辑成功!') {
									uni.showToast({
										title: '解除成功'
									})
								}
								this.delevePersonShow = false
								uni.hideLoading()
							}).catch(err => {
								console.log(err, '解除错误')
								uni.hideLoading()
							})
						}
						if (res.cancel) {
							uni.hideLoading()
							return
						}
					}
				})
			},
			// 查询用户权限 来 显示管理按钮
			fetchRole(rid) {
				
				this.$base.szblGet("/api/users/qbur", {
					m: this.$userMsg.userid,
					tk: this.$userMsg.token,
					state: this.$base.getState(),
					appid: this.$DEVELOPER.szblid,
					g_ifdr: '0',
					uid: this.$userMsg.userid,
					rid: rid,
					oid: this.unit_data.id // 店铺ID
				}).then(res => {
					let r = this.$base.strResToJson(res.data)
					
					if(rid === "15844995780021847546239" && r.length > 0) { // 店铺权限匹配
						this.shopRoleShow = true
					}  else if (rid === "15844996086031044545059" && r.length > 0) { // 配送员匹配
						this.delevePersonShow = true
					}
					
				}).catch(err => {
					console.log(err ,'错误信息')
				})
			},
			
			toShop() {
				uni.navigateTo({
					url: '/pages/shopAdmin/index',
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			},
			
			toShopCart(){
				if (this.$userMsg.userid == null) {
					this.$store.commit('set_page_data', {
						page: '/pages/shopping/shopCart/shopCart',
					})
					uni.navigateTo({
						url: '/pages/component/login/login?m=null',
						success: res => {},
						fail: () => {},
						complete: () => {}
					});
					return false;
				}else{
					uni.hideTabBar({
						animation: true,
						success: ()=> {
							this.shopCartShow = true
							document.getElementsByTagName('body')[0].style.overflow = 'hidden'
						}
					})
				}
			},
			
			cancel() {
				this.shopCartShow = false
				
				let body = document.getElementsByTagName('body')[0]
				
				body.style.position = ''
				body.style.overflow = ''
				
				let top = body.style.top
				
				document.body.scrollTop = document.documentElement.scrollTop = -parseInt(top)
				
				body.style.top = ''
				
				uni.showTabBar({
					animation: true
				})
			},
			
			/**
			 * 判断登录状态
			 * @param {String} 被跳转的页面标识
			 * @param {String} 订单类型
			 * @param {Object} type
			 */
			isLogin(mark, obj, status) {
				if (false) {
					if(mark == 'smartCard'){
						this.toSmartCard()
					} else if (mark == 'address'){
						this.toAddress()
					} else if (mark == 'collect'){
						this.toCollect()
					} else if (mark == 'shopCart'){
						this.toShopCart()
					} else if (mark == 'coupon'){
						this.toCoupon()
					} else if (mark == 'order'){
						this.toOrder(status)
					} else if (mark == 'my'){
						this.toMy()
					} else if (mark == 'shop') {
						this.toShop()
					} else if (mark == 'Delivery') {
						this.toDelivery()
					}
					
				} else {
					this.$store.commit('set_page_data', {
						page: '/pages/tabBar/member/member',
					})
					uni.navigateTo({
						url: '/pages/component/login/login?m=null',
						success: res => {},
						fail: () => {},
						complete: () => {}
					});
				}
			},
			toDelivery() {
				uni.navigateTo({
					url: '/pages/shopAdmin/delivery',
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			},
			
			// 到订单列表
			toOrder(status) {
				this.$store.commit('set_order_status', status)
				uni.switchTab({
					url: '/pages/tabBar/order/orderList/orderList'
				});
			},
			// 到我的收货地址
			toAddress() {
				uni.navigateTo({
					url: '/pages/component/addressList/addressList',
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			},
			// 到我的收藏
			toCollect() {
				uni.navigateTo({
					url: '/pages/component/collect/collect',
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			},

			// 我的优惠券
			toCoupon(){
				uni.navigateTo({
					url: '/pages/shopping/couponList/couponList',
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			},

			// 登出
			logout() {
				uni.showModal({
					content: "您确定要退出登录吗？",
					showCancel: true,
					confirmColor: this.$PROP.hdsh_color,
					success: res => {
						if (res.confirm) {
							this.$base.logout(this.$DEVELOPER.szblid);
							global.$userDetail = {}
							this.$store.commit('set_userMsg', {})
							this.loginFlag = false
							uni.reLaunch({
								url: '/pages/tabBar/index/index',
								success: res => {}
							})
						}
						if (res.cancel) {
							return
						}
					}
				})
			},
			
			// 到个人信息修改页
			toMy() {
				uni.navigateTo({
					url: '/pages/component/my/my',
				});
			},
			
			// 到商品详情
			toShopDetail(x) {
				uni.navigateTo({
					url: '/pages/shopping/detailShop/detailShop?id=' + x.id
				});
			},
			
			// 获取用户信息
			getUserMsg(){
				uni.showLoading({
				    title: '加载中...'
				})
				
				this.$base.szblGet("/api/user/" + this.$userMsg.userid, {
					m: this.$userMsg.userid,
					tk: this.$userMsg.token,
					state: this.$base.getState(),
				}).then((resData) => {
					global.$userDetail = this.$base.strResToJson(resData.data);
					this.userDetail = global.$userDetail
					
					if(this.userDetail.kw16.indexOf("http") != -1) { // 判断是否为微信头像
						this.wxAvatar = true  // 是
					} else {
						this.wxAvatar = false
					}
					
					this.$store.commit('set_userMsg', global.$userDetail)
					
					// 如果没有数据库中没有微信OpenID并且本地存有微信OpenID
					if(global.$userDetail.wxopenid === '' && uni.getStorageSync("wxOpenid") !== '') {
						
						return this.$base.getWxUserInfo(
							uni.getStorageSync("wxOpenid"), 
							this.$DEVELOPER.wxPayMarkPUBLIC
						)
						
					} else {
						return Promise.reject('没有Return 获取微信信息接口')
					}
					
				}).then(res => {
					console.log(res, '获取微信用户信息')
					if (res != null) {
						// 修改信息
						let wxData = this.$base.strResToJson(res);
						return this.$base.szblPut(
							'/api/user/my' +
							'?m=' + this.$userMsg.userid + 
							'&tk=' + this.$userMsg.token + 
							'&state=' + this.$base.getState(), {
								"id": this.$userMsg.userid,
								"wxopenid": uni.getStorageSync("wxOpenid"),
								kw12: wxData.nickname, //微信昵称
								kw16: wxData.headimgurl ,//微信头像
								kw15: wxData.sex // 性别
							}
						)
					}
				}).then(res => {
					uni.hideLoading();
					this.getUserMsg() // 修改完成后再次执行一次此函数
				}).catch((msg) => {
					uni.hideLoading();
					// uni.showToast({
					// 	title: msg,
					// 	duration: 5000
					// })
					console.log(msg)
				})
			}
		}
	}
</script>

<style>
	.shop-cart-shadow {
		background-color: rgba(0,0,0,.4);
		height: 100vh;
		width: 100vw;
		position: fixed;
		z-index: 1;
		bottom: 0px;
	}
	.bottom-pop {
		transform: translateY(100vh);
		position: fixed;
		bottom: 0px;
		z-index: 2;
		transition: all .3s;
		width: 100vw;
	}
	.bottom-pop.show {
		transform: translateY(0);
		display: block;
		width: 100vw;
	}
	
	.member {
		width: 750upx;
		position: relative;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		color: #FFFFFF;
		padding-bottom: 100upx;
		overflow: hidden;
	}
	
	.member:before,
	.member:after{
		content: "";
		position: absolute;
		left: 50%;
		min-width: 400vw;
		min-height: 400vw;
		background-color: #eb544d;
		animation-name: rotate;
		animation-iteration-count: infinite;
		animation-timing-function: linear;
		z-index: -1;
	}
	
	.member:before {
		bottom: 3vh;
		border-radius: 45%;
		animation-duration: 10s;
	}
	
	.member:after {
		bottom: 0vh;
		opacity: .5;
		border-radius: 47%;
		animation-duration: 10s;
	}
	
	@keyframes rotate {
	    0% {
	        transform: translate(-50%, 0) rotateZ(0deg);
	    }
	    50% {
	        transform: translate(-50%, -2%) rotateZ(180deg);
	    }
	    100% {
	        transform: translate(-50%, 0%) rotateZ(360deg);
	    }
	}
	
	
	
	
	.member-list li {
		width: 14.49%;
		font-size: 24upx;
	}
	
	.member-info {
		display: flex;
		justify-content: space-between;
		width: 45%;
		margin-top: 12upx;
		font-size: 24upx;
	}
	
	.member-info .font-icon {
		font-size: 24upx;
		margin-right: 5upx;
	}

	.member-list li text {
		position: relative;
		font-size: 50upx;
	}

	.member-list li em {
		border: 1px solid #e02e24;
		position: absolute;
		border-radius: 50%;
		width: 30upx;
		height: 30upx;
		font-style: normal;
		color: #e02e24;
		font-size: 20upx;
		top: -25%;
		right: -25%;
		background: #fff;
		line-height: 30upx;
	}

	.member-list {
		padding: 50upx 0 40upx;
		justify-content: space-between;
	}

	.m-item {
		padding: 0 20upx;
	}

	.m-item .icon-map {
		font-size: 40upx;
	}

	.kuai {
		background: #fff;
		padding: 0 4%;
		margin-bottom: 16upx;
	}
	
	.kuai.icon {
		display: flex;
		padding: 20px 4%;
		flex-wrap: wrap;
		justify-content: space-between;
	}
	
	.kuai.icon > view {
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	
	.kuai.icon > view > .font-icon {
		color: #eb544d;
		margin-bottom: 8upx;
		font-size: 46upx;
	}

	.member-list li a p {
		padding-top: 10upx;
	}

	#recommend-head span {
		font-size: 28upx;
		/* background: url(../../static/images/tj.png) no-repeat left center; */
		padding-left: 4.93%;
		background-size: 17upx auto;
	}

	.memtit .shou {
		padding-right: 2.17%;
	}

	.memtit a {
		float: right;
		font-size: 24upx;
		color: #a9a9a9;
	}

	.memtit .right {
		float: right;
		color: #000;
	}

	.memtit .meishi {
		padding-right: 2.77%;
		font-size: 34upx;
	}

	.memtit .menpiao {
		padding-right: 3.17%;
	}

	/* .memtit text {
		font-size: 30upx;
		font-weight: bold;
	} */

	.member-list li text.teshu {
		font-size: 40upx;
		width: 50upx;
		height: 54upx;
		display: inline-block;
		line-height: 54upx;
	}

	.member-list li text.teshu2 {
		font-size: 42upx;
		width: 50upx;
		height: 54upx;
		display: inline-block;
		line-height: 54upx;
	}

	.member-list .icon-order {
		color: #00a0ea;
	}

	.shop-order {
		line-height: 102upx;
		font-weight: 600;
		color: #00a0ea;
	}

	.shop-order text {
		padding-left: 20upx;
		font-size: 24upx;
	}

	.kuai2 {
		margin-bottom: 12upx;
	}

	.comm-placeholder {
		/* margin-top: 12upx; */
		height: 120upx;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.comm-placeholder image {
		height: 66upx;
		width: 222upx;
	}

	.new-list {
		width: 100%;
		/* background: #FFFFFF; */
		display: flex;
		flex-wrap: wrap;
		justify-content: space-around;
		/* margin-bottom: 100upx; */
	}

	.new-item {
		width: 216upx;
		height: 340upx;
		border-radius: 10upx;
		border: 1upx solid #EEEEEE;
		margin-bottom: 51upx;
		overflow: hidden;
		background: #FFFFFF;
	}

	.new-item image {
		width: 216upx;
		height: 216upx;
	}

	.item-bottom {
		height: 116upx;
	}

	.item-bottom .name {
		height: 55upx;
		font-size: 20upx;
		overflow: hidden;
		padding: 0 7upx;
	}

	.item-bottom .detail {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-top: 19upx;
	}

	.item-bottom .detail .price {
		color: #d81e06;
		letter-spacing: -2upx;
	}

	.item-bottom .detail text {
		font-size: 30upx;
		font-weight: bold;
		margin-left: 17upx;
	}

	.item-bottom .detail .sales {
		margin-right: 23upx;
		font-size: 18upx;
		color: #a9a9a9;
	}
</style>
