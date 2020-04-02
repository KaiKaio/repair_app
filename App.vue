<script>
	import { mapActions } from 'vuex';
	
	export default {
		onLaunch: function(obj) {

		},
		onShow: function() {
			
		},
		onHide: function() {},
		methods: {
			...mapActions({
				
			})
		}
	}
</script>

<style>
	/*每个页面公共css */
	@import url("/common/base-upx.css");
	@import url("/common/style-upx.css");
	
	
	checkbox .uni-checkbox-input.uni-checkbox-input-checked:before {
		background-color: #eb544d;
		color: #fff;
		width: 48upx;
		height: 48upx;
		font-size: 36upx;
		align-items: center;
		justify-content: center;
		display: flex;
		border-radius: 50%;
	}
	
	checkbox .uni-checkbox-input {
		border: 2upx solid #ccc;
		width: 36upx;
		height: 36upx;
		border-radius: 50%;
		transition: all .3s;
	}
</style>
