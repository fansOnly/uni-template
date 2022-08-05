<template>
  <view class="page-wrapper">
    <et-page-progress-bar :percent="progressBarPercent"></et-page-progress-bar>
    <template v-if="pageReady">
      <view class="gap"></view>
      <view class="demo-block">
        <view class="demo-title">按钮类型</view>
        <view class="demo-body2">
          <view class="demo-row--flex">
            <view class="demo-item-space">
              <et-button>普通按钮</et-button>
            </view>
            <view class="demo-item-space">
              <et-button type="primary">确认按钮</et-button>
            </view>
            <view class="demo-item-space">
              <et-button type="info">信息按钮</et-button>
            </view>
          </view>
          <view class="demo-row--flex">
            <view class="demo-item-space">
              <et-button type="success">成功按钮</et-button>
            </view>
            <view class="demo-item-space">
              <et-button type="error">错误按钮</et-button>
            </view>
          </view>
        </view>
      </view>
      <view class="gap"></view>

      <view class="demo-block">
        <view class="demo-title">朴素按钮</view>
        <view class="demo-body2">
          <view class="demo-row--flex">
            <view class="demo-item-space">
              <et-button type="primary" plain>确认按钮</et-button>
            </view>
            <view class="demo-item-space">
              <et-button type="info" plain>信息按钮</et-button>
            </view>
          </view>
        </view>
      </view>
      <view class="gap"></view>

      <view class="demo-block">
        <view class="demo-title">按钮形状</view>
        <view class="demo-body2">
          <view class="demo-row--flex">
            <view class="demo-item-space">
              <et-button type="primary">方形按钮</et-button>
            </view>
            <view class="demo-item-space">
              <et-button type="primary" :radius="8">圆角按钮</et-button>
            </view>
            <view class="demo-item-space">
              <et-button type="primary" round>圆形按钮</et-button>
            </view>
          </view>
          <view class="demo-row--flex">
            <view class="demo-item-space">
              <et-button type="primary" plain>方形按钮</et-button>
            </view>
            <view class="demo-item-space">
              <et-button type="primary" :radius="8" plain>圆角按钮</et-button>
            </view>
            <view class="demo-item-space">
              <et-button type="primary" round plain>圆形按钮</et-button>
            </view>
          </view>
        </view>
      </view>

      <view class="gap"></view>
      <view class="demo-block">
        <view class="demo-title">块级按钮</view>
        <view class="gap"></view>
        <et-button type="primary" block>块级按钮</et-button>
      </view>

      <view class="gap"></view>
      <view class="demo-block">
        <view class="demo-title">不可用状态</view>
        <view class="demo-body2">
          <view class="demo-row--flex">
            <view class="demo-item-space">
              <et-button disabled>普通按钮</et-button>
            </view>
            <view class="demo-item-space">
              <et-button type="primary" disabled>确认按钮</et-button>
            </view>
            <view class="demo-item-space">
              <et-button type="info" disabled>信息按钮</et-button>
            </view>
          </view>
          <view class="demo-row--flex">
            <view class="demo-item-space">
              <et-button type="error" disabled>错误按钮</et-button>
            </view>
            <view class="demo-item-space">
              <et-button color="#6149f6" disabled>自定义颜色按钮</et-button>
            </view>
            <view class="demo-item-space">
              <et-button color="linear-gradient(to right, #4bb0ff, #6149f6)" disabled>渐变色按钮</et-button>
            </view>
          </view>
        </view>
      </view>

      <view class="gap"></view>
      <view class="demo-block">
        <view class="demo-title">按钮尺寸</view>
        <view class="demo-body2">
          <view class="demo-row--flex">
            <view class="demo-item-space">
              <et-button type="primary" size="large">大号按钮</et-button>
            </view>
            <view class="demo-item-space">
              <et-button type="primary">默认按钮</et-button>
            </view>
            <view class="demo-item-space">
              <et-button type="primary" size="mini">小号按钮</et-button>
            </view>
          </view>
          <view class="gap"></view>
          <view style="width:266px;height:30px">
            <et-button type="primary" size="auto">自定义尺寸</et-button>
          </view>
        </view>
      </view>

      <view class="gap"></view>
      <view class="demo-block">
        <view class="demo-title">图标按钮</view>
        <view class="demo-body2">
          <view class="demo-row--flex">
            <view class="demo-item-space">
              <et-button icon="checkbox" type="primary">按钮</et-button>
            </view>
            <view class="demo-item-space">
              <et-button icon="download" type="primary"></et-button>
            </view>
          </view>
        </view>
      </view>

      <view class="gap"></view>
      <view class="demo-block">
        <view class="demo-title">自定义颜色</view>
        <view class="demo-body2">
          <view class="demo-row--flex">
            <view class="demo-item-space">
              <et-button color="#6149f6">单色按钮</et-button>
            </view>
            <view class="demo-item-space">
              <et-button color="#6149f6" plain>朴素按钮</et-button>
            </view>
            <view class="demo-item-space">
              <et-button color="linear-gradient(to right, #4bb0ff, #6149f6)">渐变色按钮</et-button>
            </view>
          </view>
        </view>
      </view>

      <view class="gap"></view>
      <view class="demo-block">
        <view class="demo-title">开放功能按钮</view>
        <view class="gap"></view>
        <et-button type="primary" block open-type="getPhoneNumber" @getphonenumber="getPhoneNumber">获取手机号</et-button>
      </view>
    </template>
  </view>
</template>

<script>
import page from '@/mixins/page'
export default {
  mixins: [page],
  methods: {
    async getPhoneNumber({ errMsg, iv, encryptedData }) {
      console.log('[info] getPhoneNumber >>> ', errMsg)
      if (errMsg === 'getPhoneNumber:ok') {
        console.log('[info] 获取手机号 success >>>', iv, encryptedData)
      } else {
        console.log('[error] 获取手机号 fail >>>', errMsg)
      }
    },
  }
}
</script>

<style lang="scss" scoped>
@import '@p/assets/styles/index.scss';
</style>
