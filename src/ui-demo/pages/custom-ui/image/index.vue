<template>
  <view class="page-wrapper">
    <view class="gap"></view>
    <view class="demo-block">
      <view class="demo-title">基础用法</view>
      <view class="demo-body ">
        <et-image src="http://139.199.251.138:7080/miniResFile/fixed/202205302019085.png" width="100" height="100"></et-image>
      </view>
    </view>

    <view class="gap"></view>
    <view class="demo-block">
      <view class="demo-title">缩放模式</view>
      <view class="demo-body ">
        <view class="demo-row--flex">
          <view class="demo-item-space">
            <view class="bg">
              <et-image src="http://139.199.251.138:7080/miniResFile/fixed/202205302019085.png" width="100" height="100" mode="scaleToFill"></et-image>
            </view>
            <view class="t1">scaleToFill</view>
          </view>
          <view class="demo-item-space">
            <view class="bg">
              <et-image src="http://139.199.251.138:7080/miniResFile/fixed/202205302019085.png" width="100" height="100" mode="aspectFit"></et-image>
            </view>
            <view class="t1">aspectFit</view>
          </view>
          <view class="demo-item-space">
            <view class="bg">
              <et-image src="http://139.199.251.138:7080/miniResFile/fixed/202205302019085.png" width="100" height="100" mode="aspectFill"></et-image>
            </view>
            <view class="t1">aspectFill</view>
          </view>
        </view>
        <view class="demo-row--flex">
          <view class="demo-item-space">
            <view class="bg">
              <et-image src="http://139.199.251.138:7080/miniResFile/fixed/202205302019085.png" width="100" mode="widthFix"></et-image>
            </view>
            <view class="t1">widthFix</view>
          </view>
          <view class="demo-item-space">
            <view class="bg">
              <et-image src="http://139.199.251.138:7080/miniResFile/fixed/202205302019085.png" height="100" mode="heightFix"></et-image>
            </view>
            <view class="t1">heightFix</view>
          </view>
        </view>
      </view>
    </view>
    <view class="gap"></view>

    <view class="demo-block">
      <view class="demo-title">裁剪模式</view>
      <view class="demo-body ">
        <view class="demo-row--flex">
          <view class="demo-item-space">
            <view class="bg">
              <et-image src="http://139.199.251.138:7080/miniResFile/fixed/202205302019085.png" width="100" height="100" mode="top"></et-image>
            </view>
            <view class="t1">top</view>
          </view>
          <view class="demo-item-space">
            <view class="bg">
              <et-image src="http://139.199.251.138:7080/miniResFile/fixed/202205302019085.png" width="100" height="100" mode="bottom"></et-image>
            </view>
            <view class="t1">bottom</view>
          </view>
          <view class="demo-item-space">
            <view class="bg">
              <et-image src="http://139.199.251.138:7080/miniResFile/fixed/202205302019085.png" width="100" height="100" mode="center"></et-image>
            </view>
            <view class="t1">center</view>
          </view>
        </view>
        <view class="demo-row--flex">
          <view class="demo-item-space">
            <view class="bg">
              <et-image src="http://139.199.251.138:7080/miniResFile/fixed/202205302019085.png" width="100" height="100" mode="left"></et-image>
            </view>
            <view class="t1">left</view>
          </view>
          <view class="demo-item-space">
            <view class="bg">
              <et-image src="http://139.199.251.138:7080/miniResFile/fixed/202205302019085.png" width="100" height="100" mode="right"></et-image>
            </view>
            <view class="t1">right</view>
          </view>
        </view>
      </view>
    </view>

    <view class="gap"></view>
    <view class="demo-block">
      <view class="demo-title">圆角图片</view>
      <view class="demo-body ">
        <view class="demo-row--flex">
          <view class="demo-item-space">
            <et-image src="http://139.199.251.138:7080/miniResFile/fixed/202205302019085.png" :radius="12" width="100" height="100"></et-image>
          </view>
          <view class="demo-item-space">
            <et-image src="http://139.199.251.138:7080/miniResFile/fixed/202205302019085.png" round width="100" height="100"></et-image>
          </view>
        </view>
      </view>
    </view>

    <view class="gap"></view>
    <view class="demo-block">
      <view class="demo-title">加载提示</view>
      <view class="demo-body ">
        <view class="demo-row--flex">
          <view class="demo-item-space loading-image">
            <view class="bg" v-if="show">
              <et-image loading src="http://139.199.251.138:7080/miniResFile/fixed/202205302019085.png" width="100" height="100"></et-image>
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
      </view>
    </view>

  </view>
</template>

<script>
export default {
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
