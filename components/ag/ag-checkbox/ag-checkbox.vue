<template>
  <view class="checkbox flex-column center" @click.stop="onCheck">
    <ag-icons v-if="value" type="check-fill" :size="size" :color="color.primary"/>
    <ag-icons v-else type="check" :size="size" :color="color.fade"/>
  </view>
</template>

<script>
import { mapState } from 'vuex';

export default {
  props: {
    value: Boolean,
    size:  {
      type:    [String, Number],
      default: 15,
    },
  },

  computed: {
    ...mapState('theme', [
      'color',
    ]),
  },

  methods: {
    onCheck() {
      let inCheck = this.check;
      this.$emit('check', !inCheck);
    },
  },
}
</script>

<style>
</style>
