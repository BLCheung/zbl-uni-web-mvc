<template>
  <view :style="{backgroundColor: bgColor}" class="safe-area theme-safe-area page-width"/>
</template>

<script>
export default {
  name:  'agSafeArea',
  props: {
    bgColor: {
      type:    String,
      default: '#f5f5f5',
    },
  },
}
</script>

<style lang="scss" scoped>

.safe-area {
  /* #ifndef APP-NVUE || APP-VUE */
  //height: 0;
  //height: calc(0 + constant(safe-area-inset-bottom));
  //height: calc(0 + env(safe-area-inset-bottom));
  /* #endif */
  z-index: 99;
}
</style>
