<template>
  <view class="tabbar-container">
    <view
      :style="{ zIndex: zIndex }"
      class="tabbar-container"
      :class="[fixed ? 'tabbar-container--fixed' : '', containerStyle]"
    >
      <slot/>
      <view :style="{height: height + 'rpx'}"/>
      <ag-safe-area/>
    </view>

    <!-- <view v-if="fixed" class="tabbar-container">
      <view :style="{'height': tabbarHeight}" />
      <ag-safe-area />
    </view> -->
  </view>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name:  'agTabbarHolder',
  props: {
    fixed:          {
      type:    Boolean,
      default: false,
    },
    zIndex:         {
      type:    [Number, String],
      default: 9,
    },
    containerStyle: String,
    height: [Number, String],
  },
  data() {
    return {};
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
