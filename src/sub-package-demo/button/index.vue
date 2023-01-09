<template>
  <view class="page-wrapper">
    <demo-block title="按钮类型" padding>
      <view class="demo-row--flex">
        <view class="demo-item-space">
          <vc-button>普通按钮</vc-button>
        </view>
        <view class="demo-item-space">
          <vc-button type="primary">确认按钮</vc-button>
        </view>
        <view class="demo-item-space">
          <vc-button type="success">成功按钮</vc-button>
        </view>
      </view>
      <view class="demo-row--flex">
        <view class="demo-item-space">
          <vc-button type="error">错误按钮</vc-button>
        </view>
        <view class="demo-item-space">
          <vc-button type="info">信息按钮</vc-button>
        </view>
      </view>
    </demo-block>

    <demo-block title="朴素按钮" padding>
      <view class="demo-row--flex">
        <view class="demo-item-space">
          <vc-button type="default" plain>普通按钮</vc-button>
        </view>
        <view class="demo-item-space">
          <vc-button type="primary" plain>确认按钮</vc-button>
        </view>
        <view class="demo-item-space">
          <vc-button type="success" plain>信息按钮</vc-button>
        </view>
      </view>
    </demo-block>

    <demo-block title="按钮形状" padding>
      <view class="demo-row--flex">
        <view class="demo-item-space">
          <vc-button type="primary">普通按钮</vc-button>
        </view>
        <view class="demo-item-space">
          <vc-button type="primary" round>圆角按钮</vc-button>
        </view>
        <view class="demo-item-space">
          <vc-button type="primary" circle icon="cloud-upload"></vc-button>
        </view>
      </view>
    </demo-block>

    <demo-block title="块级按钮" padding>
      <vc-button type="primary" block>块级按钮</vc-button>
    </demo-block>

    <demo-block title="不可用状态" padding>
      <view class="demo-row--flex">
        <view class="demo-item-space">
          <vc-button disabled>普通按钮</vc-button>
        </view>
        <view class="demo-item-space">
          <vc-button type="primary" disabled>确认按钮</vc-button>
        </view>
        <view class="demo-item-space">
          <vc-button type="success" disabled plain>错误按钮</vc-button>
        </view>
      </view>
    </demo-block>

    <demo-block title="按钮尺寸" padding>
      <view class="demo-row--flex">
        <view class="demo-item-space">
          <vc-button type="primary" size="large">大号按钮</vc-button>
        </view>
        <view class="demo-item-space">
          <vc-button type="primary">默认按钮</vc-button>
        </view>
        <view class="demo-item-space">
          <vc-button type="primary" size="small">小号按钮</vc-button>
        </view>
      </view>
      <view class="gap"></view>
      <view style="width:266px;height:30px">
        <vc-button type="primary" block>自定义尺寸</vc-button>
      </view>
    </demo-block>

    <demo-block title="图标按钮" padding>
      <view class="demo-row--flex">
        <view class="demo-item-space">
          <vc-button icon="home" type="primary">按钮</vc-button>
        </view>
        <view class="demo-item-space">
          <vc-button type="primary" loading>loading</vc-button>
        </view>
        <view class="demo-item-space">
          <vc-button icon="cloud-upload" type="primary"></vc-button>
        </view>
      </view>
    </demo-block>

    <demo-block title="自定义颜色" padding>
      <view class="demo-row--flex">
        <view class="demo-item-space">
          <vc-button color="#6149f6" hover-class="color-hover1">单色按钮</vc-button>
        </view>
        <view class="demo-item-space">
          <vc-button color="#6149f6" plain>朴素按钮</vc-button>
        </view>
        <view class="demo-item-space">
          <vc-button color="linear-gradient(to right, #4bb0ff, #6149f6)">渐变色按钮</vc-button>
        </view>
      </view>
    </demo-block>

    <!-- #ifdef MP-WEIXIN -->
    <demo-block title="开放功能按钮" padding>
      <vc-button type="primary" block open-type="getPhoneNumber" @getphonenumber="getPhoneNumber">获取手机号</vc-button>
    </demo-block>
    <!-- #endif -->
  </view>
</template>

<script>
import DemoBlock from '@/sub-package-demo/components/demo-block/index.vue'
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
@import '@/sub-package-demo/common/demo.scss';
</style>
