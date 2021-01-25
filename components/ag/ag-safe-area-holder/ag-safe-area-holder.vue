<template>
  <view
    :style="{ zIndex: zIndex ? parseInt(zIndex) : 0 }"
    class="safe-area-container"
    :class="[fixed ? 'safe-area-container--fixed' : '', shadow ? 'safe-area-container--shadow' : '', containerStyle]"
  >
    <slot/>
    <ag-safe-area :bg-color="bgColor"/>
  </view>
</template>

<script>
export default {
  name:  'agSafeAreaHolder',
  props: {
    fixed:          {
      type:    Boolean,
      default: false,
    },
    shadow:         Boolean,
    zIndex:         {
      type: [ Number, String ],
    },
    containerStyle: String,
    bgColor:        {
      type:    String,
      default: '#f5f5f5',
    },
  },
  data() {
    return {};
  },
}
</script>

<style>
.safe-area-container {
  /* #ifndef APP-NVUE */
  display: flex;
  /* #endif */
  flex-direction: column;
}

.safe-area-container--fixed {
  position: fixed;
  left: 0;
  bottom: 0;
}

.safe-area-container--shadow {
  box-shadow: 0px -3rpx 10rpx rgba(0, 0, 0, 0.1);
}
</style>
