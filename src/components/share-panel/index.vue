<template>
  <et-popup :visible="visible" title="选择分享方式" position="bottom" max-height="20vh" round border closeable :close-on-click-overlay="closeOnClickOverlay" @click-overlay="clickOverlay" @close="close">
  <view class="share-panel">
    <view class="share-item" @click="onSharePoster">
      <et-icon name="share-poster" size="36" />
      <view class="share-text">海报分享</view>
    </view>
    <view class="share-item">
      <et-button type="text" open-type="share" size="auto">
        <et-icon name="share-mini" size="36" />
        <view class="share-text">小程序分享</view>
      </et-button>
    </view>
  </view>
  </et-popup>
</template>

<script>
  import { getShareInfo } from '@p/api/base'
  import { wxPreviewMedia } from '@/shared/platform/weixin/api'
  import { staticImgPrefix } from '@p/config'

  export default {
    name: 'share-panel',
    props: {
      // 显示开关
      visible: {
        type: Boolean,
        default: false,
      },
      // 点击遮罩是否关闭菜单
      closeOnClickOverlay: {
        type: Boolean,
        default: true,
      },
      // 是否在点击选项后关闭
      closeOnClickAction: {
        type: Boolean,
        default: true,
      },
      // 分享参数
      option: {
        type: Object,
        default: () => {},
      },
    },
    data() {
      return {
        miniShareLoaded: false
      }
    },
    watch: {
      visible: {
        handler(val) {
          if (!this.miniShareLoaded && val) {
            this.onShareMini()
          }
        }
      }
    },
    methods: {
      async onSharePoster() {
        const { posterUrl } = await this.apiGetShareInfo('2', this.option.path)
        wxPreviewMedia({sources: [{ url: staticImgPrefix + posterUrl }]})
      },
      async onShareMini() {
        const data = await this.apiGetShareInfo('1')
        this.miniShareLoaded = true
        this.$emit('mini-share', {...data, vxImgUrl: staticImgPrefix + data.vxImgUrl})
      },
      async apiGetShareInfo(scene, path) {
        const params = {
          oldShareId: uni.getStorageSync('shareId') || undefined,
          shareCode: this.option.id,
          shareType: this.option.shareType,
          path,
          scence: scene
        }
        const data = await getShareInfo(params)
        return data
      },
      clickOverlay() {
        if (!this.closeOnClickOverlay) return
        this.close()
      },
      close() {
        this.$emit('close')
        this.$emit('update:visible', false)
      },
    },
  }
</script>

<style lang="scss" scoped>
.share-panel {
  display: flex;
}
.share-item {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40rpx 0;
}
.share-text {
  margin-top: 20rpx;
  color: $uni-text-color;
  font-size: $uni-font-size-14;
}
</style>
