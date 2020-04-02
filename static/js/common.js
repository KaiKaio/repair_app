const urlPrex = "http://springboot.nat300.top"

//获取数据
const szblGet = function(url, jsonData) {
	return new Promise(function(resolve, reject) {
		uni.request({
			url: urlPrex + url,
			method: 'GET',
			header: {
				"Content-Type": "application/json;charset=UTF-8",
				"Cache-Control": "no-cache"
			},
			data: jsonData,
			dataType: 'json',
			success: (res) => {
				resolve(res)
			},
			fail: (returnMsg) => {
				reject(returnMsg);
			},
		});
	})

	// return promise;
}
//提交数据
const szblPost = function(url, jsonData) {
	return new Promise(function(resolve, reject) {
		uni.request({
			url: urlPrex + url,
			method: 'POST',
			// header:{
			// 	"Content-Type":"application/json;charset=UTF-8",
			// 	"Cache-Control":"no-cache"
			// },
			header:{
				"Content-Type":"application/x-www-form-urlencoded;charset=UTF-8",
				"Cache-Control":"no-cache"
			},
			data: jsonData,
			dataType: 'json',
			success: (res) => {
				if(res.data.status === 200) {
					resolve(res)
				} else {
					reject(res)
				}
			},
			fail: (err) => {
				//将状态置为reject，并把错误信息返回
				reject(err);
			}
		});
	})

}
//编辑数据
const szblPut = function(url, jsonData) {
	return new Promise(function(resolve, reject) {
		uni.request({
			url: urlPrex + url,
			method: 'PUT',
			header:{
				"Content-Type":"application/json;charset=UTF-8",
				"Cache-Control":"no-cache"
			},
			// data: jsonData,
			data: jsonResToStr(jsonData),
			dataType: 'json',
			success: (res) => {
				if (res.data.code != 0) {
					reject(res.data.msg)
				}
				resolve(res.data)
			},
			fail: (returnMsg) => {
				console.log(returnMsg)
				//将状态置为reject，并把错误信息返回
				reject(returnMsg.errMsg);
			},
			complete: () => {}
		});
	})

}
export default {
	urlPrex,
	szblGet,
	szblPost,
	szblPut
}
