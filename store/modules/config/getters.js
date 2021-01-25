export default {
	/**
	 * 获取logo
	 * @param state
	 * @returns {null}
	 */
	getLogo: state => {
		return state.logo;
	},

	/**
	 * 获取小号logo
	 * @param state
	 * @returns {null}
	 */
	getMinLogo: state => {
		return state.logo_min;
	},
}