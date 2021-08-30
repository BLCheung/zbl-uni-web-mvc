<template>
  <view :style="{backgroundColor: bgColor}" class="safe-area theme-safe-area page-width" />
</template>

<script>
import Component from '@/core/mixins/Component';

export default {
  name:   'cpmSafeArea',
  mixins: [ Component ],
  props:  {
    bgColor: {
      type:    String,
      default: '#f5f5f5',
    },
  },
}
</script>

<style lang="scss" scoped>

.safe-area {
  z-index: 99;
}
</style>
