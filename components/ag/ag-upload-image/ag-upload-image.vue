<template>
  <view class="upload flex-row flex-wrap flex-align-center">
    <block v-for="(item, index) of list" :key="index">
      <view
        :style="uploadItemStyle"
        class="upload-item-img upload-item flex-column"
        :class="[margin ? 'upload-item-margin' : '']"
      >
        <u-lazy-load
          :index="index"
          :height="height ? height : size"
          border-radius="20"
          :image="item"
          @click="onPreview"
        />
        <view
          :style="uploadCloseStyle"
          class="upload-item-img-delete flex-column flex-center theme-bkg-mask"
          @click.stop="onRemove(index)"
        >
          <ag-icons type="close" :size="parseInt(closeSize) / 2 - 8" :color="color.white"/>
        </view>
      </view>
    </block>
    <view
      v-if="list.length !== parseInt(maxCount)"
      :style="uploadAddStyle"
      class="upload-img_add upload-item flex-column flex-center"
      :class="[margin ? 'upload-item-margin' : '']"
      @click="onAdd"
    >
      <ag-icons type="add" :size="parseInt(addSize)" :color="color.fade"/>
    </view>
  </view>
</template>

<script>
import _UploadController from './_controller';
import { mapState }      from 'vuex';
import ASY               from '@/base/asy';


export default {
  name:       'ag-upload-image',
  props:      {
    value:        {
      type: Array,
      default() {
        return [];
      },
    },
    maxCount:     {
      type:    [ Number, String ],
      default: 9,
    },
    size:         [ Number, String ],
    addSize:      {
      type:    [ Number, String ],
      default: 40,
    },
    closeSize:    {
      type:    [ Number, String ],
      default: 40,
    },
    width:        [ Number, String ],
    height:       [ Number, String ],
    addBgColor:   {
      type:    String,
      default: '#f5f5f5',
    },
    borderRadius: {
      type:    [ Number, String ],
      default: 20,
    },
    margin:       {
      type:    Boolean,
      default: true,
    },
  },
  controller: null,

  computed: {
    ...mapState('theme', [
      'color',
    ]),

    /**
     * 图片大小样式
     */
    uploadItemStyle() {
      const widthSize = this.width ? this.width : this.size;
      const heightSize = this.height ? this.height : this.size;
      return `width: ${widthSize}rpx; height: ${heightSize}rpx; border-radius: ${this.borderRadius}rpx;`;
    },

    /**
     * 添加图片按钮样式
     */
    uploadAddStyle() {
      const widthSize = this.width ? this.width : this.size;
      const heightSize = this.height ? this.height : this.size;
      return `width: ${widthSize}rpx; height: ${heightSize}rpx; border-radius: ${this.borderRadius}rpx; background-color: ${this.addBgColor}`;
    },

    uploadAddIconStyle() {
      const widthSize = parseInt(this.width ? this.width : this.size);
      const heightSize = parseInt(this.height ? this.height : this.size);
      return Math.floor((widthSize + heightSize) / 2 / 4);
    },

    uploadCloseStyle() {
      return `width: ${this.closeSize}rpx; height: ${this.closeSize}rpx; border-radius: ${this.closeSize / 2}rpx;`;
    },
  },

  data() {
    return {
      list: [],
    };
  },

  created() {
    this.initData();
  },

  mounted() {
    this.list = this.value;
    this.controller.updateMaxCount(this.list.length);
  },

  watch: {
    value() {
      // props在mounted时会赋值一次给，之后的变化要通过watch监听并赋值给data
      this.list = this.value;
      this.controller.updateMaxCount(this.list.length);
    },
  },

  methods: {

    initData() {
      this.controller = new _UploadController(this, this.maxCount);
    },

    async onAdd() {
      await this.controller.upload();
    },

    onRemove(index) {
      ASY.createDialog('', '您确定删除这张图片吗？', () => {
        this.list.splice(index, 1);
        this.emitRemovedSuccess();
      });
    },

    onPreview(index) {
      ASY.previewImage(index, this.list);
    },

    /**
     * 图片上传完毕
     * @param list
     */
    emitUploadSuccess(list) {
      this.list = this.list.concat(list);
      this.$emit('uploaded', this.list);
      this._emitChange();
    },

    /**
     * 图片移除完毕
     */
    emitRemovedSuccess() {
      this.$emit('removed', this.list);
      this._emitChange();
    },

    // zbl add 2021 1.20 增加change事件，只要图片数组增删查改都触发
    _emitChange() {
      this.$emit('change', this.list);
    }
  },
}
</script>

<style lang="scss" scoped>

.upload-item {
  border-radius: 20rpx;
  overflow: hidden;
}

.upload-item-margin {
  margin-right: 20rpx;
  margin-bottom: 20rpx;
}

.upload-item-img {
  position: relative;
}

.upload-item-img-delete {
  position: absolute;
  top: 10rpx;
  right: 10rpx;
  overflow: hidden;
}

</style>