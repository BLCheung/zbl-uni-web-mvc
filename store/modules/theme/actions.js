export default {
	init({commit}){
		uni.getSystemInfo({
			success: function (res) {
				res.navBarHeight = res.platform == 'ios' ? 44 : 48;
				commit('update',res)
			}
		});
	}
}