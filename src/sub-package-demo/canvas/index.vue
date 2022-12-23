<template>
  <!--
    1. tip: Canvas 2D（新接口）需要显式设置画布宽高，默认：300*150，最大：1365*1365
    2. bug: 避免设置过大的宽高，在安卓下会有crash的问题
    3. tip: iOS 暂不支持 pointer-events
    4. bug: 文本设置行高无效
  -->
  <view class="page-wrapper" :style="{ 'min-height': windowHeight + 'px' }">
    <view class="demo-content">
      <bs-canvas class="canvas" :title="title" :text="text" :desc="desc" :tag="tag" :type="type" canvas-width="315"
        canvas-height="450" @export="onExportImage"></bs-canvas>
      <view style="margin-top:30px">
        <vc-image v-if="src" :src="src" mode="widthFix" show-menu-by-longpress></vc-image>
      </view>
    </view>
  </view>
</template>

<script>
import BsCanvas from '@/components/canvas'

export default {
  components: {
    BsCanvas
  },
  data() {
    return {
      windowHeight: wx.getSystemInfoSync().windowHeight,
      rerender: true,
      type: 1,
      title: '',
      text: '',
      desc: [],
      tag: '',
      src: ''
    }
  },
  watch: {
    type: {
      handler(val) {
        if ([1, 2].includes(val)) {
          this.title = '贵银亨利扬帆第136期'
          this.text = '销售时间：2019年7月3日-9月30日'
          this.desc = ['· 业绩比较基准4.65%~4.95%', '· 10万起投', '· 投资期限358天']
        } else if ([3, 4, 5].includes(val)) {
          this.title = '贵州银行大额存单2019年第010期'
          this.text = '销售时间：2019年7月3日-9月30日'
          this.desc = ['· 业绩比较基准4.65%~4.95%', '· 10万起投', '· 投资期限358天']
        } else if (val === 6) {
          this.title = '利息最高可达4.30%'
          this.text = ''
          this.desc = ['收益高💗指定收息账户💗指定派息时间']
        } else if (val === 7) {
          this.title = '贵银恒利2019增利第52期'
          this.tag = '购物节专享'
          this.text = '销售时间：2019年7月3日-9月30日'
          this.desc = ['业绩比较基准4.65%~4.95%', '10万起投', '投资期限358天']
        } else if (val === 8) {
          this.title = '贵银恒利黔利盈28天'
          this.text = '销售时间：2019年7月3日-9月30日'
          this.desc = ['· 业绩比较基准4.65%~4.95%', '· 10万起投', '· 投资期限358天', '· 随时申购 到期自动兑付']
          this.tag = '购物节专享'
        }
      },
      immediate: true
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
      }, 0)
    }
  }
}
</script>

<style lang="scss" scoped>
.demo-content {
  padding: 60rpx;
}

.canvas {
  position: absolute;
  top: -9999px;
  width: 100%;
}
</style>
