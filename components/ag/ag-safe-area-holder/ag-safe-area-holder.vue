<template>
  <view :style="[safeAreaStyle]" class="safe-area-container">
    <view
      id="content"
      :style="[{ zIndex: zIndex ? parseInt(zIndex) : 99 }, customStyle]"
      class="safe-area-container"
      :class="[fixed ? 'safe-area-container--fixed' : '', shadow ? 'safe-area-container--shadow' : '']"
    >
      <slot />
      <ag-safe-area :bg-color="bgColor" />
    </view>
  </view>
</template>

<script>
import AgSafeArea from '@/components/ag/ag-safe-area/ag-safe-area';
import Component  from '@/core/mixins/Component';

export default {
  name:       'agSafeAreaHolder',
  mixins:     [ Component ],
  components: { AgSafeArea },
  props:      {
    fixed:       {
      type:    Boolean,
      default: true,
    },
    shadow:      Boolean,
    zIndex:      {
      type: [ Number, String ],
    },
    customStyle: {
      type: Object,
      default() {
        return {};
      },
    },
    bgColor:     {
      type:    String,
      default: '#f5f5f5',
    },
    holder:      {
      type:    Boolean,
      default: true,
    },
  },
  data() {
    return {
      totalHeight: 0,
    };
  },

  computed: {
    safeAreaStyle() {
      let style = {};

      if (this.holder) {
        style.height = this.totalHeight + 'rpx';
      }

      return style;
    },
  },

  mounted() {
    this._initRect();
  },

  methods: {
    async _initRect() {
      const res = await this.getRect('#content');
      console.log('#content:', res);
      let { height }   = res;
      this.totalHeight = height * 2;
    },
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
  box-shadow: 0 -3rpx 10rpx rgba(0, 0, 0, 0.1);
}
</style>
