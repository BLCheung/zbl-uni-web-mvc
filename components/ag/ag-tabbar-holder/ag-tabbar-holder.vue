<template>
  <view class="tabbar-container">
    <view
      id="content"
      :style="[{ zIndex: zIndex ? parseInt(zIndex) : 99 }, customStyle]"
      class="tabbar-container"
      :class="[fixed ? 'tabbar-container--fixed' : '']"
    >
      <slot />
      <view :style="[tabBarHeight]" />
      <ag-safe-area />
    </view>
  </view>
</template>

<script>
import { mapState } from 'vuex';
import AgSafeArea   from '@/components/ag/ag-safe-area/ag-safe-area';

export default {
  name:       'agTabbarHolder',
  components: { AgSafeArea },
  props:      {
    fixed:       Boolean,
    zIndex:      {
      type: [ Number, String ],
    },
    customStyle: {
      type: Object,
      default() {
        return {}
      },
    },
    height:      [ Number, String ],
  },
  data() {
    return {};
  },

  computed: {
    ...mapState('theme', [ 'style' ]),

    tabBarHeight() {
      let style    = {};
      style.height = `${ this.height ? this.height : this.style.tabBarHeight }rpx`;

      return style;
    },
  },
}
</script>

<style>
.tabbar-container {
  /* #ifndef APP-NVUE */
  display: flex;
  /* #endif */
  flex-direction: column;
}

.tabbar-container--fixed {
  position: fixed;
  left: 0;
  bottom: 0;
}
</style>
