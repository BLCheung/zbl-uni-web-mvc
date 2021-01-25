<template>
	<!-- #ifndef APP-NVUE -->
	<view class="uni-list" :class="externalClasses">
		<slot />
	</view>
	<!-- #endif -->
	<!-- #ifdef APP-NVUE -->
	<list class="uni-list" :class="externalClasses" :enableBackToTop="enableBackToTop" :loadmoreoffset="loadmoreoffset" :scroll-y="scrollY" @loadmore="loadMore">
		<slot />
	</list>
	<!-- #endif -->
</template>

<script>
	/**
	 * List 列表
	 * @description 列表组件
	 * @tutorial https://ext.dcloud.net.cn/plugin?id=24
	 */
	export default {
		name: 'UniList',
		'mp-weixin': {
			options: {
				multipleSlots: false
			}
		},
		props: {
			enableBackToTop: {
				type: [Boolean, String],
				default: false
			},
			scrollY: {
				type: [Boolean, String],
				default: false
			},
      loadmoreoffset: {
        type: Number,
        default: 15
      },
      externalClasses: {
        type: Array,
        default() {
          return [];
        }
      }
		},
		provide() {
			return {
				list: this
			}
		},
		created() {
			this.firstChildAppend = false
		},
		methods: {
			loadMore(e) {
				this.$emit("scrolltolower", {});
			}
		}
	}
</script>
<style>
	.uni-list {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		position: relative;
		flex-direction: column;
	}

	/* #ifndef APP-NVUE */
	.uni-list:before {
		height: 0;
	}

	.uni-list:after {
		height: 0;
	}

	/* #endif */
</style>