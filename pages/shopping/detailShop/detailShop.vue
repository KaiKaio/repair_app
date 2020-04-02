<template>
	<!-- 商品详情 -->
	<view class="app-init">
		<image src="https://kaikai-bloga.oss-cn-beijing.aliyuncs.com/repair/LightSky.jpeg" mode="aspectFill" style="height: 360upx; width: 100%;"></image>
		
		<view class="detail-title">
			<view style="width: 100%; display: flex;">
				<image class="title-image" :src="form.productImage" mode="aspectFit"></image>
				<view class="title-font">{{ form.productType }}</view>
			</view>
			
			
			<ul class="title-process">
				<li>在线下单<text class="font-icon">&#xe67d;</text></li>
				<li>工程师联系<text class="font-icon">&#xe67d;</text> </li>
				<li>开始维修<text class="font-icon">&#xe67d;</text></li>
				<li>修完付款</li>
			</ul>
		</view>
		
		
		<view class="choose-wrapper">
			<h3>选择故障</h3>
			<checkbox-group class="check-list" ref="checkUl" @change="checkboxChange">
				<view class="list-item" v-for="(item, index) in managerList" :key="item.id">
					<checkbox :checked="item.checkBox" :value="index.toString()" class="check-item" color="#fff" style="width: 44upx; height: 44upx;" />
					<view class="item-name">{{ item.message }}</view>
					<view class="item-price">￥{{ item.price }}</view>
				</view>
			</checkbox-group>
			
			
		</view>
			
		<view class="fix-mall-btn">
			<view class="fix-mall-index fl">
				
				<a @click="customer">
					<text class="font-icon">&#xe604;</text>
					<text>客服</text>
				</a>
			</view>
				<view class="fix-buy-btn-wrap fr">
				<view class="bg-hdsh-light btn" @click="skuPupToggle(true)">
					确认
				</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	import {
		mapMutations, mapActions
	} from "vuex";
	import uniNumberBox from "@/components/uni-number-box/uni-number-box.vue"
	import uParse from "@/components/gaoyia-parse/parse.vue"
	import uniIcons from '@/components/uni-icon/uni-icon.vue'
	
	import uniPopup from "@/components/uni-popup/uni-popup.vue"
	export default {
		components: {
			uniNumberBox,
			uParse,
			uniIcons,
			uniPopup,
		},
		data() {
			return {
				id: '',
				form: {},
				managerList: []
			};
		},
		onLoad(obj) {
			this.id = obj.id;
			this.fetchPhoneInfo()
		},
		methods: {
			
			fetchPhoneInfo() {
				this.$base.szblGet(`/dragon/product/byId?productId=${this.id}`).then(res => {
					this.form = res.data.data
					return this.$base.szblGet(`/manager/byPhoneType?phone_type=${this.form.productType}`)
				}).then(res => {
					this.managerList = res.data.data
				}).catch(err => {
					console.log(err)
				})
			},
			
			checkboxChange(e) {
				console.log(e)
				
				// let selectArrIndex = e.detail.value// 已经选中数组
				// this.$store.commit('checkChange', selectArrIndex) // 改变Check
				// this.$store.commit('computedTotalPrice', '') // 计算价格
				
			}
		},
	}
</script>

<style lang="scss" scoped>
	.app-init {
		min-height: 100vh;
		width: 100%;
		display: flex;
		flex-direction: column;
		position: absolute;
		> .detail-title {
			display: flex;
			flex-wrap: wrap;
			background-color: #fff;
			padding-top: 24upx;
			.title-image {
				margin-top: -96upx;
				background-color: #eee;
				width: 150upx; 
				height: 150upx;
				border: 8upx solid #fff;
				padding: 12upx 0upx;
				margin-left: 40upx;
			}
			.title-font {
				font-size: 40upx;
				font-weight: 700;
			}
			> .title-process {
				width: 100%;
				display: flex;
				border-top: 2upx solid #eee;
				border-bottom: 2upx solid #eee;
				justify-content: space-around;
				font-size: 24upx;
				padding: 16upx 0upx;
				.font-icon {
					font-size: 24upx;
					margin-left: 32upx;
				}
			}
		}
		> .choose-wrapper {
			background-color: #fff;
			margin-top: 16upx;
			padding: 16upx 24upx;
			> h3 {
				font-size: 34upx;
				font-weight: 700;
			}
			> .check-list {
				background-color: #f8f8f8;
				padding: 24upx;
				font-size: 26upx;
				.list-item {
					display: flex;
					align-items: center;
					padding: 16px;
					margin-bottom: 16upx;
					background: #fff;
					.item-name {
						margin-left: 16upx;
					}
					.item-price {
						margin-left: auto;
					}
				}
			}
		}
	}
</style>
