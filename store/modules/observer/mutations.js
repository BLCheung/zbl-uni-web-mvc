export default {
	/**
	 * 发布
	 * @param state
	 * @param obj
	 */
	publish(state, obj) {
		const { pageName, data } = obj;
		state.pages[pageName] = data;
	},
}
