<template>
  <view class="page-wrapper">
    <demo-block title="按钮类型" padding>
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
    </demo-block>

    <demo-block title="朴素按钮" padding>
      <view class="demo-row--flex">
        <view class="demo-item-space">
          <et-button type="primary" plain>确认按钮</et-button>
        </view>
        <view class="demo-item-space">
          <et-button type="info" plain>信息按钮</et-button>
        </view>
      </view>
    </demo-block>

    <demo-block title="按钮形状" padding>
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
    </demo-block>

    <demo-block title="块级按钮" padding>
      <et-button type="primary" block>块级按钮</et-button>
    </demo-block>

    <demo-block title="不可用状态" padding>
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
    </demo-block>

    <demo-block title="按钮尺寸" padding>
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
    </demo-block>

    <demo-block title="图标按钮" padding>
      <view class="demo-row--flex">
        <view class="demo-item-space">
          <et-button icon="checkbox" type="primary">按钮</et-button>
        </view>
        <view class="demo-item-space">
          <et-button icon="download" type="primary"></et-button>
        </view>
      </view>
    </demo-block>

    <demo-block title="自定义颜色" padding>
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
    </demo-block>

    <!-- #ifdef MP-WEIXIN -->
    <demo-block title="开放功能按钮" padding>
      <et-button type="primary" block open-type="getPhoneNumber" @getphonenumber="getPhoneNumber">获取手机号</et-button>
    </demo-block>
    <!-- #endif -->
  </view>
</template>

<script>
import DemoBlock from '@p/components/demo-block/index.vue'
export default {
  components: {
    DemoBlock
  },
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
