<template>
  <view class="page-wrapper">

    <demo-block title="基础用法" padding>
      <et-image src="http://139.199.251.138:7080/miniResFile/fixed/202205302019085.png" width="100" height="100">
      </et-image>
    </demo-block>

    <demo-block title="缩放模式" padding>
      <view class="demo-row--flex">
        <view class="demo-item-space">
          <view class="bg">
            <et-image src="http://139.199.251.138:7080/miniResFile/fixed/202205302019085.png" width="100" height="100"
              mode="scaleToFill"></et-image>
          </view>
          <view class="t1">scaleToFill</view>
        </view>
        <view class="demo-item-space">
          <view class="bg">
            <et-image src="http://139.199.251.138:7080/miniResFile/fixed/202205302019085.png" width="100" height="100"
              mode="aspectFit"></et-image>
          </view>
          <view class="t1">aspectFit</view>
        </view>
        <view class="demo-item-space">
          <view class="bg">
            <et-image src="http://139.199.251.138:7080/miniResFile/fixed/202205302019085.png" width="100" height="100"
              mode="aspectFill"></et-image>
          </view>
          <view class="t1">aspectFill</view>
        </view>
      </view>
      <view class="demo-row--flex">
        <view class="demo-item-space">
          <view class="bg">
            <et-image src="http://139.199.251.138:7080/miniResFile/fixed/202205302019085.png" width="100"
              mode="widthFix"></et-image>
          </view>
          <view class="t1">widthFix</view>
        </view>
        <view class="demo-item-space">
          <view class="bg">
            <et-image src="http://139.199.251.138:7080/miniResFile/fixed/202205302019085.png" height="100"
              mode="heightFix"></et-image>
          </view>
          <view class="t1">heightFix</view>
        </view>
      </view>
    </demo-block>

    <demo-block title="裁剪模式" padding>
      <view class="demo-row--flex">
        <view class="demo-item-space">
          <view class="bg">
            <et-image src="http://139.199.251.138:7080/miniResFile/fixed/202205302019085.png" width="100" height="100"
              mode="top"></et-image>
          </view>
          <view class="t1">top</view>
        </view>
        <view class="demo-item-space">
          <view class="bg">
            <et-image src="http://139.199.251.138:7080/miniResFile/fixed/202205302019085.png" width="100" height="100"
              mode="bottom"></et-image>
          </view>
          <view class="t1">bottom</view>
        </view>
        <view class="demo-item-space">
          <view class="bg">
            <et-image src="http://139.199.251.138:7080/miniResFile/fixed/202205302019085.png" width="100" height="100"
              mode="center"></et-image>
          </view>
          <view class="t1">center</view>
        </view>
      </view>
      <view class="demo-row--flex">
        <view class="demo-item-space">
          <view class="bg">
            <et-image src="http://139.199.251.138:7080/miniResFile/fixed/202205302019085.png" width="100" height="100"
              mode="left"></et-image>
          </view>
          <view class="t1">left</view>
        </view>
        <view class="demo-item-space">
          <view class="bg">
            <et-image src="http://139.199.251.138:7080/miniResFile/fixed/202205302019085.png" width="100" height="100"
              mode="right"></et-image>
          </view>
          <view class="t1">right</view>
        </view>
      </view>
    </demo-block>

    <demo-block title="圆角图片" padding>
      <view class="demo-row--flex">
        <view class="demo-item-space">
          <et-image src="http://139.199.251.138:7080/miniResFile/fixed/202205302019085.png" :radius="12" width="100"
            height="100"></et-image>
        </view>
        <view class="demo-item-space">
          <et-image src="http://139.199.251.138:7080/miniResFile/fixed/202205302019085.png" round width="100"
            height="100"></et-image>
        </view>
      </view>
    </demo-block>

    <demo-block title="加载提示" padding>
      <view class="demo-row--flex">
        <view class="demo-item-space loading-image">
          <view v-if="show" class="bg">
            <et-image loading src="http://139.199.251.138:7080/miniResFile/fixed/202205302019085.png" width="100"
              height="100"></et-image>
          </view>
          <view class="t1">加载效果</view>
        </view>
        <view class="demo-item-space">
          <view class="bg">
            <et-image src="pic--.jpg" width="100" height="100"></et-image>
          </view>
          <view class="t1">加载失败</view>
        </view>
      </view>
    </demo-block>

  </view>
</template>

<script>
import DemoBlock from '@p/components/demo-block'
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
@import '@p/assets/styles/index.scss';
</style>
