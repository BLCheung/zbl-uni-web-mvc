<template>
  <view class="upload flex-row flex-wrap flex-align-center">
    <block v-for="(item, index) of list" :key="index">
      <view
        :style="uploadItemStyle"
        class="upload-item-video upload-item flex-column theme-bkg-normal"
      >
        <video
          v-if="item"
          id="video"
          class="upload-item-video_video view-full"
          :src="item"
          :autoplay="false"
          :controls="false"
          :show-center-play-btn="false"
          @click="onVideoClick({index: index, url: item})"
        />
      </view>
    </block>
    <view
      v-if="!list.length"
      :style="uploadAddStyle"
      class="upload-img_add upload-item flex-column flex-center"
      @click="onAdd"
    >
      <ag-icons type="add" :size="parseInt(addSize)" :color="color.fade"/>
    </view>

    <video
      v-if="isPreVideo"
      :style="{height: videoHeight}"
      class="preview-video view-full"
      :src="videoUrl"
      controls
      autoplay
      @play="onVideoPlay"
    >
      <cover-image
        v-if="isPreVideo"
        class="close-wrapper"
        src="/static/images/comm/icon_close.png"
        @click="onCloseVideo"
      />
    </video>
  </view>
</template>

<script>
import _UploadController from './_controller';
import { mapState }      from 'vuex';
import ASY               from '@/base/asy';
import AgIcons           from '@/components/ag/ag-icons/ag-icons';

export default {
  name:       'ag-upload-video',
  components: { AgIcons },
  props:      {
    value:        {
      type: Array,
      default() {
        return [];
      },
    },
    maxSize:      {
      type:    [ Number, String ],
      default: 5 * 1024 * 1024,
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
  },
  controller: null,

  data() {
    return {
      list:       [],
      isPlay:     false,
      isPreVideo: false,
      videoUrl:   '',
    };
  },

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

    videoHeight() {
      return uni.getSystemInfoSync().screenHeight + 'px';
    },
  },

  created() {
    this.initData();
  },

  mounted() {
    this.list = this.value;
  },

  watch: {
    value() {
      // props在mounted时会赋值一次给，之后的变化要通过watch监听并赋值给data
      this.list = this.value;
    },
  },

  methods: {

    initData() {
      this.controller = new _UploadController(this, this.maxSize);
    },

    async onAdd() {
      await this.controller.upload();
    },

    onVideoClick(detail) {
      if (this.isPreVideo) {
        return;
      }
      const { index, url } = detail;
      uni.showActionSheet({
        itemList: [ '预览视频', '删除视频' ],
        success:  ({ tapIndex }) => {
          tapIndex === 0 && this.onPreview(url);
          tapIndex === 1 && this.onRemove(index);
        },
      });
    },

    onRemove(index) {
      ASY.createDialog('', '您确定删除这个视频吗？', () => {
        this.list.splice(index, 1);
        this.emitRemovedSuccess();
      });
    },

    onPreview(url) {
      console.log('onPreview');
      this.videoUrl = url;
      this.isPreVideo = true;
      console.log('isPreVideo:', this.isPreVideo);
    },

    onVideoPlay() {

    },

    onCloseVideo() {
      this.isPreVideo = false;
    },

    /**
     * 视频上传完毕
     * @param list
     */
    emitUploadSuccess(list) {
      this.list = this.list.concat(list);
      this.$emit('uploaded', this.list);
    },

    /**
     * 图片移除完毕
     */
    emitRemovedSuccess() {
      this.$emit('removed', this.list);
    },
  },
}
</script>

<style lang="scss" scoped>

.upload {
  position: relative;
}

.upload-item {
  border-radius: 20rpx;
  overflow: hidden;
}

.upload-item-video {
  position: relative;
}

.upload-item-video_video {
  position: relative;
}

.close-wrapper {
  position: fixed;
  top: 120rpx;
  right: 40rpx;
  width: 50rpx;
  height: 50rpx;
  z-index: 999;
}

.preview-video {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: 99;
}

</style>
