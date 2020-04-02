import common from '@/static/js/common.js';

import Vue from 'vue';

const repair = {
	state : {
		userMsg: {},
		loginFlag: false
	},
	
	actions : {
		getCartList({commit}, pjson) {
			return new Promise((resolve, reject) => {
				// common.szblGet('/api/carts', {
				// 	m: user_msg.userid,
				// 	tk: user_msg.token,
				// 	pnum: 1,
				// 	psize: 99,
				// 	state: common.getState(),
				// 	createuserid: user_msg.userid,
				// 	rpflag: Vue.prototype.$DEVELOPER.cid,
				// 	appid: Vue.prototype.$DEVELOPER.szblid,
				// 	areacode: Vue.prototype.$areaMsg.id,
				// 	labelid: '1014002'
				// }).then(res => {
				// 	let data = common.strResToJson(res.data)
				// 	if(data.length === undefined) {
				// 		console.log('暂无购物车信息')
				// 	} else {
				// 		data.map(item => {
				// 			item.checkBox = false
				// 		})
				// 	}
					
				// 	commit('getCartList', data)
				// 	resolve()
				// }).catch(msg => {
				// 	reject(msg)
				// })
			})
		}
		
	},
	
	mutations : {
		set_userMsg: (state, value) => {
			state.userMsg = value
		},
		
		set_loginFlag: (state, value) => {
			state.loginFlag = value
		},
	},
	
	getters:{}
}

export default repair