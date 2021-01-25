export default {
	update(state, theme) {
		Object.assign(state, theme);
	},

	getConfig(state) {
		return state;
	},
}