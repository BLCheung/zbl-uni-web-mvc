<template>
	<view
	  v-if="show"
	  :style="{'z-index': zIndex}"
	  class="loading"
	  @click.stop=""
	>
		<u-loading
		  :show="show"
		  :color="color"
		  :size="size"
		/>
	</view>
</template>

<script>
	export default {
		name: 'agLoading',
		props: {
			show: Boolean,
			color: String,
			size: {
				type: [Number, String],
				default: 34
			},
			zIndex: {
				type: Number,
				default: 9999
			}
		}
	}
</script>

<style scoped>
	.loading {
		position: fixed;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
    
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #ffffff;
	}
</style>
