<template>
  <view class="page-wrapper">

    <demo-block title="基础用法" padding>
      <vc-image src="https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg" width="100" height="100">
      </vc-image>
    </demo-block>

    <demo-block title="缩放模式" padding>
      <view class="demo-row--flex">
        <view class="demo-item-space">
          <view class="bg">
            <vc-image src="https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg" width="100"
              height="100" mode="scaleToFill"></vc-image>
          </view>
          <view class="t1">scaleToFill</view>
        </view>
        <view class="demo-item-space">
          <view class="bg">
            <vc-image src="https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg" width="100"
              height="100" mode="aspectFit"></vc-image>
          </view>
          <view class="t1">aspectFit</view>
        </view>
        <view class="demo-item-space">
          <view class="bg">
            <vc-image src="https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg" width="100"
              height="100" mode="aspectFill"></vc-image>
          </view>
          <view class="t1">aspectFill</view>
        </view>
      </view>
      <view class="demo-row--flex">
        <view class="demo-item-space">
          <view class="bg">
            <vc-image src="https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg" width="100"
              mode="widthFix"></vc-image>
          </view>
          <view class="t1">widthFix</view>
        </view>
        <view class="demo-item-space">
          <view class="bg">
            <vc-image src="https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg" height="100"
              mode="heightFix"></vc-image>
          </view>
          <view class="t1">heightFix</view>
        </view>
      </view>
    </demo-block>

    <demo-block title="裁剪模式" padding>
      <view class="demo-row--flex">
        <view class="demo-item-space">
          <view class="bg">
            <vc-image src="https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg" width="100"
              height="100" mode="top"></vc-image>
          </view>
          <view class="t1">top</view>
        </view>
        <view class="demo-item-space">
          <view class="bg">
            <vc-image src="https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg" width="100"
              height="100" mode="bottom"></vc-image>
          </view>
          <view class="t1">bottom</view>
        </view>
        <view class="demo-item-space">
          <view class="bg">
            <vc-image src="https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg" width="100"
              height="100" mode="center"></vc-image>
          </view>
          <view class="t1">center</view>
        </view>
      </view>
      <view class="demo-row--flex">
        <view class="demo-item-space">
          <view class="bg">
            <vc-image src="https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg" width="100"
              height="100" mode="left"></vc-image>
          </view>
          <view class="t1">left</view>
        </view>
        <view class="demo-item-space">
          <view class="bg">
            <vc-image src="https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg" width="100"
              height="100" mode="right"></vc-image>
          </view>
          <view class="t1">right</view>
        </view>
      </view>
    </demo-block>

    <demo-block title="圆角图片" padding>
      <view class="demo-row--flex">
        <view class="demo-item-space">
          <vc-image src="https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg" :radius="12" width="100"
            height="100"></vc-image>
        </view>
        <view class="demo-item-space">
          <vc-image src="https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg" round width="100"
            height="100"></vc-image>
        </view>
      </view>
    </demo-block>

    <demo-block title="加载提示" padding>
      <view class="demo-row--flex">
        <view class="demo-item-space loading-image">
          <view v-if="show" class="bg">
            <vc-image loading src="https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg" width="100"
              height="100"></vc-image>
          </view>
          <view class="t1">加载效果</view>
        </view>
        <view class="demo-item-space">
          <view class="bg">
            <vc-image src="pic--.jpg" width="100" height="100"></vc-image>
          </view>
          <view class="t1">加载失败</view>
        </view>
      </view>
    </demo-block>

  </view>
</template>

<script>
import DemoBlock from '@/components/demo-block'
export default {
  components: {
    DemoBlock
  },
  data() {
    return {
      show: false
    }
  },
  methods: {
    onPageScroll({ scrollTop }) {
      if (this.show) return
      if (scrollTop >= 400) {
        this.show = true
      }
    }
  },
}
</script>

<style lang="scss" scoped>
@import '@/common/demo.scss';
</style>
