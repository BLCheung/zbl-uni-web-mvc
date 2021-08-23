<template>
  <view>

  </view>
</template>

<script>
import Page from '@/core/mixins/Page';

export default {
  mixins: [ Page ],
  data() {
    return {};
  },

  methods: {
    /**
     * 注册接口model
     * @return {*[]}
     */
    onRegisterModel() { return []; },

    /**
     * 注册页面/组件事件
     * @return {{}}
     */
    onRegisterEvent() { return {}; },

    /**
     * 可获取页面传参
     * @param options 页面参数
     */
    initArguments(options) {},

    /**
     * 初始化视图数据
     */
    initViewData() {},

    /**
     * 页面已经onShow
     */
    onPageShowed() {},

    /**
     * 页面被销毁
     */
    onPageDestroy() {},
  },
}
</script>

<style scoped>

</style>
