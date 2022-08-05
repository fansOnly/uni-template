<template>
  <!--
    1. tip: Canvas 2D（新接口）需要显式设置画布宽高，默认：300*150，最大：1365*1365
    2. bug: 避免设置过大的宽高，在安卓下会有crash的问题
    3. tip: iOS 暂不支持 pointer-events
    4. bug: 文本设置行高无效
  -->
  <view class="page-wrapper" :style="{'min-height': windowHeight + 'px'}">

        <bs-canvas class="canvas" :list="rankList" :canvas-width="windowWidth" :canvas-height="windowHeight" @export="onExportImage"></bs-canvas>

  </view>
</template>

<script>
import BsCanvas from './draw.vue'
export default {
  components: {
    BsCanvas
  },
  data() {
    return {
     windowHeight: wx.getSystemInfoSync().windowHeight,
     windowWidth: wx.getSystemInfoSync().windowWidth,
     rankList: [
      { id: '1', name: '陈晨', avatar: 'https://img.yzcdn.cn/vant/tree.jpg', org: 'XXXXX支行营业室', aum: '5881' },
      { id: '2', name: '陈晨2', avatar: 'https://www.eteng.cn/gzMgrBankResource/icon/silver_medal.png', org: 'XXXXX支行营业室行营业室行营业室行营业室行营业室', aum: '5848100' },
      { id: '3', name: '陈晨3', avatar: 'https://img.yzcdn.cn/vant/tree.jpg', org: 'XXXXX支行营业室', aum: '15881' },
      { id: '4', name: '陈晨4', avatar: 'https://img.yzcdn.cn/vant/tree.jpg', org: 'XXXXX支行营业室', aum: '58821' },
      { id: '5', name: '陈晨5', avatar: 'https://img.yzcdn.cn/vant/tree.jpg', org: 'XXXXX支行营业室', aum: '5881' },
      { id: '6', name: '陈晨6', avatar: 'https://img.yzcdn.cn/vant/tree.jpg', org: 'XXXXX支行营业室', aum: '58081' },
      { id: '7', name: '陈晨7', avatar: 'https://img.yzcdn.cn/vant/tree.jpg', org: 'XXXXX支行营业室', aum: '5848100' },
     ]
    }
  },
  async onLoad() {

  },
  methods: {
    onExportImage(path) {
      this.src = path
    },
    createPoster() {
      this.rerender = true
    },
    onRandomStyle() {
      this.rerender = false
      this.type = this.type === 8 ? 1 : this.type + 1
      setTimeout(() => {
        this.rerender = true
      }, 0);
    }
  }
}
</script>

<style lang="scss" scoped>
/* .canvas {
  position: absolute;
  top: -9999px;
  width:100%;
} */
</style>
